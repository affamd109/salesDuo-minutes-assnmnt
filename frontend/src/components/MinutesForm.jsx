'use client';

import { useState } from 'react';
import axios from 'axios';

function MinutesForm({ onResult, onError, setLoading, loading }) {
  const [minutes, setMinutes] = useState('');
  const [file, setFile] = useState(null);
    // const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onError('');
    onResult(null);

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        response = await axios.post(`${API}/process-meeting`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post(`${API}/process-meeting`, minutes, {
          headers: { 'Content-Type': 'text/plain' },
        });
      }
      onResult(response.data);
    } catch (err) {
      console.error(err);
      onError('Failed to process minutes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-[#0f0f0f]/90 backdrop-blur-sm border border-purple-900/50 rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="p-6 space-y-6">
        {/* Textarea Section */}
        <div className="space-y-3">
          <label className="block text-lg font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            Meeting Transcript
          </label>
          <textarea
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            rows="8"
            disabled={file !== null}
            required={!file}
            placeholder="Paste your meeting minutes here..."
            className="w-full p-4 bg-[#1a1a1a]/80 border border-purple-900/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent transition-all"
          />
        </div>

        {/* File Upload Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-300">
              Or upload a file
            </label>
            <span className="text-xs text-gray-500">Supports: .txt</span>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer">
              <div className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg transition-colors ${
                file 
                  ? 'border-emerald-500/30 bg-emerald-900/10' 
                  : 'border-purple-900/50 hover:border-purple-600/70 bg-[#1a1a1a]/80'
              }`}>
                <div className="text-center">
                  {file ? (
                    <p className="text-sm font-medium text-emerald-400">{file.name}</p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      <span className="font-medium text-purple-400">Click to browse</span> 
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  disabled={loading}
                />
              </div>
            </label>
            
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                disabled={loading}
                className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 bg-red-900/20 rounded-lg"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || (!minutes && !file)}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            loading 
              ? 'bg-purple-900/70 text-purple-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            'Extract Meeting Insights'
          )}
        </button>
      </div>
    </form>
  );
}

export default MinutesForm;