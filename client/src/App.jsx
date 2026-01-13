import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
        <div className="app">

    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
    </div>
  );
}

export default App;
