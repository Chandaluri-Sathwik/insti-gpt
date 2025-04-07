class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // Validate user input to ensure it's not empty or undefined
    if (!message || message.trim() === "") {
      console.warn("Empty user input detected. Skipping processing.");
      return;
    }

    console.log(message)
    this.actionProvider.handleGeminiResponse(message);
  }
}

export default MessageParser;
