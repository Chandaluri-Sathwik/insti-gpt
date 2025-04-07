import { getBotResponse } from '../api/gemini';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // Handle the bot's response
  handleGeminiResponse = async (userMessage) => {
    // Set typing indicator
    this.setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          loading: true,
          type: 'bot',
        },
      ],
    }));

    try {
      // Call your API to get the response from Gemini
      const botResponse = await getBotResponse(userMessage);
       console.log(botResponse)
      // Validate botResponse to ensure it's not empty or undefined
      if (!botResponse || botResponse.trim() === "") {
        console.warn("Empty bot response detected. Skipping output.");
        this.setState((prev) => ({
          ...prev,
          messages: prev.messages.filter((msg) => !msg.loading),
        }));
        return;
      }

      // Remove loading message and add the actual response
      this.setState((prev) => ({
        ...prev,
        messages: prev.messages
          .filter((msg) => !msg.loading && msg!=='')
          .concat(this.createChatBotMessage(botResponse, {})),
      }));
    } catch (error) {
      console.error("Error fetching bot response:", error);
      this.setState((prev) => ({
        ...prev,
        messages: prev.messages
          .filter((msg) => !msg.loading)
          .concat(
            this.createChatBotMessage(
              "I'm having trouble connecting right now. Please try again later.",
              {}
            )
          ),
      }));
    }
  };
}

export default ActionProvider;
