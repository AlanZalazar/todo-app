import { CounterSection } from "./ModalHelpers";
import { LocationIcon, SearchIcon } from "./ModalIcons";
import { useModalEvents } from "./ModalEvents";

export default function Modal({
  show,
  onClose,
  onSearch,
  initialLocation = "",
  initialGuests = 0,
  initialActiveSection = "",
  stays = [],
}) {
  const {
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
  } = useModalEvents({
    show,
    onClose,
    onSearch,
    initialLocation,
    initialGuests,
    initialActiveSection,
    stays,
  });

  if (!show) return null;

  return (
    <div
      className={`fixed top-0 z-40 h-full w-full bg-[#7478967e] ${
        show ? "block" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="fixed z-50 bg-white dark:bg-slate-900 dark:text-[#d1afff] h-[80%] w-full p-4 flex flex-col justify-between md:h-[60%] md:p-16 md:flex-row md:items-start"
      >
        <div className="flex justify-between md:hidden">
          <h1 className="font-bold">Edit your search</h1>
          <button className="font-bold" onClick={onClose}>
            X
          </button>
        </div>

        <div className="flex flex-col h-full pt-12 md:contents">
          <div className="w-full md:w-[400px] relative">
            <div className="p-3 pl-6">
              <label className="text-xs font-bold">LOCATION</label>
              <input
                className="w-full focus:outline-none dark:bg-white rounded-2xl p-2 dark:placeholder:text-black dark:text-black cursor-pointer"
                type="text"
                placeholder="Add location"
                value={location}
                onChange={handleLocationChange}
                onClick={() => setActiveSection("location")}
              />
            </div>

            {activeSection === "location" && (
              <ul className="absolute bg-white dark:bg-slate-950 rounded-md shadow-md w-full mt-2 z-50 max-h-60 overflow-auto">
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-[#1a0a24] cursor-pointer flex items-center gap-2"
                    onClick={() => handleCityClick(city)}
                  >
                    <LocationIcon />
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full md:w-auto relative">
            <div className="p-3 pl-6">
              <label className="text-xs font-bold">GUESTS</label>
              <input
                ref={guestInputRef}
                className="w-full focus:outline-none dark:bg-white rounded-2xl p-2 dark:placeholder:text-black cursor-pointer"
                type="text"
                placeholder={
                  adults + children > 0
                    ? `${adults + children} guests`
                    : "Add guests"
                }
                readOnly
                onClick={() => setActiveSection("guests")}
              />
            </div>

            {activeSection === "guests" && (
              <div
                ref={guestMenuRef}
                className="absolute bg-white dark:bg-slate-950 rounded-2xl p-4 gap-8 flex-col w-full md:w-[200px] border border-gray-200 dark:border-gray-700 shadow-lg z-50"
              >
                <CounterSection
                  title="Adults"
                  description="Ages 13 or above"
                  value={adults}
                  onDecrease={() => updateCounter("adults", "decrease")}
                  onIncrease={() => updateCounter("adults", "increase")}
                />
                <CounterSection
                  title="Children"
                  description="Ages 12 or below"
                  value={children}
                  onDecrease={() => updateCounter("children", "decrease")}
                  onIncrease={() => updateCounter("children", "increase")}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center m-2 md:justify-start md:w-[400px] md:pl-12">
          <button
            className="flex justify-center items-center gap-2 p-4 rounded-xl bg-[#e75656] dark:bg-violet-800 dark:hover:bg-violet-900 w-[130px] h-[45px] hover:bg-[#c54e4e] text-white  transition-colors"
            onClick={handleSubmit}
          >
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
