import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Share2, ExternalLink } from 'lucide-react';
import { useAgentStore } from '../store';

export default function AgentDetails() {
  const { id } = useParams();
  const { agents } = useAgentStore();
  const [userRating, setUserRating] = useState<number | null>(null);
  
  const agent = agents.find(a => a.id === id);

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Agent not found.</p>
      </div>
    );
  }

  const handleRating = async (rating: number) => {
    setUserRating(rating);
    // TODO: Implement rating submission to Supabase
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={agent.imageUrl} 
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
              <p className="text-gray-600 mt-1">{agent.description}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {agent.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{agent.rating.toFixed(1)}</span>
                  <span className="mx-1">·</span>
                  <span>{agent.totalRatings} ratings</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <a 
              href={`https://etherscan.io/address/${agent.walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ExternalLink className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Rate this Agent</h2>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRating(rating)}
              className={`p-1 rounded-full transition ${
                (userRating || 0) >= rating 
                  ? 'text-yellow-400 hover:text-yellow-500'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              <Star className="w-8 h-8" fill={userRating && userRating >= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
      </div>

      {/* Integration Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Integration Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Wallet Address</h3>
            <code className="block mt-1 p-3 bg-gray-50 rounded-lg text-sm">
              {agent.walletAddress}
            </code>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">API Endpoint</h3>
            <code className="block mt-1 p-3 bg-gray-50 rounded-lg text-sm">
              https://api.web3agents.com/v1/agents/{agent.id}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}