import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";
// APIkey: 5b09160

function App() {
  return (
    <div className="App" style={{width:'100%',margin:0,padding:0}} >
      <Router >
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/MovieApp"  component={Home}/>
 
            <Route
              exact
              path="/MovieApp/:imdbID"
              component={MovieDetail}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
