import "./WelcomePart.css";
export function WelcomePart({ isShown, setIsShown }) {
  function handleClick() {
    console.log("Clicked");
    setIsShown(!isShown);
  }

  return (
    <div className="welcome-part-container">
      <h1>Hoş geldiniz</h1>
      <div className="input-container">
        <input placeholder="Email" className="input-boxes" />
        <div className="password-container">
          <input
            placeholder="Şifre"
            type={!isShown ? "text" : "password"}
            className="input-boxes"
          />
          <button className="hide-button" onClick={handleClick}>
            {!isShown ? "Gizle" : "Göster"}
          </button>
        </div>
      </div>
      <br></br>
      <div className="main-buttons-container">
        <button className="main-buttons">Giriş</button>
        <button className="main-buttons">Kayıt Ol</button>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
