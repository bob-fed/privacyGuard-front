import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Globe, 
  Calendar,
  Bell,
  TrendingUp,
  Shield,
  FileText,
  Users,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ComplianceAlert {
  id: string;
  type: 'new-law' | 'deadline' | 'update' | 'breach';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  jurisdiction: string;
  dueDate?: string;
  actionRequired: boolean;
  link?: string;
  createdDate: string;
}

interface ComplianceMetric {
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export const ComplianceMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [alerts] = useState<ComplianceAlert[]>([
    {
      id: '1',
      type: 'new-law',
      title: 'New Virginia Consumer Data Protection Act (VCDPA) Requirements',
      description: 'Virginia\'s comprehensive privacy law takes effect January 1, 2023. Review new requirements for data processing agreements and consumer rights.',
      severity: 'high',
      jurisdiction: 'Virginia, USA',
      dueDate: '2023-01-01',
      actionRequired: true,
      link: 'https://lis.virginia.gov/cgi-bin/legp604.exe?212+sum+HB2307',
      createdDate: '2024-01-10'
    },
    {
      id: '2',
      type: 'deadline',
      title: 'GDPR Annual Privacy Assessment Due',
      description: 'Your annual GDPR compliance assessment is due within 30 days. Review data processing activities and update records.',
      severity: 'medium',
      jurisdiction: 'European Union',
      dueDate: '2024-02-15',
      actionRequired: true,
      createdDate: '2024-01-15'
    },
    {
      id: '3',
      type: 'update',
      title: 'California Privacy Rights Act (CPRA) Enforcement Guidelines Updated',
      description: 'The California Privacy Protection Agency has released new enforcement guidelines. Review updated requirements for sensitive personal information.',
      severity: 'medium',
      jurisdiction: 'California, USA',
      actionRequired: false,
      link: 'https://cppa.ca.gov/',
      createdDate: '2024-01-12'
    },
    {
      id: '4',
      type: 'breach',
      title: 'Security Incident Response Plan Review Recommended',
      description: 'Recent data breaches in your industry highlight the importance of updated incident response procedures.',
      severity: 'low',
      jurisdiction: 'Global',
      actionRequired: false,
      createdDate: '2024-01-08'
    }
  ]);

  const complianceMetrics: ComplianceMetric[] = [
    { name: 'Overall Compliance Score', current: 85, target: 95, trend: 'up', unit: '%' },
    { name: 'Data Requests Response Time', current: 15, target: 30, trend: 'up', unit: 'days' },
    { name: 'Policy Updates Completed', current: 8, target: 10, trend: 'stable', unit: 'items' },
    { name: 'Staff Training Completion', current: 78, target: 100, trend: 'up', unit: '%' }
  ];

  const jurisdictionStatus = [
    { name: 'GDPR (EU)', status: 'compliant', score: 92, lastReview: '2024-01-01' },
    { name: 'CCPA (California)', status: 'compliant', score: 88, lastReview: '2024-01-05' },
    { name: 'VCDPA (Virginia)', status: 'action-needed', score: 65, lastReview: '2023-12-15' },
    { name: 'CPA (Colorado)', status: 'compliant', score: 90, lastReview: '2024-01-10' },
    { name: 'PIPEDA (Canada)', status: 'review-needed', score: 75, lastReview: '2023-11-20' }
  ];

  const getAlertIcon = (type: ComplianceAlert['type']) => {
    switch (type) {
      case 'new-law': return Globe;
      case 'deadline': return Clock;
      case 'update': return Info;
      case 'breach': return AlertTriangle;
      default: return Info;
    }
  };

  const getSeverityColor = (severity: ComplianceAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'green';
      case 'action-needed': return 'red';
      case 'review-needed': return 'yellow';
      default: return 'gray';
    }
  };

  const filterAlerts = (severity?: string) => {
    if (!severity || severity === 'all') return alerts;
    return alerts.filter(alert => alert.severity === severity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Monitor</h1>
        <p className="text-gray-600">
          Stay updated on privacy regulations and monitor your compliance status across jurisdictions
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: Shield },
            { id: 'alerts', name: 'Alerts', icon: Bell },
            { id: 'jurisdictions', name: 'Jurisdictions', icon: Globe },
            { id: 'reports', name: 'Reports', icon: FileText }
          ].map(tab => (
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

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Compliance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceMetrics.map((metric, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                  <div className={`flex items-center ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.current}{metric.unit}
                    </p>
                    <p className="text-xs text-gray-500">
                      Target: {metric.target}{metric.unit}
                    </p>
                  </div>
                  <div className="w-16 h-16">
                    <svg className="transform -rotate-90 w-16 h-16">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - metric.current / metric.target)}`}
                        className="text-blue-600"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
              <button
                onClick={() => setActiveTab('alerts')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {alerts.slice(0, 3).map(alert => {
                const AlertIcon = getAlertIcon(alert.type);
                const severityColor = getSeverityColor(alert.severity);
                
                return (
                  <div key={alert.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <div className={`p-2 rounded-lg mr-4 bg-${severityColor}-100`}>
                      <AlertIcon className={`h-5 w-5 text-${severityColor}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{alert.jurisdiction}</span>
                            {alert.dueDate && (
                              <span>Due: {new Date(alert.dueDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        {alert.actionRequired && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                            Action Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Jurisdiction Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Jurisdiction Status</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jurisdictionStatus.map((jurisdiction, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{jurisdiction.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(jurisdiction.status)}-100 text-${getStatusColor(jurisdiction.status)}-800`}>
                      {jurisdiction.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Compliance Score</span>
                    <span className="text-sm font-medium">{jurisdiction.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full bg-${getStatusColor(jurisdiction.status)}-600`}
                      style={{ width: `${jurisdiction.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Last reviewed: {new Date(jurisdiction.lastReview).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Alerts</h2>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Mark All Read
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {alerts.map(alert => {
                const AlertIcon = getAlertIcon(alert.type);
                const severityColor = getSeverityColor(alert.severity);
                
                return (
                  <div key={alert.id} className="flex items-start p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`p-3 rounded-lg mr-4 bg-${severityColor}-100`}>
                      <AlertIcon className={`h-6 w-6 text-${severityColor}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${severityColor}-100 text-${severityColor}-800`}>
                            {alert.severity.toUpperCase()}
                          </span>
                          {alert.actionRequired && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              Action Required
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{alert.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Globe className="h-4 w-4 mr-1" />
                            {alert.jurisdiction}
                          </span>
                          {alert.dueDate && (
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {new Date(alert.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          <span>
                            Created: {new Date(alert.createdDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {alert.link && (
                            <a
                              href={alert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                            >
                              Learn More <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                          <button className="text-gray-600 hover:text-gray-800 text-sm">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Jurisdictions Tab */}
      {activeTab === 'jurisdictions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Jurisdiction Compliance Status</h2>
            <div className="space-y-6">
              {jurisdictionStatus.map((jurisdiction, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{jurisdiction.name}</h3>
                      <p className="text-sm text-gray-600">Last reviewed: {new Date(jurisdiction.lastReview).toLocaleDateString()}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-${getStatusColor(jurisdiction.status)}-100 text-${getStatusColor(jurisdiction.status)}-800`}>
                      {jurisdiction.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                      <span className="text-sm font-bold text-gray-900">{jurisdiction.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-${getStatusColor(jurisdiction.status)}-600 transition-all duration-300`}
                        style={{ width: `${jurisdiction.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {jurisdiction.status === 'compliant' && 'All requirements met'}
                      {jurisdiction.status === 'action-needed' && 'Immediate action required'}
                      {jurisdiction.status === 'review-needed' && 'Review recommended'}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Reports</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Monthly Compliance Summary',
                  description: 'Overview of compliance status across all jurisdictions',
                  lastGenerated: '2024-01-15',
                  type: 'summary'
                },
                {
                  title: 'GDPR Compliance Report',
                  description: 'Detailed GDPR compliance assessment and recommendations',
                  lastGenerated: '2024-01-10',
                  type: 'detailed'
                },
                {
                  title: 'Data Request Activity Report',
                  description: 'Summary of data subject requests and response times',
                  lastGenerated: '2024-01-12',
                  type: 'activity'
                },
                {
                  title: 'Security Incident Report',
                  description: 'Analysis of security incidents and response actions',
                  lastGenerated: '2024-01-08',
                  type: 'security'
                },
                {
                  title: 'Training Completion Report',
                  description: 'Staff privacy training completion status',
                  lastGenerated: '2024-01-14',
                  type: 'training'
                },
                {
                  title: 'Vendor Compliance Assessment',
                  description: 'Third-party vendor privacy compliance evaluation',
                  lastGenerated: '2024-01-05',
                  type: 'vendor'
                }
              ].map((report, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <span className="text-xs text-gray-500">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                      Generate
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                      View Last
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};