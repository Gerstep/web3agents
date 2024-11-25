import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import AgentCard from '../components/AgentCard';
import { useAgentStore } from '../store';

const categories = [
  { id: '1', name: 'DeFi', count: 156, color: 'from-blue-500 to-blue-600' },
  { id: '2', name: 'NFT', count: 89, color: 'from-purple-500 to-purple-600' },
  { id: '3', name: 'Gaming', count: 67, color: 'from-green-500 to-green-600' },
  { id: '4', name: 'Social', count: 45, color: 'from-yellow-500 to-yellow-600' },
  { id: '5', name: 'DAO', count: 34, color: 'from-red-500 to-red-600' },
  { id: '6', name: 'Privacy', count: 23, color: 'from-indigo-500 to-indigo-600' },
];

export default function Home() {
  const { agents, initializeStore } = useAgentStore();
  
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  const featuredAgents = agents.slice(0, 3);
  const topAgents = agents.slice(3, 9);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl max-w-2xl mx-auto">
          Discover and Connect with Web3 Agents
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore the future of decentralized automation with our curated collection of Web3 agents
        </p>
        
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, category, or description..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Agents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} featured />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <Link 
            to="/browse" 
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/browse?category=${category.name.toLowerCase()}`}
              className="block group"
            >
              <div className={`p-6 rounded-xl bg-gradient-to-br ${category.color} text-white hover:shadow-lg transition`}>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">{category.count} agents</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Agents */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Rated Agents
          </h2>
          <Link 
            to="/browse" 
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}