import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Wrapper from './Wrapper';
import Login from './auth/Login';
import Register from './auth/Register';
import NavBar from './Navbar';
import ShowDescription from './ShowDescription';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path='/' exact Component={Wrapper}/>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path={`/show/:id`} Component={ShowDescription}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
