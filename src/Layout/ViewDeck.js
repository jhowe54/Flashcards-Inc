import React from "react";
import { useEffect, useState } from "react";
import { deleteDeck, readDeck } from "../utils/api";
import {useParams, Link, useHistory, Route} from "react-router-dom";
import CardList from "./CardList";
function ViewDeck() {
    const { deckId }  = useParams();
    const history = useHistory();
    
    const [currentDeck, setCurrentDeck] = useState({name: "Loading...", cards: []})
   useEffect(() => {
       const abortController = new AbortController();

       async function loadDeck() {
           try {
               const response = await readDeck(deckId, abortController.signal);
               setCurrentDeck(() => ({...response}))
           } catch (error) {
               if (error.name !== "AbortError") {
                   throw error;
               }
           }
       
       }
       loadDeck()
       return () => abortController.abort();
   }, [deckId])
   

   const deleteHandler = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this Deck?")
    if(confirmation) {
      await deleteDeck(id);
      history.push('/');
    } 
  }

    return (
        <div>
            <nav aria-label="breadcrumb row">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{currentDeck.name}</li>
                </ul>
            </nav>
            
            <div className="row">
                <section className="container">
                    <h3>{currentDeck.name}</h3>
                    <p>{currentDeck.description}</p>
                    <button type="button" className="btn btn-secondary m-2 col col-lg-1 col-sm-8" onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
                    <button type="button" className="btn btn-primary m-2 col col-lg-1 col-sm-8" onClick={() => history.push(`/decks/${deckId}/study`)}>Study</button>
                    <button type="button" className="btn btn-primary m-2 col col-lg-2 col-sm-8" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
                    <button type="button" className="btn btn-danger m-2 col col-lg-2 col-sm-8" onClick={() => deleteHandler(currentDeck.id)}>Delete Deck</button>
                </section>
                <div className="container mt-5">
                <Route>
                    <CardList cards={currentDeck.cards} />
                </Route>
                </div>
            </div>
        </div>
    )
}

export default ViewDeck;