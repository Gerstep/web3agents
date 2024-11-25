import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AgentDetails from './pages/AgentDetails';
import AddAgent from './pages/AddAgent';
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/agent/:id" element={<AgentDetails />} />
            <Route path="/add-agent" element={<AddAgent />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;