import { useState } from "react";

export function useFilters() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");

  const totalGuests = adults + children;

  const increment = (type) => {
    if (type === "adults") {
      setAdults((prev) => prev + 1);
    } else {
      setChildren((prev) => prev + 1);
    }
  };

  const decrement = (type) => {
    if (type === "adults" && adults > 0) {
      setAdults((prev) => prev - 1);
    } else if (type === "children" && children > 0) {
      setChildren((prev) => prev - 1);
    }
  };

  return {
    adults,
    children,
    totalGuests,
    selectedCity,
    increment,
    decrement,
    setSelectedCity,
  };
}
