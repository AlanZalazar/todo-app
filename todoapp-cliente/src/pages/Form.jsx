import { useState } from "react";
import StayForm from "../components/StayForm";
import { useStays } from "../hooks/useStays";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const { addStay } = useStays();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (newStay) => {
    const success = addStay(newStay);
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setError("Failed to add Stay. Please check the data.");
    }
  };

  return (
    <div className="min-h-screen py-8 dark:bg-slate-900 justify-center items-center">
      <div className="container mx-auto p-4 max-w-md dark:bg-violet-200">
        <h1 className="text-2xl font-bold mb-6 text-center">STAY</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700">
            Stay added successfully! Redirecting...
          </div>
        )}
        <StayForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
