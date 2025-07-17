import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardsContainer from "../components/CardsContainer";
import FormButton from "../components/FormButton";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { useStays } from "../hooks/useStays";

export default function Home() {
  const { stays, loading, filters, handleSearch, resetFilters } = useStays();
  const location = useLocation();
  const [message, setMessage] = useState(null);
  const [currentOrder, setCurrentOrder] = useState("none");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const sortedStays = [...stays].sort((a, b) => {
    switch (currentOrder) {
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "rating_asc":
        return a.rating - b.rating;
      case "rating_desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen dark:bg-slate-900">
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}

      <NavBar onSearch={handleSearch} currentFilters={filters} stays={stays} />
      <Title
        count={stays.length}
        location={filters.location}
        guests={filters.guests}
        onReset={resetFilters}
        onOrderChange={setCurrentOrder}
        currentOrder={currentOrder}
      />
      <CardsContainer stays={sortedStays} />
      <FormButton />
    </div>
  );
}
