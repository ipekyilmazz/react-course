import { useState } from "react";
import "./App.css";
import { WelcomePart } from "./components/WelcomePart.jsx";
export function App() {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <WelcomePart isShown={isShown} setIsShown={setIsShown} />
    </>
  );
}
export default App;
