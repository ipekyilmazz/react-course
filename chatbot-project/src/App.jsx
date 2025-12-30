import { useState, useEffect } from "react";
import "./App.css";
import { ChatInput } from "./components/ChatInput.jsx";
import { ChatMessages } from "./components/ChatMessages.jsx";
import { Chatbot } from "supersimpledev";
function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || [
      {
        mesajcik: "hello chatbot",
        sender: "mert",
        id: "id1",
      },
    ]
  );

  useEffect(() => {
    Chatbot.addResponses({
      bb: "Görüşürüz! İyi günler!",
      bye: "Görüşürüz! İyi günler!",
      görüşürüz: "Görüşürüz! İyi günler!",
      nasılsın: "İyiyim, teşekkürler! Siz nasılsınız?",
      naber: "İyiyim, teşekkürler! Siz nasılsınız?",
      "random numara": function () {
        return "buyur: " + Math.floor(Math.random() * 100);
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
