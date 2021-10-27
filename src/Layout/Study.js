import React, {useState, useEffect} from "react";
import {useParams, Link, Route} from "react-router-dom";
import {readDeck} from "../utils/api"
import Card from "./Card";


function Study() {
    const {deckId} = useParams();
    
    const initialDeckState = {
      id: "",
      cards: [],
      name: "",
      description: ""
    }
    const [studyDeck, setStudyDeck] = useState(initialDeckState)
    
    
    
    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadDeck() {
          try {
            const response = await readDeck(deckId, abortController.signal);
            setStudyDeck(() => response);
          } catch (error) {
            if (error.name !== "AbortError") {
              throw error;
            }
          }
        }
        loadDeck();
        return () => abortController.abort();
      }, [deckId]);


     

    
    return (
        <div className="page-wrapper">
            <nav aria-label="breadcrumb row">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{studyDeck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ul>
            </nav>
            <div className="row">
                <h1>Study: {`${studyDeck.name}`}</h1>
            </div>
            {studyDeck.cards.length >= 3 ? 
            <div className="row">
                  <Route>
                      <Card studyDeck={studyDeck}/>
                  </Route>
              
            </div>
            : 
            <div>
                <h2>Not Enough Cards</h2>
                <p>You need at least 3 cards to study. There are {studyDeck.cards.length} cards in this deck</p>
            </div>
            }
        </div>
    )
    
}

export default Study;