import { useNavigate } from "react-router-dom";
import logo from "../images/dilglogo.png";
const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("isLoggedIn"));
  const nvigate = useNavigate();
  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    nvigate("/");
  };
  return (
    <div className="border-b shadow-sm  z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="flex gap-2 py-1 justify-center items-center">
          <img src={logo} className="w-[30px] h-[30px]" />
          <p className="text-sm">REGIN IX</p>
        </div>
        <div>
          <ul className="flex space-x-2">
            {userInfo?.isAdmin && (
              <>
                <li
                  className={`font-medium cursor-pointer py-1 px-1 text-[16px] text-gray-400 border-b-[3px] hover:bg-yellow-300 
                   ${
                     pathMathRoute("/records")
                       ? "border-b-blue-700 text-red-500 bg-yellow-300 px-1"
                       : "border-b-transparent"
                   } `}
                  onClick={() => nvigate("/records")}
                >
                  RECORDS
                </li>
                <li
                  className={`font-medium cursor-pointer py-1 px-1 text-[16px] text-gray-400 border-b-[3px] hover:bg-yellow-300 
                   ${
                     pathMathRoute("/sysuser")
                       ? "border-b-blue-700 text-red-500 bg-yellow-300 px-1"
                       : "border-b-transparent"
                   } `}
                  onClick={() => nvigate("/sysuser")}
                >
                  SYSTEM-USER
                </li>
                <li
                  className={`font-medium cursor-pointer py-1 px-1 text-[16px] text-gray-400 border-b-[3px] hover:bg-yellow-300 
                   ${
                     pathMathRoute("/")
                       ? "border-b-blue-700 text-red-500 bg-yellow-300 px-1"
                       : "border-b-transparent"
                   } `}
                  onClick={() => logout()}
                >
                  LOG-OUT
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
