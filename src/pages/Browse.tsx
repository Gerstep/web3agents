import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAgentStore } from '../store';
import AgentCard from '../components/AgentCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import SortSelect from '../components/SortSelect';

const categories = [
  { id: '1', name: 'DeFi', count: 156, color: 'bg-blue-500' },
  { id: '2', name: 'NFT', count: 89, color: 'bg-purple-500' },
  { id: '3', name: 'Gaming', count: 67, color: 'bg-green-500' },
  { id: '4', name: 'Social', count: 45, color: 'bg-yellow-500' },
];

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'reviews', label: 'Most Reviews' },
];

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { agents } = useAgentStore();
  
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('rating');
  
  const categoryParam = searchParams.get('category');

  const filteredAgents = agents
    .filter((agent) => {
      const matchesCategory = !categoryParam || agent.category.toLowerCase() === categoryParam.toLowerCase();
      const matchesSearch = !search || 
        agent.name.toLowerCase().includes(search.toLowerCase()) ||
        agent.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'reviews':
          return b.totalRatings - a.totalRatings;
        default:
          return 0;
      }
    });

  const handleCategorySelect = (category: string | null) => {
    if (category) {
      setSearchParams({ category: category.toLowerCase() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Browse Agents
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
          />
          <SortSelect
            value={sort}
            onChange={setSort}
            options={sortOptions}
          />
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={categoryParam}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No agents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}