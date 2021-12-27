import { useEffect, useState } from "react";
import "./App.css";

function Planeta(props) {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    Promise.all(props.residentes.map((personaje) => fetch(personaje)))
      .then((respuesta) => Promise.all(respuesta.map((res) => res.json())))
      .then((datos) => {
        setPersonajes(datos);
        console.log(datos);
      });
  }, [props.residentes]);

  return (
    <ul>
      {
        personajes.map((personaje) => {
          return <li>{personaje.name}</li>;
        })
      }
    </ul>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/planets").then((res) => res.json())
    .then((data) => {
      setData(data.results);
    });
    fetch(select)
      .then((res) => res.json())
      .then((data) => setData2(data.residents));
  }, [select]);

  return (
    <div>
      <select
        onChange={(e) => {
          setSelect(e.target.value);
        }}
      >
        {data.map((planeta, i) => {
          return (
            <option key={i} value={planeta.url}>
              {planeta.name}
            </option>
          );
        })}
      </select>
      <Planeta residentes={data2} />
    </div>
  );
}

export default App;
