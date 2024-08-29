import React from 'react'
import { Switch, Route } from "react-router-dom"
import './index.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App
