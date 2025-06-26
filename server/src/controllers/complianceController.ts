import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAlerts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { severity, is_read } = req.query;

    let query = supabase
      .from('compliance_alerts')
      .select('*')
      .or(`user_id.eq.${userId},user_id.is.null`)
      .order('created_at', { ascending: false });

    if (severity && severity !== 'all') {
      query = query.eq('severity', severity);
    }

    if (is_read !== undefined) {
      query = query.eq('is_read', is_read === 'true');
    }

    const { data: alerts, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch alerts' });
    }

    res.json({ alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const markAlertAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('compliance_alerts')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: 'Failed to mark alert as read' });
    }

    res.json({ message: 'Alert marked as read' });
  } catch (error) {
    console.error('Mark alert as read error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getComplianceMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get latest audit score
    const { data: latestAudit } = await supabase
      .from('privacy_audits')
      .select('compliance_score')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Get data request metrics
    const { data: requests } = await supabase
      .from('data_requests')
      .select('status, due_date, created_at')
      .eq('user_id', userId);

    // Get policy count
    const { data: policies } = await supabase
      .from('generated_policies')
      .select('id')
      .eq('user_id', userId);

    // Calculate metrics
    const avgResponseTime = requests ? 
      requests.filter(r => r.status === 'completed').length > 0 ?
        Math.round(requests.filter(r => r.status === 'completed')
          .reduce((acc, r) => {
            const created = new Date(r.created_at);
            const completed = new Date(); // Simplified - should track actual completion date
            return acc + (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
          }, 0) / requests.filter(r => r.status === 'completed').length) : 0
      : 0;

    const metrics = {
      complianceScore: latestAudit?.compliance_score || 0,
      dataRequestResponseTime: avgResponseTime,
      policiesGenerated: policies?.length || 0,
      activeAlerts: 0 // Will be calculated from alerts
    };

    res.json({ metrics });
  } catch (error) {
    console.error('Get compliance metrics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};