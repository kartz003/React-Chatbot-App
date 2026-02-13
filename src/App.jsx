import { useState } from "react";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat.jsx";
import { Controls } from "./components/Controls/Controls.jsx";
import { Assistant } from "./assistants/googleai.js";
import { Loader } from "./components/Loader/Loader.jsx";
// import { Assistant } from "./assistants/openai.js"; // couldn't test because its not free

function App() {
  const assistant = new Assistant;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) =>[...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ role: "user", content });
    setIsLoading(true);
    try {
      const result = await assistant.chat(content, messages);
      addMessage({ role: "assistant", content: result });
    } catch (error) {
      addMessage({ role: "system", content: "Sorry, I couldn't process your request. Please try again." });
    } finally {
      setIsLoading(false);
    }
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
      <Controls isDisabled={isLoading} onSend={handleContentSend} />
    </div>
  );
}

export default App
