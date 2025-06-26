import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs: FAQItem[] = [
    {
      question: "What privacy laws does PrivacyGuard help with?",
      answer: "PrivacyGuard helps you comply with major privacy regulations including GDPR (European Union), CCPA (California), VCDPA (Virginia), CPA (Colorado), and other state privacy laws in the US. We continuously update our platform to support new regulations as they emerge.",
      category: "compliance"
    },
    {
      question: "How do I start my first privacy audit?",
      answer: "Navigate to the Privacy Audit section from your dashboard. Our guided wizard will walk you through a series of questions about your data collection practices. The audit typically takes 10-15 minutes to complete and provides you with a compliance score and actionable recommendations.",
      category: "getting-started"
    },
    {
      question: "Can I customize the generated privacy policies?",
      answer: "Yes! Our policy generator creates a baseline policy based on your business information and practices. You can then customize the content to match your specific needs. We recommend having legal counsel review any significant modifications.",
      category: "policies"
    },
    {
      question: "How do I handle data subject requests?",
      answer: "Use the Data Requests section to log and track requests from individuals. The system helps you manage deadlines (typically 30 days) and provides templates for responses. You can update request status and maintain a complete audit trail.",
      category: "data-requests"
    },
    {
      question: "What's the difference between plan types?",
      answer: "The Free plan includes basic policy generation and checklists. The Pro plan ($49/month) adds privacy audits, data request management, and compliance monitoring. Enterprise ($199/month) includes multi-location support, advanced reporting, and API access.",
      category: "billing"
    },
    {
      question: "How often should I update my privacy policies?",
      answer: "Review your privacy policies at least annually or whenever you make significant changes to your data practices. Our compliance monitoring will alert you to new regulations that may require policy updates.",
      category: "policies"
    },
    {
      question: "Is my data secure with PrivacyGuard?",
      answer: "Yes, we use enterprise-grade security including SSL encryption, secure data centers, and regular security audits. We follow privacy-by-design principles and are compliant with the same regulations we help you navigate.",
      category: "security"
    },
    {
      question: "Can I export my data from PrivacyGuard?",
      answer: "Yes, you can export your audit reports, generated policies, and data request logs at any time. We believe in data portability and will never lock you into our platform.",
      category: "data-management"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'policies', name: 'Policies' },
    { id: 'data-requests', name: 'Data Requests' },
    { id: 'billing', name: 'Billing' },
    { id: 'security', name: 'Security' },
    { id: 'data-management', name: 'Data Management' }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const resources = [
    {
      title: "Privacy Law Guide",
      description: "Comprehensive guide to understanding GDPR, CCPA, and other privacy regulations",
      link: "#",
      icon: Book
    },
    {
      title: "Best Practices Checklist",
      description: "Essential privacy practices every business should implement",
      link: "#",
      icon: HelpCircle
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for using PrivacyGuard features",
      link: "#",
      icon: ExternalLink
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">
          Find answers to common questions and get help with PrivacyGuard
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Contact Support</h2>
            <div className="space-y-4">
              <a
                href="mailto:support@privacyguard.com"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Email Support</div>
                  <div className="text-sm text-gray-600">support@privacyguard.com</div>
                </div>
              </a>
              
              <a
                href="#"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Live Chat</div>
                  <div className="text-sm text-gray-600">Available 9 AM - 5 PM EST</div>
                </div>
              </a>

              <a
                href="tel:+1-555-0123"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Phone Support</div>
                  <div className="text-sm text-gray-600">+1 (555) 012-3456</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Resources</h2>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <resource.icon className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{resource.title}</div>
                    <div className="text-xs text-gray-600">{resource.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse all topics
                  </p>
                </div>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Still need help */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Still need help?</h3>
              <p className="text-blue-700 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
                <button className="border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};