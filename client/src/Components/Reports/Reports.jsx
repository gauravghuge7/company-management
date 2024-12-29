// Import required libraries
import React from 'react';

// Reports Component
const Reports = () => {
  const reportCards = [
    { title: 'Contact Team Leader', description: 'Reach out to your team leader for guidance on your current tasks.', contact: 'Team Leader' },
    { title: 'Contact Manager', description: 'Discuss project updates or raise any concerns with your manager.', contact: 'Manager' },
    { title: 'Request Resources', description: 'If you need additional resources or support, contact your manager.', contact: 'Manager' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <p className="text-gray-500">Contact: {card.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
