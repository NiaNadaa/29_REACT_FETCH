import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/");
  const [data, setData] = useState([]);
  const [siguiente, setSiguiente] = useState("");
  const [anterior, setAnterior] = useState("");

  useEffect(() => {
    fetch(url).then((res) => res.json()).then((data) => {
      setData(data.results);
      setSiguiente(data.info.next);
      setAnterior(data.info.prev);//null por defecto
    });
  });

  let personajes = data.map((personaje, i) => {
    return (
      <div key={i}>
        <img src={personaje.image} alt={personaje.name} />
        <h2>{personaje.name}</h2>
      </div>
    );
  });

  return (
    <>
      <div>{personajes}</div>
      <div>
        <button
          onClick={() =>
            anterior != null ? setUrl(anterior) : setUrl("https://rickandmortyapi.com/api/character/")
          }
        >
          Anterior
        </button>
        <button onClick={() => setUrl(siguiente)}>Siguiente</button>
      </div>
    </>
  );
}

export default App;
