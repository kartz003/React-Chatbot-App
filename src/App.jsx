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

let assistant;

function App() {
  const [assistant, setAssistant] = useState();
  
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
        <Sidebar />
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
