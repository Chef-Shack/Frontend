import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import RecipesPage from "./components/pages/RecipesPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/all-page-styles.css";
import UserAuthPage from "./components/pages/UserAuthPage";

import { useEffect } from "react";
import RecipePage from "./components/pages/RecipePage";
import CreateRecipePage from "./components/pages/CreateRecipePage";

const App = () => {
  useEffect(() => {
    // window.localStorage.setItem('username', '')
    window.localStorage.setItem('authenticated', false)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<UserAuthPage type="login"/>}/>
        <Route path='/signup' element={<UserAuthPage type="signup"/>}/>
        <Route path='/recipes' element={<RecipesPage/>}/>
        <Route path='/recipes/:id' element={<RecipePage/>}/>
        <Route path='/create-recipe' element={<CreateRecipePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
