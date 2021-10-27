import React, {useState} from "react";

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
        <div class="card-wrapper">
            <div class="card">
                <p>{`Card ${currentIndex + 1} of ${studyDeck.cards.length}`}</p>
            </div>
            { !flippedState ?
            <div>
                <div class="card-info">
                    <p>Question: {getCardFromDeck().front}</p>
                </div>
                <div class="buttons">
                <button type="button" className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                </div>
            </div>
            :
            <div>
                <div class="card-info">
                    <p>Answer: {getCardFromDeck().back}</p>
                </div>
                <div class="buttons">
                    <button type="button" className="btn btn-secondary" onClick={flipHandler}>Flip</button>
                { currentIndex === studyDeck.cards.length - 1 ? //check to see if its the last card in deck
                    <button type="button" className="btn btn-secondary" onClick={restartHandler}>Restart</button> //add restart handler
                :
                    <button type="button" className="btn btn-secondary" onClick={handleNextCard}>Next</button>
                }
                
                </div>
            </div>
            }
        </div>
    )
}

export default Card;