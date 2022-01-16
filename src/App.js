// import { Switch } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { TestComponent } from "./pages/testComponent";
import { ProductPage } from "./pages/ProductPage";
import { AllCollections } from "./pages/AllCollections";
import { Collection } from "./pages/Collection";
import { NavBar } from "./components/NavBar";
import { Cart } from "./components/Cart";
import { NavMenu } from "./components/NavMenu";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <NavMenu />
        <Cart />

        <Routes>
          <Route path="/collection/:handle" element={<Collection />} />

          <Route path="/collections/all" element={<AllCollections />} />

          <Route path="/products/:handle" element={<ProductPage />} />

          <Route path="/test" element={<TestComponent />} />

          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
