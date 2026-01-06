import { useState, useEffect } from "react";
import "./App.css";
import { ChatInput } from "./components/ChatInput.jsx";
import { ChatMessages } from "./components/ChatMessages.jsx";
import { Chatbot } from "supersimpledev";
import RobotProfileImage from "./assets/robot.png";
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
  const title = `${chatMessages.length} Messages`;
  return (
    <div className="app-container">
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={RobotProfileImage} />;
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
