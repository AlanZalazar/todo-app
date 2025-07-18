import {
  tareaCreate,
  allTareas,
  tareaComplete,
  tareaClear,
  clearAllComplete,
} from "../hooks/data";
import { useEffect, useState } from "react";
import DarkMode from "./DarkMode";

export default function Form() {
  const [nombre, setNombre] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const tareasPendientes = tareas.filter((tarea) => !tarea.completada).length;
  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [filtro, setFiltro] = useState("todas");
  const [crearCompletada, setCrearCompletada] = useState(false);

  const cargarTareas = async () => {
    try {
      const response = await allTareas();
      console.log(response.data);
      console.log(filtro);
      setTareas(response.data);
      setTareasFiltradas(aplicarFiltro(response.data, filtro));
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, [filtro]);

  const handleComplete = async (id) => {
    try {
      const tareaActual = tareas.find((t) => t.id === id);
      if (!tareaActual) return;

      const nuevasTareas = tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      );
      setTareas(nuevasTareas);
      setTareasFiltradas(aplicarFiltro(nuevasTareas, filtro));

      await tareaComplete(id);
      await cargarTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);

      setTareas(tareas);
      setTareasFiltradas(aplicarFiltro(tareas, filtro));
    }
  };

  const handleDelete = async (id) => {
    await tareaClear(id);
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    setTareas(nuevasTareas);
    setTareasFiltradas(aplicarFiltro(nuevasTareas, filtro));
  };

  const handleDeleteAll = async () => {
    await clearAllComplete();
    const nuevasTareas = tareas.filter((t) => !t.completada);
    setTareas(nuevasTareas);
    setTareasFiltradas(aplicarFiltro(nuevasTareas, filtro));
  };

  const aplicarFiltro = (tareas, filtro) => {
    switch (filtro) {
      case "activas":
        return tareas.filter((t) => !t.completada);
      case "completadas":
        return tareas.filter((t) => t.completada);
      default:
        return tareas;
    }
  };

  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreFormateado = nombre.trim();

    if (nombreFormateado === "") return;

    try {
      await tareaCreate({
        nombre: capitalizarPrimeraLetra(nombreFormateado),
        completada: crearCompletada,
      });
      setNombre("");
      setCrearCompletada(false);
      await cargarTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  if (cargando) return <p>Cargando tareas...</p>;

  return (
    <div className="">
      <div className="flex justify-between mt-[-50px] py-5 md:mt-0 md:py-0 ">
        <h1 className="text-white relative z-50 josefin text-4xl  md:text-6xl font-bold md:py-10  ">
          T O D O
        </h1>
        <DarkMode className="z-50 relative "></DarkMode>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[335px] md:w-[540px] z-50 relative "
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 p-3 items-center tex-[#777a92ff] bg-[#fafafaff] dark:bg-[#25273cff] rounded-md">
            <button
              type="button"
              onClick={() => setCrearCompletada(!crearCompletada)}
              className={`h-5 w-5 m-2 cursor-pointer rounded-full flex items-center justify-center ${
                crearCompletada
                  ? "flex bg-gradient-to-br from-[#57ddff] to-[#c058f3]"
                  : "border border-[#d2d3dbff] dark:border-[#494C6B] hover:border-[#3a7bfdff]"
              }`}
            >
              {crearCompletada && (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                  <path
                    fill="none"
                    stroke="#FFF"
                    strokeWidth="2"
                    d="M1 4.304L3.696 7l6-6"
                  />
                </svg>
              )}
            </button>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Create a new todo..."
              className="  flex-1 p-1 py-1 josefin text-[18px] dark:text-[#e4e5f1ff] outline-none focus:outline-none focus:ring-0 rounded placeholder:text-[#777a92ff] josefintext-[18px] caret-[#3a7bfdff]"
            />
            <button
              type="submit"
              className="manito p-2 text-[#9394a5ff] hover:text-[#3a7bfdff] rounded-full hover:border hover:border-[#3a7bfdff]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M1 4.304L3.696 7l6-6"
                />
              </svg>
            </button>
          </div>
          <ul className="shadow-[0_40px_80px_rgba(0,0,0,0.1),0_60px_80px_rgba(0,0,0,0.2)] w-full bg-[#fafafaff] dark:bg-[#25273cff] divide-y-[0.5px] divide-[#d2d3dbff] dark:divide-[#393a4cff] text-[18px]  rounded-md">
            {tareasFiltradas.map((tarea) => (
              <li key={tarea.id} className="p-5 flex items-center group ">
                <span className="">
                  {tarea.completada ? (
                    <div className=" flex justify-center items-center text-center bg-gradient-to-br from-[#57ddffff] to-[#c058f3ff] h-5 w-5 rounded-full">
                      <button
                        onClick={() => handleComplete(tarea.id)}
                        className="manito bg-gradient-to-br from-[#57ddffff] to-[#c058f3ff] rounded-full h-[18px] w-[18px] flex justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="9"
                          className=""
                        >
                          <path
                            fill="none"
                            stroke="#FFF"
                            strokeWidth="2"
                            d="M1 4.304L3.696 7l6-6"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-[#d2d3dbff] dark:bg-[#494C6B] flex justify-center items-center text-center hover:bg-gradient-to-br from-[#57ddffff] to-[#c058f3ff] h-5 w-5 rounded-full">
                      <button
                        onClick={() => handleComplete(tarea.id)}
                        className="manito bg-[#fafafaff] dark:bg-[#25273cff] rounded-full h-[18px] w-[18px]"
                      ></button>
                    </div>
                  )}
                </span>
                <span
                  className={
                    tarea.completada
                      ? "manito line-through text-[#9394a5ff] dark:text-[#4d5066ff] h-6 josefin justify-center px-5 w-full"
                      : "manito text-[#484b6aff] dark:text-[#cacde8ff] h-6 josefin justify-center px-5 w-full hover:text-[#131212] dark:hover:text-[#e4e5f1ff]"
                  }
                >
                  {tarea.nombre}
                </span>

                <button
                  onClick={() => handleDelete(tarea.id)}
                  className="manito md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    className="ml-2"
                  >
                    <path
                      fill="#494C6B"
                      fillRule="evenodd"
                      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                  </svg>
                </button>
              </li>
            ))}
            <div className="bg-[#fafafaff] dark:bg-[#25273cff] p-4 flex justify-between items-center text-[#777a92ff] text-[14px] josefin rounded-b-md">
              <span>
                {tareasPendientes}{" "}
                {tareasPendientes === 1 ? "item left" : "items left"}
              </span>

              <div className="md:flex text-[14px] text-[#777a92ff]  hidden">
                <button
                  onClick={() => setFiltro("todas")}
                  className={`manito p-1 rounded ${
                    filtro === "todas"
                      ? "text-blue-400"
                      : "hover:text-[#0a0a0a] dark:hover:text-[#e4e5f1ff]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFiltro("activas")}
                  className={`manito p-1 rounded ${
                    filtro === "activas"
                      ? "text-blue-400"
                      : "hover:text-[#0a0a0a] dark:hover:text-[#e4e5f1ff]"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFiltro("completadas")}
                  className={`manito p-1 rounded ${
                    filtro === "completadas"
                      ? "text-blue-400"
                      : "hover:text-[#0a0a0a] dark:hover:text-[#e4e5f1ff]"
                  }`}
                >
                  Completed
                </button>
              </div>
              <button onClick={() => handleDeleteAll()}>
                <p className="manito hover:text-[#0a0a0a]"> Clear Completed</p>
              </button>
            </div>
          </ul>

          <div className="w-full p-1 bg-[#fafafaff] dark:bg-[#25273cff] text-[#777a92ff] text-[14px] rounded-md md:hidden justify-center items-center text-center">
            <button
              onClick={() => setFiltro("todas")}
              className={`p-2 rounded josefin ${
                filtro === "todas"
                  ? "text-blue-400"
                  : "hover:text-[#1d1c1c] dark:hover:text-[#e4e5f1ff]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFiltro("activas")}
              className={`p-2 rounded josefin ${
                filtro === "activas"
                  ? "text-blue-400"
                  : "hover:text-[#1d1c1c] dark:hover:text-[#e4e5f1ff]"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFiltro("completadas")}
              className={`p-2 rounded  josefin ${
                filtro === "completadas"
                  ? "text-blue-400"
                  : "hover:text-[#1d1c1c] dark:hover:text-[#e4e5f1ff]"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
