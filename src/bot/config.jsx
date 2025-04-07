import { createChatBotMessage } from 'react-chatbot-kit';
import iitlogo from "../assets/IITMadras.png";
import userIcon from "../assets/user.png"
const config = {
  botName: "Insti-Bot",
  initialMessages: [createChatBotMessage("Hi! I'm an AI assistant powered by Google Gemini", {})],
  customStyles: {
    botMessageBox: { backgroundColor: "#2C3E50" },
    chatButton: { backgroundColor: "#2C3E50" },
    userMessageBox: { backgroundColor: "#3498DB" }
  },
  messageHistory: [
  ],
  customComponents: {
    botAvatar: () => (
      <div className="avatar-container">
        <img src={iitlogo} alt="Bot Avatar" className="bot-avatar" />
      </div>
    ),
   
    userAvatar: () => (
      <div className="avatar-container">
        <img src={userIcon} alt="User Avatar" className="user-avatar" />
      </div>
    )
  }
};

export default config;
