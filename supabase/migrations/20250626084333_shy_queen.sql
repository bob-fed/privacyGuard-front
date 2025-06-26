  # Initial Privacy Compliance Tool Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `company_name` (text)
      - `plan_type` (enum: free, pro, enterprise)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `privacy_audits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `audit_data` (jsonb)
      - `compliance_score` (integer)
      - `status` (enum: draft, completed)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `data_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `requester_name` (text)
      - `requester_email` (text)
      - `request_type` (enum: access, deletion, correction, portability)
      - `status` (enum: pending, in-progress, completed, rejected)
      - `priority` (enum: low, medium, high)
      - `description` (text)
      - `submitted_date` (date)
      - `due_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `generated_policies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `policy_type` (enum: privacy, cookie, terms)
      - `content` (text)
      - `config` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `compliance_alerts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `alert_type` (enum: new-law, deadline, update, breach)
      - `title` (text)
      - `description` (text)
      - `severity` (enum: low, medium, high, critical)
      - `jurisdiction` (text)
      - `due_date` (date)
      - `action_required` (boolean)
      - `link` (text)
      - `is_read` (boolean)
      - `created_at` (timestamp)
    
    - `user_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `notifications_enabled` (boolean)
      - `email_alerts` (boolean)
      - `jurisdictions` (text[])
      - `business_type` (text)
      - `website_url` (text)
      - `contact_email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data