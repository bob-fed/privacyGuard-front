import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe, 
  Shield, 
  CreditCard,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserSettings {
  notifications_enabled: boolean;
  email_alerts: boolean;
  jurisdictions: string[];
  business_type: string;
  website_url: string;
  contact_email: string;
}

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    company_name: user?.company_name || '',
    email: user?.email || ''
  });

  const [settings, setSettings] = useState<UserSettings>({
    notifications_enabled: true,
    email_alerts: true,
    jurisdictions: [],
    business_type: '',
    website_url: '',
    contact_email: ''
  });

  const jurisdictionOptions = [
    'United States',
    'European Union (GDPR)',
    'California (CCPA)',
    'New York',
    'Virginia',
    'Colorado',
    'Canada',
    'United Kingdom'
  ];

  const businessTypes = [
    'E-commerce',
    'SaaS/Technology',
    'Healthcare',
    'Financial Services',
    'Education',
    'Marketing/Advertising',
    'Retail',
    'Professional Services',
    'Non-profit',
    'Other'
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/settings/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save profile');
      }
    } catch (error) {
      setError('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save settings');
      }
    } catch (error) {
      setError('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tab Navigation */}
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
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {saved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-700">Settings saved successfully!</span>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={profile.company_name}
                      onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.notifications_enabled}
                      onChange={(e) => setSettings({ ...settings, notifications_enabled: e.target.checked })}
                      className="mr-3 text-blue-600"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Enable Notifications</span>
                      <p className="text-sm text-gray-600">Receive in-app notifications about compliance updates</p>
                    </div>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.email_alerts}
                      onChange={(e) => setSettings({ ...settings, email_alerts: e.target.checked })}
                      className="mr-3 text-blue-600"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Email Alerts</span>
                      <p className="text-sm text-gray-600">Receive email notifications for important compliance matters</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Applicable Jurisdictions
                    </label>
                    <div className="grid md:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                      {jurisdictionOptions.map(jurisdiction => (
                        <label key={jurisdiction} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.jurisdictions.includes(jurisdiction)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSettings({ 
                                  ...settings, 
                                  jurisdictions: [...settings.jurisdictions, jurisdiction] 
                                });
                              } else {
                                setSettings({ 
                                  ...settings, 
                                  jurisdictions: settings.jurisdictions.filter(j => j !== jurisdiction) 
                                });
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <select
                      value={settings.business_type}
                      onChange={(e) => setSettings({ ...settings, business_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website URL
                      </label>
                      <input
                        type="url"
                        value={settings.website_url}
                        onChange={(e) => setSettings({ ...settings, website_url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Privacy Contact Email
                      </label>
                      <input
                        type="email"
                        value={settings.contact_email}
                        onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="privacy@yourcompany.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Current Plan</h3>
                      <p className="text-sm text-gray-600">
                        You are currently on the <span className="font-medium capitalize">{user?.plan_type}</span> plan
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user?.plan_type === 'free' 
                        ? 'bg-gray-100 text-gray-800'
                        : user?.plan_type === 'pro'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {user?.plan_type?.toUpperCase()}
                    </div>
                  </div>

                  {user?.plan_type === 'free' && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Upgrade to unlock advanced features like automated audits, priority support, and compliance monitoring.
                      </p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Upgrade to Pro
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Plan comparison cards */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Starter</h3>
                    <div className="text-2xl font-bold mb-4">$0<span className="text-sm font-normal text-gray-600">/month</span></div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Basic privacy policy generator</li>
                      <li>• Cookie consent banner</li>
                      <li>• Compliance checklist</li>
                      <li>• Email support</li>
                    </ul>
                  </div>

                  <div className="border-2 border-blue-600 rounded-lg p-6 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Most Popular
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
                    <div className="text-2xl font-bold mb-4">$49<span className="text-sm font-normal text-gray-600">/month</span></div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li>• Everything in Starter</li>
                      <li>• Privacy audit wizard</li>
                      <li>• Data request management</li>
                      <li>• Compliance monitoring</li>
                      <li>• Priority support</li>
                    </ul>
                    {user?.plan_type !== 'pro' && (
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Upgrade to Pro
                      </button>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Enterprise</h3>
                    <div className="text-2xl font-bold mb-4">$199<span className="text-sm font-normal text-gray-600">/month</span></div>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li>• Everything in Professional</li>
                      <li>• Multi-location support</li>
                      <li>• Advanced reporting</li>
                      <li>• API access</li>
                      <li>• Dedicated support</li>
                    </ul>
                    {user?.plan_type !== 'enterprise' && (
                      <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Contact Sales
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};