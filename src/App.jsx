import { useState } from "react";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat.jsx";
import { Controls } from "./components/Controls/Controls.jsx";
import { Assistant } from "./assistants/googleai.js";

function App() {
  const assistant = new Assistant;
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) =>[...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ role: "user", content });
    try {
      const result = await assistant.chat(content);
      addMessage({ role: "assistant", content: result });
    } catch (error) {
      addMessage({ role: "system", content: "Sorry, I couldn't process your request. Please try again." });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}> AI Chatbot </h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App
