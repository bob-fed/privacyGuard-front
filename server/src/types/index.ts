export interface User {
  id: string;
  email: string;
  company_name?: string;
  plan_type: 'free' | 'pro' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface PrivacyAudit {
  id: string;
  user_id: string;
  audit_data: Record<string, any>;
  compliance_score: number;
  status: 'draft' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface DataRequest {
  id: string;
  user_id: string;
  requester_name: string;
  requester_email: string;
  request_type: 'access' | 'deletion' | 'correction' | 'portability';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  description?: string;
  submitted_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface GeneratedPolicy {
  id: string;
  user_id: string;
  policy_type: 'privacy' | 'cookie' | 'terms';
  content: string;
  config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ComplianceAlert {
  id: string;
  user_id?: string;
  alert_type: 'new-law' | 'deadline' | 'update' | 'breach';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  jurisdiction: string;
  due_date?: string;
  action_required: boolean;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  notifications_enabled: boolean;
  email_alerts: boolean;
  jurisdictions: string[];
  business_type?: string;
  website_url?: string;
  contact_email?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthRequest extends Request {
  user?: User;
}