import Theme from "./Theme";
import hamburgerMenu from "../assets/hamburgerMenu.svg";
import UserAccount from "./UserAccount";
import { Outlet, Link } from "react-router-dom";

function Header({ setIsOpen, theme, setTheme, user }) {
  return (
    <>
      <header className="bg-slate-700 p-3 flex justify-between items-center px-10 dark:bg-slate-900">
        <Link to="/">
          <h1 className="text-blue-400 font-bold text-2xl dark:text-white">
            R<span className="text-white dark:text-blue-300">Lite</span>
          </h1>
        </Link>
        <div className="flex gap-3 items-center">
          <Theme theme={theme} setTheme={setTheme} />
          <UserAccount user={user} />
          <img
            src={hamburgerMenu}
            className="max-h-8 hover:cursor-pointer hover:bg-slate-800"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
