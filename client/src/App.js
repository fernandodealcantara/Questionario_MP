import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppBar from "./components/AppBar/AppBar";
import CreateQuiz from "./pages/CreateQuiz/index";
import Home from "./pages/Home/index";
import Auth from "./pages/SignIn/index";

import "./styles/global.css";

const App = () => (
  <BrowserRouter>
    <div>
      <AppBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/quiz/create" exact component={CreateQuiz} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
