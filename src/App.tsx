import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";
import PageLoader from "./app/components/loader/PageLoader";
import Header from "./app/components/header/Header";
import Footer from "./app/components/footer/Footer";

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
