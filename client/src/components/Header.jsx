import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import axios from "axios";

function Header() {
  const { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [top, setTop] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownMenu = useRef(null);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const closeOpenMenus = (e) => {
    if (
      dropDownMenu.current &&
      showDropDown &&
      !dropDownMenu.current.contains(e.target)
    ) {
      setShowDropDown(false);
    }
  };
  document.addEventListener("mousedown", closeOpenMenus);

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }

  if (!ready) {
    return "Loading";
  }

  if (ready && !user && !navigate) {
    navigate('/login');
  }

  return (
    <div
      className={`bg-white sticky top-0 z-50 px-2 sm:px-8 md:px-12 lg:16 xl:px-20 py-4 ${
        !top && `bg-white shadow-md`
      }`}
    >
      <header className="flex justify-between">
        <Link to={"/"} className="flex items-center gap-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>
          <span className="font-bold text-xl">airbnb</span>
        </Link>
        <div className="flex gap-2 border border-gray-300 rounded-full py-2 pl-4 pr-2 shadow-sm shadow-gray-300">
          <div className="my-auto px-2">Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div className="my-auto px-2">Any week</div>
          <div className="border-l border-gray-300"></div>
          <div className="my-auto px-2">Add guests</div>
          <button className="bg-primary p-2 rounded-full text-white right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div ref={dropDownMenu}>
          <button
            // to={user ? "/account" : "/login"}
            onClick={() => setShowDropDown(!showDropDown)}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-full py-1 px-2 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div
              className={`flex border ${
                !!user ? "bg-black border-black" : "bg-gray-500 border-gray-500"
              } text-white rounded-full overflow-hidden w-8 h-8`}
            >
              {!user && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="white"
                  className="w-10 h-10 m-auto"
                >
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              )}
              {!!user && <p className="m-auto text-xs">{user.name[0]}</p>}
            </div>
          </button>
          {showDropDown && (
            <div className=" right-4 sm:right-8 md:right-12 lg:right-20 top-16 absolute  z-50 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Wishlist
              </a>
              <Link
                to={"/account"}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Account
              </Link>
              {!!user ? (<p
                onClick={logout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                Log out
              </p>) : (<Link className="block px-4 py-2 text-gray-800 hover:bg-gray-100" to={"/login"}>
              Login
            </Link>)}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
