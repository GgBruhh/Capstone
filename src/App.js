import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Wrapper from './Wrapper';
import NavBar from './Navbar';
import ShowDescription from './ShowDescription';
import Favorites from './Favorites';
import Planned from './Planned';
import Watched from './Watched';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path='/' exact Component={Wrapper}/>
          <Route path="/favorites" Component={Favorites} />
          <Route path={`/show/:id`} Component={ShowDescription}/>
          <Route path="/plan-to-watch" Component={Planned} />
          <Route path='/watched' Component={Watched}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
