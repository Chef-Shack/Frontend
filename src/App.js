import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/all-page-styles.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
