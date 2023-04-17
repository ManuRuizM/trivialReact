import { useState } from "react";
import { MenuTrivialHijo } from "./MenuTrivialHijo";

export function MenuTrivial() {
  const [preguntas, setPreguntas] = useState([]);
  const [cantidad, setCantidad] = useState(0);

  const handleInput = (ev) => {
    const numeroPreguntas = ev.target.value;
    setCantidad(numeroPreguntas);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (cantidad > 0) {
      fetch(`https://opentdb.com/api.php?amount=${cantidad}&type=multiple`)
        .then((res) => res.json())
        .then((data) => {
          setPreguntas(data.results);
        });
    }
  };

  const resetear = (ev) => {
    setCantidad(0);
    setPreguntas([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>NUMERO DE PREGUNTAS</p>
          <input
            type="text"
            name="numeroPreguntas"
            value={cantidad}
            onChange={handleInput}
          />
        </label>
      </fieldset>
      <button type="submit">GENERA PREGUNTAS</button>
      <button type="button" onClick={resetear}>
        RESET
      </button>
      <MenuTrivialHijo preguntas={preguntas} />
    </form>
  );
}