import { useState } from "react";
import styles from "./App.module.css";
// import { Assistant as AssistantClass } from "./assistants/googleai.js";
// import { Assistant } from "./assistants/openai.js"; // couldn't test because its not free
// import { Assistant } from "./assistants/deepseekai.js"; // couldn't test because its not free
// import { Assistant } from "./assistants/anthropicai.js"; // couldn't test because its not free
// import { Assistant } from "./assistants/xai.js"; // couldn't test because its not free
import { Assistant } from "./components/Assistant/Assistant.jsx";
import { Theme } from "./components/Theme/Theme.jsx";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { Chat } from "./components/Chat/Chat.jsx";

const CHATS = [
  {
    id: 1,
    title: "How to use AI Tools API in React Application",
  },
  {
    id: 2,
    title: "Gemini AI vs ChatGPT",
  },
  {
    id: 3,
    title: "Comparising Models for Popular AI Tools",
  },
  {
    id: 4,
    title: "How to use AI tools in your daily life",
  },
  {
    id: 5,
    title: "How to use AI tools in your daily work",
  },
];

function App() {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(2);
  
  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}> AI Chatbot </h2>
      </header>
      <div className={styles.Content}>
        <Sidebar chats={chats} activeChatId={activeChatId} onActiveChatIdChange={setActiveChatId} />
        <main className={styles.Main}>
          <Chat assistant={assistant} />
          <div className={styles.Configuration}>
            <Assistant onAssistantChange={handleAssistantChange}/>
            <Theme />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App
