import { useState } from "react";
import DarkMode from "./DarkMode";
import Modal from "./modal/Modal";

export default function NavBar({ onSearch, currentFilters, stays }) {
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleLocationClick = () => {
    setActiveSection("location");
    setShowModal(true);
  };

  const handleGuestsClick = () => {
    setActiveSection("guests");
    setShowModal(true);
  };

  const handleSearchClick = () => {
    setActiveSection(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveSection(null);
  };

  const handleModalSearch = (params) => {
    onSearch(params);
    closeModal();
  };

  return (
    <>
      <nav className="w-full flex flex-col items-center justify-between md:flex-row ">
        <div className="w-full flex items-center justify-between p-4 pl-8 md:pl-16">
          <div className="w-[100px] h-[30px] bg-[url('/logo-f7862584.svg')] bg-contain bg-no-repeat"></div>
          <DarkMode />
        </div>

        <div className="w-full flex justify-center items-center gap-4 p-4 px-12 box-border md:w-1/2 md:justify-end md:px-12">
          <input
            onClick={handleLocationClick}
            className="w-[45%] rounded-xl box-border placeholder:text-sm placeholder:px-1 hover:shadow-[0_0_10px_rgb(197,78,78)] dark:hover:shadow-violet-800 p-1 focus:outline-none dark:placeholder:text-[#d1afff] cursor-pointer"
            type="text"
            placeholder={currentFilters.location || "Add location"}
            readOnly
          />

          <input
            onClick={handleGuestsClick}
            className="w-[45%] rounded-xl box-border placeholder:text-sm placeholder:px-1 hover:shadow-[0_0_10px_rgb(197,78,78)] dark:hover:shadow-violet-800 p-1  focus:outline-none dark:placeholder:text-[#d1afff] cursor-pointer"
            type="text"
            placeholder={
              currentFilters.guests > 0
                ? `${currentFilters.guests} guest${
                    currentFilters.guests > 1 ? "s" : ""
                  }`
                : "Add guests"
            }
            readOnly
          />

          <button
            onClick={handleSearchClick}
            className="w-[10%] flex justify-center items-center box-border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 rounded-xl text-[#a34040] dark:text-violet-800 dark:hover:text-violet-900 dark:hover:shadow-violet-800 p-0.5 hover:shadow-[0_0_10px_rgb(197,78,78)] hover:text-[#c54e4e] "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </nav>

      <Modal
        show={showModal}
        onClose={closeModal}
        onSearch={handleModalSearch}
        initialLocation={currentFilters.location}
        initialGuests={currentFilters.guests}
        initialActiveSection={activeSection}
        stays={stays}
      />
    </>
  );
}
