import React from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { useEffect, useState } from "react"
import ErrorMessage from "./ErrorMessage";
import {useHistory} from "react-router-dom";
import "./Home.css"


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

    const list = decks.map((deck, index) => {
        return (
            <div className="row deck-wrapper mt-3">
                <div key={index} className="col col-6 m-3">
                    <h1>{deck.name}</h1>
                    <p>{deck.description}</p>
                    <div className="deck-buttons">
                        <button type="button" className="btn btn-secondary m-1" onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                        <button type="button" className="btn btn-primary m-1">Study</button>
                        <button type="button" className="btn btn-danger ml-5" onClick={() => deleteHandler(deck.id)}>Delete</button>
                    </div>
                </div>
            </div>
        )
    } );

    return (
        
        <main className="container">
            <button type="button" className="btn btn-info" onClick={() => history.push(`/decks/new`)}>Create Deck</button>
            <section className="col">{list}</section>
        </main>
    )
   
}

export default Home;