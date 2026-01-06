import { useAutoScroll } from "./useAutoScroll.jsx";
import { ChatMessage } from "./ChatMessage.jsx";
import "./ChatMessages.css";
export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((item) => {
        return (
          <ChatMessage
            mesajcik={item.mesajcik}
            sender={item.sender}
            key={item.id}
          />
        );
      })}

      {chatMessages.length === 0 && (
        <div className="no-messages">Henüz mesaj yok</div>
      )}
    </div>
  );
}
