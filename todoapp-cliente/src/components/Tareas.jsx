import { useEffect, useState } from "react";
import { allTareas, tareaComplete } from "../hooks/data"; // ajustá el path si hace falta

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await allTareas();
        setTareas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchTareas();
  }, []);

  const handleComplete = async (id) => {
    try {
      await tareaComplete(id);
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  if (cargando) return <p>Cargando tareas...</p>;

  return (
    <div>
      <ul className="bg-[#25273cff] divide-y-[0.5px] divide-[#494C6B] text-[18px] ">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="p-5 flex   items-center ">
            <span className="">
              {tarea.completed ? (
                <div className="border rounded-full"></div>
              ) : (
                <div className="bg-[#494C6B] flex justify-center items-center text-center hover:bg-gradient-to-br from-[#57ddffff] to-[#c058f3ff] h-5 w-5 rounded-full">
                  <button
                    onClick={() => handleComplete(tarea.id)}
                    className="bg-[#25273cff] rounded-full h-[18px] w-[18px]"
                  ></button>
                </div>
              )}
            </span>
            <span
              className={
                tarea.completed
                  ? "line-through text-[#4d5066ff]"
                  : "text-[#cacde8ff] h-6 josefin justify-center px-5 w-full hover:text-[#e4e5f1ff]"
              }
            >
              {tarea.nombre}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
            >
              <path
                fill="#494C6B"
                fillRule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
