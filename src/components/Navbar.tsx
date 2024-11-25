import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Plus, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold">Web3 Agents</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/add-agent" 
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Agent</span>
            </Link>
            
            <Link 
              to="/sign-in" 
              className="flex items-center space-x-1 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}