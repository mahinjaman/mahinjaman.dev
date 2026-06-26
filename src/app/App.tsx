import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const handleContextMenu = (e:MouseEvent) => e.preventDefault();
    const handleKeyDown = (e:KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
