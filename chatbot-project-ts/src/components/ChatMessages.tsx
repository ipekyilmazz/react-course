import { ChatMessage } from "./ChatMessage.tsx";
import "./ChatMessages.css";
import { useRef } from "react";
type ChatMessagesProps = {
  chatMessages: {
    id: string;
    mesajcik: string;
    sender: string;
  }[];
};
export function ChatMessages({ chatMessages }: ChatMessagesProps) {
  const chatMessagesRef = useRef<HTMLDivElement>(null);
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
