import { Link } from "react-router-dom";
import homebck from "../images/bckgrnd.png";
import logo from "../images/dilglogo.png";
const Landing = () => {
  return (
    <div
      className="flex h-screen bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-30">
        <div className="text-center">
          <div className="flex justify-center ">
            <img src={logo} className="animate-pulse w-[110px] h-[110px]" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Welcome to the records management system
          </h1>
          <p className="text-lg text-white mb-4">
            This is a simple landing page for your website.
          </p>
          <span className="font-bold bg-blue-500 rounded-sm py-2 px-2 cursor-pointer hover:bg-blue-600">
            <Link to="/auth">LOGIN</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
