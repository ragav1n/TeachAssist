import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

interface UserProfile {
  school_name: string;
  subjects_taught: string[];
  grade_levels: string[];
  years_of_experience: number;
  teaching_style: string;
  interests: string[];
}

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    subjectsTaught: '',
    gradeLevels: '',
    yearsOfExperience: '',
    teachingStyle: '',
    interests: ''
  });

  useEffect(() => {
    async function loadProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfile(data);
          setFormData({
            schoolName: data.school_name || '',
            subjectsTaught: data.subjects_taught?.join(', ') || '',
            gradeLevels: data.grade_levels?.join(', ') || '',
            yearsOfExperience: data.years_of_experience?.toString() || '',
            teachingStyle: data.teaching_style || '',
            interests: data.interests?.join(', ') || ''
          });
        }
      }
    }

    loadProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('users')
        .update({
          school_name: formData.schoolName,
          subjects_taught: formData.subjectsTaught.split(',').map(s => s.trim()),
          grade_levels: formData.gradeLevels.split(',').map(s => s.trim()),
          years_of_experience: parseInt(formData.yearsOfExperience),
          teaching_style: formData.teachingStyle,
          interests: formData.interests.split(',').map(s => s.trim())
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <User className="h-6 w-6 text-gray-400" />
              <h2 className="ml-3 text-lg font-medium text-gray-900">Profile Settings</h2>
            </div>
            <Button
              variant="outline"
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="subjectsTaught">Subjects Taught</Label>
                <Input
                  id="subjectsTaught"
                  name="subjectsTaught"
                  value={formData.subjectsTaught}
                  onChange={handleChange}
                  placeholder="Comma-separated subjects"
                />
              </div>

              <div>
                <Label htmlFor="gradeLevels">Grade Levels</Label>
                <Input
                  id="gradeLevels"
                  name="gradeLevels"
                  value={formData.gradeLevels}
                  onChange={handleChange}
                  placeholder="Comma-separated grades"
                />
              </div>

              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="teachingStyle">Teaching Style</Label>
                <Textarea
                  id="teachingStyle"
                  name="teachingStyle"
                  value={formData.teachingStyle}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="interests">Professional Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Comma-separated interests"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {profile && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">School</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.school_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {profile.subjects_taught.map((subject) => (
                        <span key={subject} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Grade Levels</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {profile.grade_levels.map((grade) => (
                        <span key={grade} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {grade}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-gray-400" />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
              <p className="mt-1 text-sm text-gray-500">Manage your notification preferences</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-gray-400" />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
              <p className="mt-1 text-sm text-gray-500">Update your security preferences</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center">
            <Palette className="h-6 w-6 text-gray-400" />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">Appearance</h2>
              <p className="mt-1 text-sm text-gray-500">Customize your interface</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}