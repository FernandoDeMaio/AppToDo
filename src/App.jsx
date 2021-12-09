import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modo, setModo] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) return setError("Escriba una tarea...");
    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFlitrado = tareas.filter((e) => e.id !== id);
    setTareas(arrayFlitrado);
  };

  const editar = (item) => {
    setModo(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) return setError("Escriba una tarea...");
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setTareas(arrayEditado);
    setModo(false);
    setTarea("");
    setId("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>

                  <button
                    className="btn btn-danger btn-sm  float-end mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>

                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={(e) => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modo === false ? "Agregar Tarea" : "Editar Tarea"}
          </h4>
          <form onSubmit={modo ? editarTarea : agregarTarea}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modo === false ? (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            ) : (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
