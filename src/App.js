import "./styles.css";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/HomePage';
import AddUser from './Pages/AddUser';
import EditUser from './Pages/EditUser'
import { useState } from "react";
import useToken from "./Components/UseToken";

export default function App() {
  const {token, setToken} = useToken();
  // console.log(token);

  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact strict component={Home}/> 
          <Route path="/addUser" exact strict component={AddUser}/>
          <Route path="/editUser" exact strict component={EditUser}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
