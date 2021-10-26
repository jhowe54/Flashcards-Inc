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
               console.log(response)
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
      history.go(-1);
    } 
  }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link></li>
                </ul>
            </nav>
            
            <div>
                <section>
                    <h3>{currentDeck.name}</h3>
                    <p>{currentDeck.description}</p>
                    <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
                    <button type="button" className="btn btn-primary">Study</button>
                    <button type="button" className="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteHandler(currentDeck.id)}>Delete</button>
                </section>
                
                <Route>
                    <CardList cards={currentDeck.cards} />
                </Route>
            </div>
        </div>
    )
}

export default ViewDeck;