// Import required libraries
import React from 'react';

const faqs = [
    { question: 'How do I create a support ticket?', answer: 'You can create a support ticket by logging into your account and navigating to the Support section.' },
    { question: 'What is the response time for support?', answer: 'Our average response time is within 24 hours during business days.' },
    { question: 'Can I track the status of my ticket?', answer: 'Yes, you can track the status of your ticket in the Tickets section of your account.' },
];

const processSteps = [
    { step: 1, title: 'Submit Ticket', description: 'Provide details about your issue and submit a support ticket.' },
    { step: 2, title: 'Ticket Assignment', description: 'Your ticket will be assigned to the relevant team based on the issue type.' },
    { step: 3, title: 'Resolution', description: 'Our team will work on resolving your issue and keep you updated.' },
];

const SupportInfo = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Support Center - FAQ & Process</h1>

        {/* FAQ Section */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
                </div>
            ))}
            </div>
        </div>

        {/* Process Section */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Support Process</h2>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
                <div key={step.step} className="bg-white p-4 rounded shadow">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{step.title}</h3>
                    <span className="text-gray-400">Step {step.step}</span>
                </div>
                <p className="text-gray-600">{step.description}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
};

export default SupportInfo;
