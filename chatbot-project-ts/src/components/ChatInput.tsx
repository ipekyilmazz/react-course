import { useState, type JSX } from "react";
import { Chatbot } from "supersimpledev";
import LoadingGIf from "../assets/loading-spinner.gif";
import "./ChatInput.css";
type ChatMessages = {
  mesajcik: string | JSX.Element;
  sender: string;
  id: string;
}[];
type ChatInputProps = {
  chatMessages: ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
};
export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape" || event.key === "Esc") {
      setInputText("");
    }
  }

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    const inputtakiYazi = event.target.value;

    setInputText(inputtakiYazi);
  }
  function clearMessages() {
    setChatMessages([]);

    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([]));

    // However, because chatMessages is being updated, the
    // useEffect in the App component will run, and it will
    // automatically update messages in localStorage to be [].
  }
  async function sendMessage() {
    if (inputText.trim() === "" || isLoading) {
      return;
    }

    const newChatMessages = [
      ...chatMessages, //coppied array and added a new item
      {
        mesajcik: inputText,
        sender: "mert",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);
    setInputText(""); //inputu temizlemek için  controlled input yaptık
    const loading = <img src={LoadingGIf} className="loading-spinner" />;
    setChatMessages([
      ...newChatMessages, //coppied array and added a new item
      {
        mesajcik: loading,
        sender: "bot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    setIsLoading(false);
    //remove loading message
    setChatMessages([
      ...newChatMessages, //coppied array and added a new item
      {
        mesajcik: response,
        sender: "bot",
        id: crypto.randomUUID(),
      },
    ]);
  }
  return (
    <div className="chat-input-container">
      <input
        onKeyDown={handleKeyDown}
        placeholder="Söyle abine nedir sıkıntı hemen çözelim..."
        size={50}
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />

      <button
        disabled={isLoading}
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
