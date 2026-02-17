import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
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

function App() {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState();
  const activeChatMessages = useMemo(() => chats.find(({ id }) => id === activeChatId)?.messages ?? [], [chats, activeChatId]);
  
  useEffect(() => {
    handleNewChatCreate();
  }, []);

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  function handleChatMessagesUpdate(id, messages) {
    const title = messages[0]?.content.split(" ").slice(0, 7).join(" ");
    setChats((prevChats) => 
      prevChats.map((chat) => 
        (chat.id === id ? { ...chat, title: chat.title ?? title, messages } : chat)
      )
    );
  }

  function handleNewChatCreate() {
    const id = uuidv4();
    setActiveChatId(id);
    setChats((prevChats) => [...prevChats, { id, messages: [] }]);
  }

  function handleActiveChatIdChange(id) {
    setActiveChatId(id);
    setChats((prevChats) => prevChats.filter(({ messages }) => messages.length > 0));
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}> AI Chatbot </h2>
      </header>
      <div className={styles.Content}>
        <Sidebar 
          chats={chats} 
          activeChatId={activeChatId} 
          activeChatMessages={activeChatMessages}
          onActiveChatIdChange={handleActiveChatIdChange} 
          onNewChatCreate={handleNewChatCreate} 
          />
        <main className={styles.Main}>
          {chats.map((chat) => (
            <Chat 
              key={chat.id} 
              assistant={assistant} 
              isActive={chat.id === activeChatId}
              chatId={chat.id} 
              chatMessages={chat.messages} 
              onChatMessagesUpdate={handleChatMessagesUpdate} 
            />
          ))}
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
