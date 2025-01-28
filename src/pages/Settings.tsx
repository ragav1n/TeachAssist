import React from 'react';
import { User, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  const sections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Update your personal information and preferences'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure how you receive alerts and reminders'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your account security and privacy preferences'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of your dashboard'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {sections.map((section) => (
          <div key={section.title} className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <section.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{section.description}</p>
              </div>
              <div className="ml-auto">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}