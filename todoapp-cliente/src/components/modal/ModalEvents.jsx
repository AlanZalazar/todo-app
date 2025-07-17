import { useState, useEffect, useRef } from "react";
import { getCitiesFromStays } from "./Cities";

export const useModalEvents = ({
  show,
  onClose,
  onSearch,
  initialLocation = "",
  initialGuests = 0,
  initialActiveSection = "",
  stays = [],
}) => {
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  const [location, setLocation] = useState(initialLocation);
  const [adults, setAdults] = useState(Math.max(0, initialGuests));
  const [children, setChildren] = useState(0);
  const [filteredCities, setFilteredCities] = useState(
    getCitiesFromStays(stays)
  );

  const modalRef = useRef(null);
  const guestInputRef = useRef(null);
  const guestMenuRef = useRef(null);

  useEffect(() => {
    if (!show) {
      setLocation(initialLocation);
      setAdults(Math.max(0, initialGuests));
      setChildren(0);
      setActiveSection("");
    } else {
      setActiveSection(initialActiveSection);
    }
  }, [show, initialLocation, initialGuests, initialActiveSection]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setFilteredCities(
      getCitiesFromStays(stays).filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCityClick = (city) => {
    setLocation(city);
    setActiveSection("");
  };

  const updateCounter = (type, operation) => {
    const updater = type === "adults" ? setAdults : setChildren;
    updater((prev) =>
      operation === "increase" ? prev + 1 : Math.max(0, prev - 1)
    );
  };

  const handleSubmit = () => {
    onSearch({ location, guests: adults + children });
    onClose();
  };

  const handleClickOutside = (event) => {
    if (!modalRef.current?.contains(event.target)) {
      onClose();
      return;
    }

    if (
      activeSection === "guests" &&
      !guestInputRef.current?.contains(event.target) &&
      !guestMenuRef.current?.contains(event.target)
    ) {
      setActiveSection("");
    }

    if (
      activeSection === "location" &&
      !event.target.closest('input[placeholder="Add location"]') &&
      !event.target.closest("ul.absolute")
    ) {
      setActiveSection("");
    }
  };

  useEffect(() => {
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose, activeSection]);

  return {
    activeSection,
    location,
    adults,
    children,
    filteredCities,
    modalRef,
    guestInputRef,
    guestMenuRef,
    setActiveSection,
    handleLocationChange,
    handleCityClick,
    updateCounter,
    handleSubmit,
  };
};
