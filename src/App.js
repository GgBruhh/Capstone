import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Wrapper from './Wrapper';
import NavBar from './Navbar';
import ShowDescription from './ShowDescription';
import Favorites from './Favorites';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path='/' exact Component={Wrapper}/>
          <Route path="/favorites" Component={Favorites} />
          <Route path={`/show/:id`} Component={ShowDescription}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
