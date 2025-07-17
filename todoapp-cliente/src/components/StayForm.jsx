import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StayForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    title: "",
    maxGuests: 1,
    beds: 1,
    photo: "",
    type: "Apartment",
    superHost: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const capitalizeAllWords = (str) => {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    const capitalizeFirstLetter = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const processedValue =
      name === "title"
        ? capitalizeFirstLetter(value)
        : name === "city" || name === "country"
        ? capitalizeAllWords(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "maxGuests" || name === "beds"
          ? Number(value)
          : processedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.city || !formData.country || !formData.title) {
      alert("Please fill required fields (title, city, country)");
      return;
    }

    onSubmit(formData);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setFormData({
      city: "",
      country: "",
      title: "",
      maxGuests: 1,
      beds: 1,
      photo: "",
      type: "Apartment",
      superHost: false,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto ">
      <h2 className="text-xl font-bold mb-4">Add New Stay</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1">
          <p>Title:</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Stay Title*"
            required
            className="w-full p-2 border rounded dark:bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-1">
            <p>City:</p>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City*"
              required
              className="w-full p-2 border rounded dark:bg-white"
            />
          </div>

          <div className="grid grid-cols-1">
            <p>Country:</p>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country*"
              required
              className="w-full p-2 border rounded dark:bg-white"
            />
          </div>
        </div>

        <div>
          <p>Stay type:</p>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-white"
          >
            <option value="Entire apartment">Apartment</option>
            <option value="Entire house">House</option>
            <option value="Entire cabin">Cabin</option>
            <option value="Private room">Room</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <p>Beds:</p>
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              placeholder="Number of beds"
              min="1"
              className="w-full p-2 border rounded dark:bg-white"
            />
          </div>

          <div>
            <p>Limit guest:</p>
            <input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              placeholder="Max Guests"
              min="1"
              className="w-full p-2 border rounded dark:bg-white"
            />
          </div>
        </div>

        <div>
          <p>Photo:</p>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full p-2 border rounded dark:bg-white"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="superHost"
            checked={formData.superHost}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Superhost</label>
        </div>
      </div>

      <div className="flex px-4 gap-8">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full bg-neutral-500 text-white py-2 px-4 rounded-lg hover:bg-neutral-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition dark:bg-violet-800 dark:hover:bg-violet-950"
        >
          Add Stay
        </button>
      </div>
    </form>
  );
}
