import './App.css';
import { Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage'
import Favourites from './pages/Favourites';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={'favourites'} element={<Favourites />} />
      </Routes>
      
    </div>
  );
}

export default App;
