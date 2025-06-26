import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { data: settings, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }

    if (!settings) {
      // Create default settings
      const { data: newSettings, error: createError } = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          notifications_enabled: true,
          email_alerts: true,
          jurisdictions: []
        })
        .select()
        .single();

      if (createError) {
        return res.status(500).json({ error: 'Failed to create settings' });
      }

      return res.json({ settings: newSettings });
    }

    res.json({ settings });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const updates = req.body;

    const { data: settings, error } = await supabase
      .from('user_settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update settings' });
    }

    res.json({ settings });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { company_name } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({ 
        company_name,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select('id, email, company_name, plan_type')
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};