import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Pages/SignUp/Signup';
import Passwords from './Pages/Passwords/Passwords';
import Logout from './Pages/Logout/Logout';
import { useSelector, useDispatch } from "react-redux";

function App()
{

  const data = useSelector(state => state);
  console.log(data);

  return (
    <div className="App">

      <Router>

        <Navbar />

        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route exact path="/signin"> <Login /> </Route>
          <Route exact path="/signup"> <Signup /> </Route>
          <Route exact path="/passwords"> <Passwords /> </Route>
          <Route exact path="/logout"> <Logout /> </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
