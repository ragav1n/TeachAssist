import React from 'react';
import { Plus } from 'lucide-react';

export default function Calendar() {
  const events = [
    { id: 1, title: 'Math Class', time: '10:00 AM', type: 'class' },
    { id: 2, title: 'Science Lab', time: '2:30 PM', type: 'lab' },
    { id: 3, title: 'Parent Meeting', time: '4:00 PM', type: 'meeting' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full capitalize" 
                  style={{
                    backgroundColor: 
                      event.type === 'class' ? 'rgb(219 234 254)' :
                      event.type === 'lab' ? 'rgb(220 252 231)' :
                      'rgb(254 226 226)',
                    color:
                      event.type === 'class' ? 'rgb(29 78 216)' :
                      event.type === 'lab' ? 'rgb(21 128 61)' :
                      'rgb(185 28 28)'
                  }}
                >
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}