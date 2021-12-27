import { useEffect, useState } from "react";
import "./App.css";

function Pokemon(props) {
  return (
    <ul>
      {props.lista.map((pokemon, i) => {
        return <li>{pokemon.pokemon.name}</li>;
      })}
    </ul>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type").then((res) => res.json())
    .then((data) => {
      setData(data.results);
    });
  }, []);

  useEffect(() => {
    fetch(select).then((res) => res.json())
    .then((data) => {
      let array = [];
      if (data.pokemon.length > 0) {
        for (let i = 0; i < 3; i++) {
          array.push(
            data.pokemon[Math.floor(Math.random() * data.pokemon.length)]
          );
        }
      } else {
        array.push({ name: "No se han encontrado resultados" });
      }
        setData2(array);
      });
  }, [select]);

  return (
    <>
      <select onChange={(e) => setSelect(e.target.value)}>
        {data.map((tipo, i) => {
          return <option key={i} value={tipo.url}>{tipo.name}</option>;
        })}
      </select>
      <Pokemon lista={data2} />
    </>
  );
}

export default App;
