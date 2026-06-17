"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { CiDark, CiLight } from "react-icons/ci";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeSwitcher = () => {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handleTheme}
        className="relative inline-flex items-center justify-center rounded-full transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        style={{
          backgroundColor: theme === "light" ? "#fff" : "#333",
          color: theme === "light" ? "#333" : "#fff",
          padding: "12px",
          width: "50px",
          height: "44px",
        }}
      >
        {theme === "light" ? <CiDark className="h-6 w-6" /> : <CiLight className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
