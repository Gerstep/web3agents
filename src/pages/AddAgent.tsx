import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Web3 from 'web3';

const categories = [
  'DeFi', 'NFT', 'Gaming', 'Social', 'Infrastructure', 
  'DAO', 'Privacy', 'Analytics'
];

export default function AddAgent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: categories[0],
    walletAddress: '',
    imageUrl: '',
    apiEndpoint: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateWalletAddress = (address: string) => {
    return Web3.utils.isAddress(address);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate wallet address
      if (!validateWalletAddress(formData.walletAddress)) {
        throw new Error('Invalid wallet address');
      }

      // TODO: Upload to Supabase
      const { error: supabaseError } = await supabase
        .from('agents')
        .insert([
          {
            ...formData,
            rating: 0,
            totalRatings: 0,
            createdAt: new Date().toISOString(),
          }
        ]);

      if (supabaseError) throw supabaseError;

      navigate('/browse');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
          <Bot className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Agent</h1>
        <p className="text-gray-600 mt-2">
          Submit your Web3 agent to the directory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Agent Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full rounded-lg object-cover"
                  />
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Agent Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Technical Details */}
          <div>
            <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              required
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="0x..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700">
              API Endpoint
            </label>
            <input
              type="url"
              id="apiEndpoint"
              name="apiEndpoint"
              required
              value={formData.apiEndpoint}
              onChange={handleChange}
              placeholder="https://"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
            shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Agent...' : 'Add Agent'}
        </button>
      </form>
    </div>
  );
}