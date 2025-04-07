
import React from 'react';

const ChatHistory = ({ conversations, currentConversationId, onSelectConversation }) => {
const formatDate = (dateString) => {
const date = new Date(dateString);
return date.toLocaleString();
};

return (
<div className="chat-history">
<h3>Previous Conversations</h3>
<ul>
{conversations.map((conversation) => (
<li
key={conversation.id}
className={conversation.id === currentConversationId ? 'active' : ''}
onClick={() => onSelectConversation(conversation.id)}
>
<div className="conversation-title">{conversation.title}</div>
<div className="conversation-date">
{formatDate(conversation.lastUpdated)}
</div>
</li>
))}
</ul>
</div>
);
};

export default ChatHistory;