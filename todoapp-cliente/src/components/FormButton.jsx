import { useNavigate } from "react-router-dom";

export default function FormButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/form")}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition dark:bg-violet-800 dark:hover:bg-violet-950"
      >
        + Add Stay
      </button>
    </div>
  );
}
