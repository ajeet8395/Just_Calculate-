"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSun } from "react-icons/lu";
import { BsMoonStarsFill } from "react-icons/bs";

export default function ToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border rounded-full absolute right-8 bottom-4 bg-black dark:border-black"
    >
      {theme === "light" ? (<img src="/moonfun.gif" alt="Moon" className="w-10 h-10" />) : (<img src="/sunfun.gif" alt="Sun" className="w-10 h-10" />)}
    </button>
  );
}
