import "./App.css";
import { AllRoutes } from "./components/AllRoutes";
import { Navbar } from "./components/Navbar";
import {Footer} from "./pages/Footer";

export function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}
