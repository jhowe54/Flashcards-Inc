import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import ViewDeck from "./ViewDeck";
import { Switch, Route } from "react-router-dom";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck"
import AddCard from "./AddCard"
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          
          <Route exact path ='/'>
            <Home />
          </Route>
          
          <Route exact path = '/decks/:deckId'>
            <ViewDeck />
          </Route>
          
          <Route exact path = '/decks/:deckId/edit'>
            <EditDeck />
          </Route> 
          
          <Route path = '/decks/:deckId/cards/:cardId/edit' >
            <EditCard />
          </Route>
          
          <Route path = '/decks/:deckId/cards/new'>
            <AddCard />
          </Route>
          
          
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
        
      </div>
    </>
  );
}

export default Layout;
