import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getDataRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { status, search } = req.query;

    let query = supabase
      .from('data_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`requester_name.ilike.%${search}%,requester_email.ilike.%${search}%`);
    }

    const { data: requests, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch data requests' });
    }

    res.json({ requests });
  } catch (error) {
    console.error('Get data requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDataRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { requester_name, requester_email, request_type, priority, description } = req.body;

    // Calculate due date (30 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const { data: request, error } = await supabase
      .from('data_requests')
      .insert({
        user_id: userId,
        requester_name,
        requester_email,
        request_type,
        priority: priority || 'medium',
        description,
        status: 'pending',
        submitted_date: new Date().toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create data request' });
    }

    res.status(201).json({ request });
  } catch (error) {
    console.error('Create data request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateDataRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const updates = req.body;

    const { data: request, error } = await supabase
      .from('data_requests')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to update data request' });
    }

    if (!request) {
      return res.status(404).json({ error: 'Data request not found' });
    }

    res.json({ request });
  } catch (error) {
    console.error('Update data request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDataRequest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('data_requests')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ error: 'Failed to delete data request' });
    }

    res.json({ message: 'Data request deleted successfully' });
  } catch (error) {
    console.error('Delete data request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getDataRequestStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { data: requests, error } = await supabase
      .from('data_requests')
      .select('status, due_date')
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }

    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      inProgress: requests.filter(r => r.status === 'in-progress').length,
      completed: requests.filter(r => r.status === 'completed').length,
      overdue: requests.filter(r => {
        const dueDate = new Date(r.due_date);
        const today = new Date();
        return dueDate < today && r.status !== 'completed';
      }).length
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get data request stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};