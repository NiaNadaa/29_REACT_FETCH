import { useEffect, useState } from "react";
import "./App.css";

function Cartas(props) {
  let listado = props.cartas.map((carta, i) => {
    return (
      <div key={i} className="carta">
        <img src={carta.imageUrl} alt={carta.name} />
        <h3>{carta.name}</h3>
        <h4>
          Tipo: {carta.type} / Costo : {carta.manaCost}
        </h4>
        <p>{carta.text}</p>
      </div>
    );
  });

  return <div className="catalogo">{listado}</div>;
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/sets").then((res) => res.json())
    .then((data) => {
      setData(data.sets);
    });

    fetch(`https://api.magicthegathering.io/v1/cards?set=${select}`)
      .then((res) => res.json())
      .then((data) => {
        setData2(data.cards);
    });
  }, [select]);

  return (
    <>
      <select
        onChange={(e) => {
          setSelect(e.target.value);
        }}
      >
        {data.map((set) => {
          return <option value={set.code}>{set.name}</option>;
        })}
      </select>

      <Cartas cartas={data2} />
    </>
  );
}

export default App;
