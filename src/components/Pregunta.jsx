import { useState, useEffect } from "react";

export function Pregunta({ pregunta, onRespuestaSeleccionada }) {
  const [respuestas, setRespuestas] = useState([]);

  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  useEffect(() => {
    setRespuestas(
      respuestasAleatorias([
        ...pregunta.incorrect_answers,
        pregunta.correct_answer,
      ])
    );
  }, [pregunta]);

  const respuestasAleatorias = (respuestas) => {
    const respuestasMezcladas = [...respuestas];
    for (let i = respuestasMezcladas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [respuestasMezcladas[i], respuestasMezcladas[j]] = [
        respuestasMezcladas[j],
        respuestasMezcladas[i],
      ];
    }
    return respuestasMezcladas;
  };

  const handleSelectRespuesta = (respuesta) => {
    setRespuestaSeleccionada(respuesta);
    setRespondido(true);
    onRespuestaSeleccionada(respuesta === pregunta.correct_answer);
    if (respuesta === pregunta.correct_answer) {
      setRespuestaCorrecta(true);
    } else {
      setRespuestaCorrecta(false);
    }
  };

  return (
    <div>
      <h2>{pregunta.question}</h2>
      <ul>
        {respuestas.map((respuesta, index) => (
          <li key={index}>
            <button
              onClick={() => handleSelectRespuesta(respuesta)}
              disabled={respondido}
              className={
                respondido && respuesta === pregunta.correct_answer
                  ? "respuesta-correcta"
                  : respondido && respuestaSeleccionada === respuesta
                  ? "respuesta-incorrecta"
                  : null
              }
            >
              {respuesta}
            </button>
          </li>
        ))}
      </ul>
      {respuestaCorrecta !== null && (
        <p>Tu respuesta es {respuestaCorrecta ? "correcta" : "incorrecta"}.</p>
      )}
    </div>
  );
}
