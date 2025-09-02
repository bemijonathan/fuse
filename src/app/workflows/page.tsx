'use client';

import { useState, useEffect } from 'react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Patient Intake Workflow',
    description: 'Handles new patient registration and initial assessment',
    status: 'active',
    createdAt: '2024-09-01'
  },
  {
    id: '2',
    name: 'Insurance Verification',
    description: 'Verifies patient insurance eligibility and benefits',
    status: 'active',
    createdAt: '2024-08-15'
  },
  {
    id: '3',
    name: 'Appointment Scheduling',
    description: 'Automates appointment booking with clinics',
    status: 'inactive',
    createdAt: '2024-07-20'
  }
];

export default function WorkflowsPage() {
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Update chat messages when workflow selection or create mode changes
  useEffect(() => {
    if (isCreatingWorkflow) {
      setChatMessages([
        {
          id: '1',
          sender: 'ai',
          message: 'Hello! I\'m your AI Workflow Creator. Let\'s design a new healthcare workflow together! What type of workflow would you like to create? (e.g., patient intake, insurance verification, appointment scheduling)',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } else if (selectedWorkflow) {
      setChatMessages([
        {
          id: '1',
          sender: 'ai',
          message: `Hello! I'm the AI agent for "${selectedWorkflow.name}". How can I help you optimize or modify this workflow?`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } else {
      setChatMessages([
        {
          id: '1',
          sender: 'ai',
          message: 'Create new agent - Select a workflow from the list to start chatting with its dedicated AI agent.',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }
  }, [selectedWorkflow, isCreatingWorkflow]);
  const handleUseChatbot = () => {
    setSelectedWorkflow(null);
    setIsCreatingWorkflow(true);
  };

  const handleDesignWorkflow = () => {
    // For now, just show an alert - this could navigate to a design interface
    alert('Design Workflow feature coming soon!');
  };

  const handleWorkflowSelect = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setIsCreatingWorkflow(false);
  };

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: isCreatingWorkflow 
          ? 'Great! Let\'s create a new workflow. I\'ll help you design it step by step. What\'s the main goal of this workflow?'
          : selectedWorkflow 
          ? `I understand you're asking about "${selectedWorkflow.name}". Let me help you with that specific workflow. What would you like to know or modify?`
          : 'Please select a workflow first to start our conversation.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <div className="dropdown dropdown-end">
            <button type="button" tabIndex={0} className="btn btn-primary">Create New Workflow</button>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><button type="button" className="btn btn-ghost" onClick={handleUseChatbot}>Use Chatbot</button></li>
              <li><button type="button" className="btn btn-ghost" onClick={handleDesignWorkflow}>Design Workflow</button></li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workflows List Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Created Workflows</h2>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <button 
                    key={workflow.id} 
                    type="button"
                    className={`w-full text-left border border-base-300 rounded-lg p-4 hover:bg-base-200 transition-colors ${
                      selectedWorkflow?.id === workflow.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleWorkflowSelect(workflow)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <div className={`badge ${workflow.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                        {workflow.status}
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 mb-2">{workflow.description}</p>
                    <p className="text-xs text-base-content/50">Created: {workflow.createdAt}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                {isCreatingWorkflow ? 'Create New Workflow' : selectedWorkflow ? `${selectedWorkflow.name} Agent` : 'AI Workflow Planner'}
              </h2>
              <div className="flex flex-col h-96">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                      <div className="chat-header">
                        {msg.sender === 'user' ? 'You' : isCreatingWorkflow ? 'Workflow Creator' : 'AI Planner'}
                        <time className="text-xs opacity-50 ml-2">{msg.timestamp}</time>
                      </div>
                      <div className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Chat Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={
                      isCreatingWorkflow 
                        ? "Describe your workflow idea..." 
                        : selectedWorkflow 
                        ? `Ask about ${selectedWorkflow.name}...` 
                        : "Select a workflow to start chatting"
                    }
                    className="input input-bordered flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={!selectedWorkflow && !isCreatingWorkflow}
                  />
                  <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || (!selectedWorkflow && !isCreatingWorkflow)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
