import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import PageLoader from "../components/loader/PageLoader";
import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <PageLoader isLoading={isLoading} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
