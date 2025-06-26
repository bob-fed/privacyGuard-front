import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getAudits = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { data: audits, error } = await supabase
      .from('privacy_audits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch audits' });
    }

    res.json({ audits });
  } catch (error) {
    console.error('Get audits error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAudit = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { audit_data, status } = req.body;

    // Calculate compliance score based on audit data
    const complianceScore = calculateComplianceScore(audit_data);

    const { data: audit, error } = await supabase
      .from('privacy_audits')
      .insert({
        user_id: userId,
        audit_data,
        compliance_score: complianceScore,
        status: status || 'draft'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create audit' });
    }

    // Generate recommendations
    const recommendations = generateRecommendations(audit_data);

    res.status(201).json({ audit, recommendations });
  } catch (error) {
    console.error('Create audit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAudit = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const { audit_data, status } = req.body;

    const complianceScore = calculateComplianceScore(audit_data);

    const { data: audit, error } = await supabase
      .from('privacy_audits')
      .update({
        audit_data,
        compliance_score: complianceScore,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update audit' });
    }

    if (!audit) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    const recommendations = generateRecommendations(audit_data);

    res.json({ audit, recommendations });
  } catch (error) {
    console.error('Update audit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function calculateComplianceScore(auditData: any): number {
  let score = 0;
  let totalPoints = 100;

  // Basic scoring logic
  if (auditData['privacy-policy']) score += 20;
  if (auditData['cookie-consent']) score += 15;
  if (auditData['user-rights']) score += 20;
  if (auditData['data-retention']) score += 15;
  if (auditData['data-deletion']) score += 15;
  if (auditData['security-measures']?.length >= 4) score += 15;

  return Math.min(score, totalPoints);
}

function generateRecommendations(auditData: any) {
  const recommendations = [];

  if (!auditData['privacy-policy']) {
    recommendations.push({
      priority: 'high',
      title: 'Create a Privacy Policy',
      description: 'You need a comprehensive privacy policy that explains your data practices.'
    });
  }

  if (!auditData['cookie-consent']) {
    recommendations.push({
      priority: 'high',
      title: 'Implement Cookie Consent',
      description: 'Add cookie consent banners to comply with GDPR and other regulations.'
    });
  }

  if (!auditData['user-rights']) {
    recommendations.push({
      priority: 'medium',
      title: 'User Rights Mechanisms',
      description: 'Provide ways for users to access, correct, or delete their data.'
    });
  }

  if (!auditData['data-retention']) {
    recommendations.push({
      priority: 'medium',
      title: 'Data Retention Policy',
      description: 'Establish clear policies for how long you keep personal data.'
    });
  }

  if (auditData['security-measures']?.length < 4) {
    recommendations.push({
      priority: 'high',
      title: 'Strengthen Security',
      description: 'Implement additional security measures to protect personal data.'
    });
  }

  return recommendations;
}