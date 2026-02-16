import { Messages } from "../Messages/Messages.jsx";
import { Controls } from "../Controls/Controls.jsx";
import { Loader } from "../Loader/Loader.jsx";
import { useEffect, useState } from "react";
import styles from "./Chat.module.css";

export function Chat({ assistant, chatId, chatMessages }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    
    useEffect(() => {
        setMessages(chatMessages);
    }, [chatId]);

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
    
    return (
        <>
            {isLoading && <Loader /> }
            <div className={styles.Chat}>
                <Messages messages={messages} />
            </div>
            <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend} />
        </>
    );
}