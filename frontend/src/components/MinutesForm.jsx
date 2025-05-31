'use client';

import { useState } from 'react';
import axios from 'axios';

function MinutesForm({ onResult, onError, setLoading, loading }) {
  const [minutes, setMinutes] = useState('');
  const [file, setFile] = useState(null);

  const API = import.meta.env.VITE_API_URL ;

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
      className="w-full max-w-xl bg-[#0f0f0f] border border-purple-800 p-6 rounded-xl shadow-lg"
    >
      {/* Textarea */}
      <div>
        <label className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
          Paste Meeting Text
        </label>
        <textarea
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          rows="8"
          disabled={file !== null}
          required={!file}
          className="w-full mt-2 p-3 bg-[#1a1a1a] text-white border border-purple-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
        />
      </div>

      {/* File Upload */}
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Or upload a <code>.txt</code> file:
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white file:mr-4 file:px-4 file:py-1 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition"
        />
        {file && (
          <button
            type="button"
            onClick={() => setFile(null)}
            className="mt-2 text-sm text-red-400 hover:underline"
          >
            Remove file
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 cursor-pointer  w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-md transition"
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
}

export default MinutesForm;