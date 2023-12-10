import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../CSS/background.css";

const LandingPage: React.FC = () => {
  const token = localStorage.getItem("jwt_Token");
  const navigate = useNavigate();
  return (
    <div className="background_gif min-h-screen flex flex-col items-center justify-center ">
      <img
        src="./src/assets/images/logo_kare.png"
        style={{
          width: "70%",
        }}
      />
      <p className="text-color1 uppercase tracking-widest lg:text-base  text-sm font-normal text-white">
        Welcome to Living Stories
      </p>
      <p className="text-color1 uppercase tracking-widest lg:text-base  text-sm font-normal text-white">
        The ultimate writing and memory-sharing app,
        <br /> where you can unleash your creativity and connect with others
        through the power of beautiful memories.
      </p>
      <div className="flex  items-center ">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="text-white bg-gradient-to-br m-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <span>Login</span>
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="text-white bg-gradient-to-r m-4 from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <span>Join Us</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
