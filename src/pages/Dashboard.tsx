import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar as CalendarIcon, BookOpen, Brain, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  school_name: string;
  subjects_taught: string[];
  grade_levels: string[];
  years_of_experience: number;
}

export default function Dashboard() {
  const { user } = useAuth();

  const { data: profile } = useQuery<UserProfile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('school_name, subjects_taught, grade_levels, years_of_experience')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user?.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(3);

      if (error) throw error;
      return data;
    }
  });

  const quickStats = [
    { icon: CalendarIcon, label: 'Upcoming Classes', value: upcomingEvents?.length || '0' },
    { icon: BookOpen, label: 'Subjects', value: profile?.subjects_taught?.length || '0' },
    { icon: Brain, label: 'Grade Levels', value: profile?.grade_levels?.length || '0' },
    { icon: Clock, label: 'Years Experience', value: profile?.years_of_experience || '0' }
  ];

  return (
    <div className="space-y-6">
      {profile?.school_name && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Welcome, {profile.school_name} Teacher!</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.subjects_taught.map((subject) => (
              <span key={subject} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}

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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Schedule</h2>
          <div className="space-y-3">
            {upcomingEvents?.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{event.title}</span>
                </div>
                <span className="text-gray-500">
                  {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {(!upcomingEvents || upcomingEvents.length === 0) && (
              <p className="text-gray-500 text-center py-4">No upcoming events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}