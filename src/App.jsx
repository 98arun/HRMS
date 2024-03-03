import { ToastContainer } from "react-toastify";
import Navigation from "./navigation/Router.Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ProfileContext from "./contexts/Profile.Context";
import { Header } from "./components/Header";

const App = () => {
  return (
    <ProfileContext>
      <Header />
      <Navigation />
      <ToastContainer />
    </ProfileContext>
  );
};

export default App;
