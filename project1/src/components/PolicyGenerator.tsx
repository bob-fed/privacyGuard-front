import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Settings,
  Globe,
  Cookie,
  Shield,
  Users,
  Calendar
} from 'lucide-react';

interface PolicyConfig {
  companyName: string;
  website: string;
  contactEmail: string;
  jurisdiction: string[];
  dataTypes: string[];
  cookies: boolean;
  analytics: boolean;
  marketing: boolean;
  thirdPartySharing: boolean;
}

export const PolicyGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('privacy-policy');
  const [config, setConfig] = useState<PolicyConfig>({
    companyName: '',
    website: '',
    contactEmail: '',
    jurisdiction: [],
    dataTypes: [],
    cookies: false,
    analytics: false,
    marketing: false,
    thirdPartySharing: false
  });
  const [generatedPolicy, setGeneratedPolicy] = useState('');
  const [copied, setCopied] = useState(false);

  const jurisdictions = [
    'United States',
    'European Union (GDPR)',
    'California (CCPA)',
    'New York',
    'Virginia',
    'Colorado',
    'Canada',
    'United Kingdom'
  ];

  const dataTypeOptions = [
    'Personal identifiers (name, email, phone)',
    'Financial information',
    'Location data',
    'Usage and analytics data',
    'Marketing preferences',
    'Device information',
    'Cookies and tracking data',
    'Sensitive personal information'
  ];

  const handleConfigChange = (field: keyof PolicyConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrivacyPolicy = () => {
    const policy = `
PRIVACY POLICY

Last updated: ${new Date().toLocaleDateString()}

1. INFORMATION WE COLLECT

${config.companyName} ("we," "our," or "us") collects the following types of information:

${config.dataTypes.map(type => `• ${type}`).join('\n')}

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

${config.jurisdiction.includes('European Union (GDPR)') ? 
  'Under GDPR, you have the right to:\n• Access your personal data\n• Rectify inaccurate data\n• Erase your data\n• Restrict processing\n• Data portability\n• Object to processing' : ''}

${config.jurisdiction.includes('California (CCPA)') ?
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

    setGeneratedPolicy(policy);
  };

  const generateCookiePolicy = () => {
    const policy = `
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

    setGeneratedPolicy(policy);
  };

  const generateTermsOfService = () => {
    const terms = `
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

    setGeneratedPolicy(terms);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPolicy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadPolicy = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedPolicy], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeTab.replace('-', '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const tabs = [
    { id: 'privacy-policy', name: 'Privacy Policy', icon: Shield },
    { id: 'cookie-policy', name: 'Cookie Policy', icon: Cookie },
    { id: 'terms-of-service', name: 'Terms of Service', icon: FileText }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Generator</h1>
        <p className="text-gray-600">
          Generate compliant privacy policies, cookie policies, and terms of service tailored to your business
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => handleConfigChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL *
                </label>
                <input
                  type="url"
                  value={config.website}
                  onChange={(e) => handleConfigChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={config.contactEmail}
                  onChange={(e) => handleConfigChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="privacy@yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicable Jurisdictions
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {jurisdictions.map(jurisdiction => (
                    <label key={jurisdiction} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.jurisdiction.includes(jurisdiction)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleConfigChange('jurisdiction', [...config.jurisdiction, jurisdiction]);
                          } else {
                            handleConfigChange('jurisdiction', config.jurisdiction.filter(j => j !== jurisdiction));
                          }
                        }}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm">{jurisdiction}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Types Collected
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {dataTypeOptions.map(dataType => (
                    <label key={dataType} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={config.dataTypes.includes(dataType)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleConfigChange('dataTypes', [...config.dataTypes, dataType]);
                          } else {
                            handleConfigChange('dataTypes', config.dataTypes.filter(d => d !== dataType));
                          }
                        }}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-xs">{dataType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.cookies}
                    onChange={(e) => handleConfigChange('cookies', e.target.checked)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">Uses cookies</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.analytics}
                    onChange={(e) => handleConfigChange('analytics', e.target.checked)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">Uses analytics</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.marketing}
                    onChange={(e) => handleConfigChange('marketing', e.target.checked)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">Marketing communications</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.thirdPartySharing}
                    onChange={(e) => handleConfigChange('thirdPartySharing', e.target.checked)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">Shares data with third parties</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Generation */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {!generatedPolicy ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready to Generate Your {tabs.find(t => t.id === activeTab)?.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Fill out the configuration form and click generate to create your policy
                  </p>
                  <button
                    onClick={() => {
                      if (activeTab === 'privacy-policy') generatePrivacyPolicy();
                      else if (activeTab === 'cookie-policy') generateCookiePolicy();
                      else generateTermsOfService();
                    }}
                    disabled={!config.companyName || !config.website || !config.contactEmail}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate {tabs.find(t => t.id === activeTab)?.name}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Generated {tabs.find(t => t.id === activeTab)?.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {copied ? <Check className="h-4 w-4 mr-1 text-green-600" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={downloadPolicy}
                        className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                      {generatedPolicy}
                    </pre>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => setGeneratedPolicy('')}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Generate New
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Save to Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};