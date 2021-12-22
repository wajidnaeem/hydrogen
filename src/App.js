// import { Switch } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { TestComponent } from "./pages/testComponent";
import { ProductPage } from "./pages/ProductPage";
import { NavBar } from "./components/NavBar";
import { Cart } from "./components/Cart";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Cart />
      <Router>
        <Routes>
          <Route path="/products/:handle" element={<ProductPage />} />
          <Route path="/test" element={<TestComponent />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <p>Footer</p>
    </div>
  );
}

export default App;
