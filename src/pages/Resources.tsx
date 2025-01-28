import React from 'react';
import { Search, Plus, FileText, Link as LinkIcon, FolderOpen } from 'lucide-react';

export default function Resources() {
  const resources = [
    { id: 1, title: 'Math Curriculum Guide', type: 'document', date: '2024-02-20' },
    { id: 2, title: 'Science Lab Safety Rules', type: 'link', date: '2024-02-19' },
    { id: 3, title: 'History Timeline Templates', type: 'folder', date: '2024-02-18' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Add Resource
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search resources..."
              />
            </div>
          </div>

          {/* Resources List */}
          <div className="space-y-4">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  {resource.type === 'document' && <FileText className="h-5 w-5 text-blue-500 mr-3" />}
                  {resource.type === 'link' && <LinkIcon className="h-5 w-5 text-green-500 mr-3" />}
                  {resource.type === 'folder' && <FolderOpen className="h-5 w-5 text-yellow-500 mr-3" />}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-500">Added on {resource.date}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Options</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}