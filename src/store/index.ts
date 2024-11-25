import { create } from 'zustand';
import { Agent } from '../types';
import { sampleAgents } from '../data/sampleAgents';

interface AgentStore {
  agents: Agent[];
  loading: boolean;
  setAgents: (agents: Agent[]) => void;
  setLoading: (loading: boolean) => void;
  initializeStore: () => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [],
  loading: false,
  setAgents: (agents) => set({ agents }),
  setLoading: (loading) => set({ loading }),
  initializeStore: () => {
    // In a real app, this would fetch from Supabase
    set({ agents: sampleAgents });
  },
}));