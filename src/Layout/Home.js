import React from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { useEffect, useState } from "react"
import ErrorMessage from "./ErrorMessage";
import {useHistory} from "react-router-dom";
import "./Home.css"
import  {FaTrash} from "react-icons/fa";


function Home() {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    const history = useHistory()
   
   
    const deleteHandler = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete this Deck?")
        if(confirmation) {
          await deleteDeck(id);
          history.go(0);
        } 
      }

    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);

        return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />
    }

    const list = decks.map((deck) => {
        return (
            <div className="deck-wrapper" key={deck.id}>
                <div className="deck m-3 deck-grow">
                    <div className="row card-count">
                     <h1 className="col col-lg-7">{deck.name}</h1>
                     <p className="col col-lg-6">{`${deck.cards.length} cards`}</p>
                    </div>
                    <div className="description row">
                      <p>{deck.description}</p>
                    </div>
                    
                    <div className="row deck-buttons">
                        <button type="button" className="btn btn-secondary m-1" onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                        <button type="button" className="btn btn-primary m-1" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                        <button type="button" className="btn btn-danger m-1" onClick={() => deleteHandler(deck.id)}><FaTrash /></button>
                    </div>
                </div>
            </div>
        )
    } );

    return (
        
        <main className="container">
            <button type="button" className="btn btn-info ml-3" onClick={() => history.push(`/decks/new`)}>Create Deck</button>
            <section className="col">{list}</section>
        </main>
    )
   
}

export default Home;