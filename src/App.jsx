import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './bot/config';
import MessageParser from './bot/MessageParser';
import ActionProvider from './bot/ActionProvider';
import ChatHistory from './Components/ChatHistory';
import './App.css';

function App() {
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to toggle sidebar visibility
  const [messages, setMessages] = useState([]); // To hold messages for the current conversation

  useEffect(() => {
    // Load saved conversations on component mount
    const savedConversations = JSON.parse(localStorage.getItem('conversations') || '');
    setConversations(savedConversations);

    // If there are conversations, set the current one to the most recent
    if (savedConversations.length > 0) {
      setCurrentConversationId(savedConversations[savedConversations.length - 1].id);
    } else {
      // Otherwise create a new conversation
      startNewConversation();
    }
  }, []);

  useEffect(() => {
    // Update messages whenever the current conversation ID changes
    setMessages(loadMessages());
  }, [currentConversationId]);

  // Save messages to localStorage
  const saveMessages = (messages) => {
    if (!currentConversationId) return;

    const updatedConversations = conversations.map((convo) =>
      convo.id === currentConversationId
        ? { ...convo, messages, lastUpdated: new Date().toISOString() }
        : convo
    );

    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  };

  // Load messages for the current conversation
  const loadMessages = () => {
    if (!currentConversationId) return [];

    const currentConversation = conversations.find(
      (convo) => convo.id === currentConversationId
    );

    return currentConversation ? currentConversation.messages : [];
  };

  // Start a new conversation
  const startNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: `Conversation ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    const updatedConversations = [...conversations, newConversation];
    setConversations(updatedConversations);
    setCurrentConversationId(newConversation.id); // Key prop in Chatbot will trigger remount
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  };

  // Switch to a different conversation
  const switchConversation = (conversationId) => {
    setCurrentConversationId(conversationId); // Key prop in Chatbot will trigger remount
  };

  return (
    <div className="app-container">
      {/* Menu Icon for Smaller Screens */}
      <div className="menu-icon" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
        ☰ {/* Hamburger menu icon */}
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="sidebar">
          
          <h3 className='heading'>Insti-Gpt</h3>
          <button onClick={startNewConversation} className="new-chat-button">
            New Conversation
          </button>
          <ChatHistory
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={switchConversation}
          />
        </div>
      )}

      {/* Chatbot */}
      <Chatbot
        key={currentConversationId} // Force remount when conversation ID changes
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        messageHistory={messages} // Use messages state instead of calling loadMessages directly
        saveMessages={saveMessages}
      />
    </div>
  );
}

export default App;
