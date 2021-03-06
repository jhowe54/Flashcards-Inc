import React, {useState} from "react";
import "./Card.css"
function Card({ studyDeck }) {

    const [flippedState, setFlippedState] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const flipHandler = (event) => {
        
        setFlippedState((currentFlippedState) => !currentFlippedState )
    }
    
   const handleNextCard = (event) => {
       setCurrentIndex((currentIndex) => currentIndex === studyDeck.cards.length - 1 ? currentIndex + 0 : currentIndex + 1)
       setFlippedState((currentFlippedState) => !currentFlippedState)
   }
    
   const restartHandler = () => {
       setCurrentIndex(0);
       setFlippedState(false);
   }

   function getCardFromDeck() { 
       const card = studyDeck.cards 
       return card[currentIndex]
   }
    return (
        <div className="card-wrapper">
            <div>
                <h4>{`Card ${currentIndex + 1} of ${studyDeck.cards.length}`}</h4>
            </div>
            { !flippedState ?
            <div>
                <div className="card-info">
                    <p>Question: {getCardFromDeck().front}</p>
                </div>
                <div className="buttons">
                <button type="button" className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                </div>
            </div>
            :
            <div>
                <div className="card-info">
                    <p>Answer: {getCardFromDeck().back}</p>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-secondary m-1" onClick={flipHandler}>Flip</button>
                { currentIndex === studyDeck.cards.length - 1 ? //check to see if its the last card in deck
                    <button type="button" className="btn btn-secondary m-1" onClick={restartHandler}>Restart</button> //add restart handler
                :
                    <button type="button" className="btn btn-secondary m-1" onClick={handleNextCard}>Next</button>
                }
                
                </div>
            </div>
            }
        </div>
    )
}

export default Card;