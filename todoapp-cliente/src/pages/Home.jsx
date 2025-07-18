import DarkMode from "../components/DarkMode";
import Form from "../components/Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161722ff] flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[350px] bg-[#161722ff] z-0">
        <img
          src="./images/bg-desktop-dark.jpg"
          alt="banner"
          className="hidden md:block w-full h-full object-cover"
        />
        <img
          src="./images/bg-mobile-dark.jpg"
          alt="banner"
          className="md:hidden w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-[540px] px-4 pt-20 pb-10">
        <Form />
      </div>

      <p className="text-[#4d5066ff] text-[18px] josefin mt-auto pb-10 z-10">
        Funval - 2025
      </p>
    </div>
  );
}
