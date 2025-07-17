import { useState, useEffect } from "react";
import axios from "axios";

export const useStays = () => {
  const [sortOrder, setSortOrder] = useState("none");
  const [stays, setStays] = useState(() => {
    const savedStays = localStorage.getItem("stays");
    return savedStays ? JSON.parse(savedStays) : [];
  });

  const [loading, setLoading] = useState(!stays.length);
  const [filters, setFilters] = useState({ location: "", guests: 0 });

  // Cargar datos iniciales
  useEffect(() => {
    if (!stays.length) {
      const fetchStays = async () => {
        try {
          const response = await axios.get("/stays.json");
          const initialStays = response.data.map((stay) => ({
            ...stay,
            // Asegurar que todos los campos existan
            photo: stay.photo || "https://via.placeholder.com/300x200",
            rating: stay.rating || 0,
            superHost: stay.superHost || false,
          }));
          setStays(initialStays);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching stays:", error);
          setLoading(false);
        }
      };
      fetchStays();
    } else {
      setLoading(false);
    }
  }, []);

  // Persistir datos
  useEffect(() => {
    localStorage.setItem("stays", JSON.stringify(stays));
  }, [stays]);

  // Filtrar stays
  const filteredStays = stays.filter((stay) => {
    const locationMatch = filters.location
      ? `${stay.city}, ${stay.country}`
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      : true;
    const guestsMatch = filters.guests
      ? stay.maxGuests >= filters.guests
      : true;
    return locationMatch && guestsMatch;
  });

  const applySorting = (staysList) => {
    if (sortOrder === "none") return staysList;

    return [...staysList].sort((a, b) => {
      const compare = a.title.localeCompare(b.title);
      return sortOrder === "asc" ? compare : -compare;
    });
  };

  // Agregar stay con validación
  const addStay = (newStay) => {
    if (!newStay.city || !newStay.country || !newStay.title) {
      console.error("Missing required fields");
      return;
    }

    const stayWithId = {
      ...newStay,
      id: Date.now(),
      // Genera un rating entre 3.5 y 5.0 (más realista para alojamientos)
      rating: parseFloat((Math.random() * 2 + 3).toFixed(2)), // Ej: 4.2, 3.8, 4.9
      reviews: [], // Para futuras implementaciones
    };

    setStays((prev) => [stayWithId, ...prev]);
    return true; // Indicar éxito
  };

  return {
    stays: applySorting(filteredStays),
    allStays: stays,
    loading,
    filters,
    sortOrder, // Exportamos el estado actual
    handleSearch: (params) => {
      setFilters(params);
      setSortOrder("none"); // Resetear orden al aplicar nuevos filtros
    },
    handleSort: setSortOrder, // Exportamos el setter
    resetFilters: () => {
      setFilters({ location: "", guests: 0 });
      setSortOrder("none");
    },
    addStay,
    allLocations: [...new Set(stays.map((s) => `${s.city}, ${s.country}`))],
  };
};
