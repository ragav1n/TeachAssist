import React from 'react';
import { Calendar as CalendarIcon, BookOpen, Brain, Clock } from 'lucide-react';

export default function Dashboard() {
  const upcomingEvents = [
    { id: 1, title: 'Math Class - Grade 10', time: '10:00 AM' },
    { id: 2, title: 'Science Lab', time: '2:30 PM' },
    { id: 3, title: 'Parent-Teacher Meeting', time: '4:00 PM' }
  ];

  const quickStats = [
    { icon: CalendarIcon, label: 'Upcoming Classes', value: '3' },
    { icon: BookOpen, label: 'Resources Created', value: '12' },
    { icon: Brain, label: 'AI Generations', value: '25' },
    { icon: Clock, label: 'Hours Saved', value: '8' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{event.title}</span>
                </div>
                <span className="text-gray-500">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}