import { Request, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest } from '../middleware/auth';

export const getPolicies = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { data: policies, error } = await supabase
      .from('generated_policies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch policies' });
    }

    res.json({ policies });
  } catch (error) {
    console.error('Get policies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const generatePolicy = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { policy_type, config } = req.body;

    let content = '';

    switch (policy_type) {
      case 'privacy':
        content = generatePrivacyPolicy(config);
        break;
      case 'cookie':
        content = generateCookiePolicy(config);
        break;
      case 'terms':
        content = generateTermsOfService(config);
        break;
      default:
        return res.status(400).json({ error: 'Invalid policy type' });
    }

    const { data: policy, error } = await supabase
      .from('generated_policies')
      .insert({
        user_id: userId,
        policy_type,
        content,
        config
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to save policy' });
    }

    res.status(201).json({ policy });
  } catch (error) {
    console.error('Generate policy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function generatePrivacyPolicy(config: any): string {
  return `
PRIVACY POLICY

Last updated: ${new Date().toLocaleDateString()}

1. INFORMATION WE COLLECT

${config.companyName} ("we," "our," or "us") collects the following types of information:

${config.dataTypes?.map((type: string) => `• ${type}`).join('\n') || '• Personal identifiers (name, email, phone)'}

2. HOW WE USE YOUR INFORMATION

We use the information we collect to:
• Provide, operate, and maintain our services
• Improve, personalize, and expand our services
• Understand and analyze how you use our services
• Develop new products, services, features, and functionality
${config.marketing ? '• Send you marketing and promotional communications' : ''}
${config.analytics ? '• Conduct analytics and measurement activities' : ''}

3. SHARING OF INFORMATION

${config.thirdPartySharing ? 
  'We may share your information with third parties in the following situations:\n• With service providers who assist us in operating our business\n• When required by law or to protect our rights\n• In connection with a business transaction' :
  'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.'
}

4. DATA SECURITY

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. YOUR RIGHTS

${config.jurisdiction?.includes('European Union (GDPR)') ? 
  'Under GDPR, you have the right to:\n• Access your personal data\n• Rectify inaccurate data\n• Erase your data\n• Restrict processing\n• Data portability\n• Object to processing' : ''}

${config.jurisdiction?.includes('California (CCPA)') ?
  'Under CCPA, California residents have the right to:\n• Know what personal information is collected\n• Delete personal information\n• Opt-out of the sale of personal information\n• Non-discrimination for exercising rights' : ''}

6. COOKIES

${config.cookies ? 
  'We use cookies and similar tracking technologies to track activity on our service and store certain information. You can control cookies through your browser settings.' :
  'Our website does not use cookies to track users.'
}

7. CONTACT US

If you have any questions about this Privacy Policy, please contact us at:
Email: ${config.contactEmail}
Website: ${config.website}

This policy is effective as of the date listed above and will remain in effect except with respect to any changes in its provisions in the future.
  `.trim();
}

function generateCookiePolicy(config: any): string {
  return `
COOKIE POLICY

Last updated: ${new Date().toLocaleDateString()}

1. WHAT ARE COOKIES

Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

2. HOW WE USE COOKIES

${config.companyName} uses cookies for the following purposes:

• Essential cookies: Required for the website to function properly
${config.analytics ? '• Analytics cookies: Help us understand how visitors use our website' : ''}
${config.marketing ? '• Marketing cookies: Used to deliver personalized advertisements' : ''}

3. TYPES OF COOKIES WE USE

• Session cookies: Temporary cookies that expire when you close your browser
• Persistent cookies: Remain on your device for a specified period
${config.thirdPartySharing ? '• Third-party cookies: Set by external services we use on our site' : ''}

4. MANAGING COOKIES

You can control and manage cookies in various ways:
• Browser settings: Most browsers allow you to refuse cookies
• Opt-out tools: Use industry opt-out mechanisms
• Cookie preferences: Use our cookie preference center

5. CONTACT US

For questions about our use of cookies, contact us at: ${config.contactEmail}
  `.trim();
}

function generateTermsOfService(config: any): string {
  return `
TERMS OF SERVICE

Last updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS

By accessing and using ${config.companyName}'s services, you accept and agree to be bound by the terms and provision of this agreement.

2. SERVICES

${config.companyName} provides [describe your services here]. We reserve the right to modify or discontinue our services at any time.

3. USER RESPONSIBILITIES

You agree to:
• Use our services lawfully and responsibly
• Maintain the security of your account
• Respect intellectual property rights
• Not engage in prohibited activities

4. PRIVACY

Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services.

5. LIMITATION OF LIABILITY

${config.companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

6. GOVERNING LAW

These terms are governed by the laws of [your jurisdiction].

7. CONTACT INFORMATION

For questions about these Terms of Service, contact us at: ${config.contactEmail}
  `.trim();
}