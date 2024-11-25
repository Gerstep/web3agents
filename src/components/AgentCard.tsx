import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  featured?: boolean;
}

export default function AgentCard({ agent, featured = false }: AgentCardProps) {
  const cardClass = featured
    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-xl hover:shadow-lg transition'
    : 'bg-white p-6 rounded-xl hover:shadow-lg transition border border-gray-100';

  const categoryClass = featured
    ? 'bg-white/20 text-white'
    : 'bg-blue-50 text-blue-700';

  const descriptionClass = featured
    ? 'text-white/80'
    : 'text-gray-600';

  return (
    <Link to={`/agent/${agent.id}`} className="block group">
      <div className={cardClass}>
        <div className="flex items-center space-x-4">
          <img 
            src={agent.imageUrl} 
            alt={agent.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">
              {agent.name}
            </h3>
            <p className={`text-sm ${descriptionClass} truncate`}>
              {agent.description}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryClass}`}>
            {agent.category}
          </span>
          
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            <span>{agent.rating.toFixed(1)}</span>
            <span className="mx-1">·</span>
            <span>{agent.totalRatings} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );
}