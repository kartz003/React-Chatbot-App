import { useState } from "react";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat.jsx";
import { Controls } from "./components/Controls/Controls.jsx";
import { Loader } from "./components/Loader/Loader.jsx";
// import { Assistant as AssistantClass } from "./assistants/googleai.js";
// import { Assistant } from "./assistants/openai.js"; // couldn't test because its not free
// import { Assistant } from "./assistants/deepseekai.js"; // couldn't test because its not free
// import { Assistant } from "./assistants/anthropicai.js"; // couldn't test because its not free
// import { Assistant } from "./assistants/xai.js"; // couldn't test because its not free
import { Assistant } from "./components/Assistant/Assistant.jsx";

let assistant;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) => 
      prevMessages.map((message, index) => 
        index === prevMessages.length - 1 
          ? { ...message, content: `${message.content}${content}` } 
          : message 
      )
    );
  }
  
  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ role: "user", content });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content, messages);
      let isFirstChunk = false
      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ role: "assistant", content: "" });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      addMessage({ role: "system", content: "Sorry, I couldn't process your request. Please try again." });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  function handleAssistantChange(newAssistant) {
    assistant = newAssistant;
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader /> }
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}> AI Chatbot </h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
      <Assistant onAssistantChange={handleAssistantChange}/>
    </div>
  );
}

export default App
