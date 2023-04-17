import { Pregunta } from "./Pregunta";
import { useState } from "react";
export function MenuTrivialHijo({ preguntas }) {
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);

  const handleRespuestaSeleccionada = (esCorrecta) => {
    if (esCorrecta) {
      setRespuestasCorrectas(respuestasCorrectas + 1);
    }
  };

  return (
    <div>
      {preguntas.map((pregunta, index) => (
        <Pregunta
          key={index}
          pregunta={pregunta}
          onRespuestaSeleccionada={handleRespuestaSeleccionada}
        />
      ))}
      {preguntas.length > 0 && (
        <p className="indicador">
          {respuestasCorrectas} de {preguntas.length} respuestas correctas
        </p>
      )}
    </div>
  );
}
