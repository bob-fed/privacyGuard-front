import { supabase } from '../config/database';
import { sendComplianceAlert } from './emailService';

export const createGlobalAlert = async (alertData: {
  alert_type: 'new-law' | 'deadline' | 'update' | 'breach';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  jurisdiction: string;
  due_date?: string;
  action_required: boolean;
  link?: string;
}) => {
  try {
    // Create global alert (no user_id)
    const { data: alert, error } = await supabase
      .from('compliance_alerts')
      .insert({
        ...alertData,
        is_read: false
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create global alert:', error);
      return;
    }

    // Get users who should receive this alert based on their jurisdictions
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, company_name')
      .join('user_settings', 'users.id', 'user_settings.user_id')
      .contains('user_settings.jurisdictions', [alertData.jurisdiction]);

    if (usersError) {
      console.error('Failed to fetch users for alert:', usersError);
      return;
    }

    // Send email notifications to relevant users
    for (const user of users || []) {
      try {
        await sendComplianceAlert(
          user.email,
          user.company_name,
          alertData.title,
          alertData.description
        );
      } catch (emailError) {
        console.error(`Failed to send alert email to ${user.email}:`, emailError);
      }
    }

    return alert;
  } catch (error) {
    console.error('Error creating global alert:', error);
    throw error;
  }
};

export const checkComplianceDeadlines = async () => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    // Check for upcoming data request deadlines
    const { data: upcomingRequests, error } = await supabase
      .from('data_requests')
      .select('*, users(email, company_name)')
      .eq('status', 'pending')
      .gte('due_date', today.toISOString().split('T')[0])
      .lte('due_date', sevenDaysFromNow.toISOString().split('T')[0]);

    if (error) {
      console.error('Failed to check compliance deadlines:', error);
      return;
    }

    // Send deadline reminders
    for (const request of upcomingRequests || []) {
      const daysUntilDue = Math.ceil(
        (new Date(request.due_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      await createGlobalAlert({
        alert_type: 'deadline',
        title: `Data Request Deadline Approaching`,
        description: `You have a ${request.request_type} request from ${request.requester_name} due in ${daysUntilDue} days.`,
        severity: daysUntilDue <= 3 ? 'high' : 'medium',
        jurisdiction: 'Global',
        due_date: request.due_date,
        action_required: true
      });
    }
  } catch (error) {
    console.error('Error checking compliance deadlines:', error);
  }
};