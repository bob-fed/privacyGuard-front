import React, { useState } from 'react';
import { 
  FileSearch, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  ArrowLeft,
  Users,
  Database,
  Shield,
  Globe,
  Cookie
} from 'lucide-react';

interface AuditStep {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  type: 'boolean' | 'multiple' | 'text';
  options?: string[];
  required: boolean;
}

export const PrivacyAudit: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const auditSteps: AuditStep[] = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      description: 'What personal data does your business collect?',
      questions: [
        {
          id: 'collects-personal-data',
          text: 'Do you collect personal information from customers or users?',
          type: 'boolean',
          required: true
        },
        {
          id: 'data-types',
          text: 'What types of personal data do you collect?',
          type: 'multiple',
          options: [
            'Names and contact information',
            'Email addresses',
            'Phone numbers',
            'Physical addresses',
            'Payment information',
            'User behavior/analytics',
            'Location data',
            'Sensitive personal data (health, biometric, etc.)'
          ],
          required: true
        },
        {
          id: 'collection-methods',
          text: 'How do you collect this data?',
          type: 'multiple',
          options: [
            'Website forms',
            'Email subscriptions',
            'Online purchases',
            'Customer service interactions',
            'Cookies and tracking',
            'Mobile apps',
            'Third-party sources'
          ],
          required: true
        }
      ]
    },
    {
      id: 'data-usage',
      title: 'Data Usage & Sharing',
      description: 'How do you use and share personal data?',
      questions: [
        {
          id: 'data-purposes',
          text: 'What do you use personal data for?',
          type: 'multiple',
          options: [
            'Providing products/services',
            'Customer support',
            'Marketing communications',
            'Analytics and insights',
            'Legal compliance',
            'Fraud prevention',
            'Personalization'
          ],
          required: true
        },
        {
          id: 'data-sharing',
          text: 'Do you share personal data with third parties?',
          type: 'boolean',
          required: true
        },
        {
          id: 'third-parties',
          text: 'Which third parties do you share data with?',
          type: 'multiple',
          options: [
            'Service providers',
            'Payment processors',
            'Marketing platforms',
            'Analytics services',
            'Cloud storage providers',
            'Legal/regulatory authorities',
            'Business partners'
          ],
          required: false
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      description: 'How do you protect personal data?',
      questions: [
        {
          id: 'security-measures',
          text: 'What security measures do you have in place?',
          type: 'multiple',
          options: [
            'SSL/TLS encryption',
            'Password protection',
            'Two-factor authentication',
            'Regular backups',
            'Access controls',
            'Employee training',
            'Security audits'
          ],
          required: true
        },
        {
          id: 'data-retention',
          text: 'Do you have a data retention policy?',
          type: 'boolean',
          required: true
        },
        {
          id: 'data-deletion',
          text: 'Can users request deletion of their data?',
          type: 'boolean',
          required: true
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Legal Compliance',
      description: 'What privacy laws apply to your business?',
      questions: [
        {
          id: 'jurisdictions',
          text: 'Which jurisdictions do you operate in?',
          type: 'multiple',
          options: [
            'United States',
            'European Union',
            'California',
            'New York',
            'Virginia',
            'Colorado',
            'Canada',
            'Other'
          ],
          required: true
        },
        {
          id: 'privacy-policy',
          text: 'Do you have a privacy policy?',
          type: 'boolean',
          required: true
        },
        {
          id: 'cookie-consent',
          text: 'Do you have cookie consent mechanisms?',
          type: 'boolean',
          required: true
        },
        {
          id: 'user-rights',
          text: 'Do you provide mechanisms for users to exercise their privacy rights?',
          type: 'boolean',
          required: true
        }
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const canProceed = () => {
    const currentQuestions = auditSteps[currentStep].questions;
    return currentQuestions.every(q => 
      !q.required || answers[q.id] !== undefined
    );
  };

  const nextStep = () => {
    if (currentStep < auditSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateComplianceScore = () => {
    let score = 0;
    let totalPoints = 0;

    // Basic scoring logic
    if (answers['privacy-policy']) score += 20;
    if (answers['cookie-consent']) score += 15;
    if (answers['user-rights']) score += 20;
    if (answers['data-retention']) score += 15;
    if (answers['data-deletion']) score += 15;
    if (answers['security-measures']?.length >= 4) score += 15;

    totalPoints = 100;

    return Math.min(score, totalPoints);
  };

  const getRecommendations = () => {
    const recommendations = [];

    if (!answers['privacy-policy']) {
      recommendations.push({
        priority: 'high',
        title: 'Create a Privacy Policy',
        description: 'You need a comprehensive privacy policy that explains your data practices.'
      });
    }

    if (!answers['cookie-consent']) {
      recommendations.push({
        priority: 'high',
        title: 'Implement Cookie Consent',
        description: 'Add cookie consent banners to comply with GDPR and other regulations.'
      });
    }

    if (!answers['user-rights']) {
      recommendations.push({
        priority: 'medium',
        title: 'User Rights Mechanisms',
        description: 'Provide ways for users to access, correct, or delete their data.'
      });
    }

    if (!answers['data-retention']) {
      recommendations.push({
        priority: 'medium',
        title: 'Data Retention Policy',
        description: 'Establish clear policies for how long you keep personal data.'
      });
    }

    if (answers['security-measures']?.length < 4) {
      recommendations.push({
        priority: 'high',
        title: 'Strengthen Security',
        description: 'Implement additional security measures to protect personal data.'
      });
    }

    return recommendations;
  };

  if (isComplete) {
    const score = calculateComplianceScore();
    const recommendations = getRecommendations();

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Complete!</h1>
            <p className="text-gray-600">
              Here's your privacy compliance assessment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
              <div className="text-gray-600">Compliance Score</div>
              <div className={`mt-2 inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                score >= 80 ? 'bg-green-100 text-green-800' :
                score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {score >= 80 ? 'Good' : score >= 60 ? 'Needs Improvement' : 'At Risk'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{recommendations.length}</div>
              <div className="text-gray-600">Action Items</div>
              <div className="mt-2 text-sm text-gray-500">
                Recommendations to improve compliance
              </div>
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <div className={`p-1 rounded-full mr-3 mt-1 ${
                      rec.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      <AlertTriangle className={`h-4 w-4 ${
                        rec.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setIsComplete(false);
              }}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start New Audit
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Generate Action Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  const step = auditSteps[currentStep];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Audit Wizard</h1>
        <p className="text-gray-600">
          Answer a few questions to assess your privacy compliance posture
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {auditSteps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / auditSteps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / auditSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
          <p className="text-gray-600">{step.description}</p>
        </div>

        <div className="space-y-6">
          {step.questions.map((question) => (
            <div key={question.id} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {question.text}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h3>

              {question.type === 'boolean' && (
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={question.id}
                      value="true"
                      checked={answers[question.id] === true}
                      onChange={() => handleAnswer(question.id, true)}
                      className="mr-3 text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={question.id}
                      value="false"
                      checked={answers[question.id] === false}
                      onChange={() => handleAnswer(question.id, false)}
                      className="mr-3 text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              )}

              {question.type === 'multiple' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={answers[question.id]?.includes(option) || false}
                        onChange={(e) => {
                          const currentAnswers = answers[question.id] || [];
                          if (e.target.checked) {
                            handleAnswer(question.id, [...currentAnswers, option]);
                          } else {
                            handleAnswer(question.id, currentAnswers.filter((a: string) => a !== option));
                          }
                        }}
                        className="mr-3 text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'text' && (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Please provide details..."
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === auditSteps.length - 1 ? 'Complete Audit' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};