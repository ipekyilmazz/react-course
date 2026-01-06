import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/profile-1.jpg";
import "./ChatMessage.css";
import dayjs from "dayjs";
type ChatMessageProps = {
  mesajcik: string;
  sender: string;
};
export function ChatMessage({ mesajcik, sender }: ChatMessageProps) {
  return (
    <div
      className={sender === "mert" ? "chat-message-mert" : "chat-message-bot"}
    >
      {sender === "bot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {mesajcik}
        <div className="chat-message-time">{dayjs().format("HH:mm")}</div>
      </div>

      {sender === "mert" && (
        <img src={UserProfileImage} className="user-message-profile" />
      )}
    </div>
  );
}
