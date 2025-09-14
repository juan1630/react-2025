import type { CSSProperties } from "react";

const firstName = "Jose Juan";
const lastName = "Patrón";
const favoritesGames = ["Assasinss creed", "Call of duty", "Smash"];
const isActive = true;

const address = {
  zipcode: "abc-123",
  country: "México",
};

const myStyles: CSSProperties = {
  backgroundColor: "red",
  color: "white",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "20px",
  textAlign: "center",
  fontWeight: "bold",
};
export function MyAwesomeApp() {
  return (
    <>
      <div data-testid="div-app">
        <h1 data-testid="first-name-title"> {firstName} </h1>
        <h3 className="main-title"> {lastName} </h3>
        <p> {favoritesGames.splice(1, 2)} </p>
        {2 + 2}
        <h1> {isActive ? "Activo" : "No está activo"} </h1>
        <p style={myStyles}> {JSON.stringify(address)} </p>
      </div>
    </>
  );
}
