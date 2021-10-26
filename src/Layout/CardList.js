import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";
import "./CardList.css"

function CardList({ cards = [] }) {
    const history = useHistory();

    const [deck, setDeck] = useState(cards)
    const {deckId} = useParams();
    const {cardId} = useParams();
    
    const deleteHandler = async (id) => {
      const confirmation = window.confirm("Are you sure you want to delete this card?")
      if(confirmation) {
        await deleteCard(id);
        history.go(0);
      } 
    }
    


    

    const list = cards.map((card, index) => {
        return (
        <div className="row">
          <div className="col col-4 m-3">
            {card.front}
          </div>
          <div className="col col-4 m-3"> 
              {card.back}
              <div>
                <button type="button" className="btn btn-secondary m-3" onClick={() => history.push(`/decks/${card.deckId}/cards/${card.id}/edit`)}>Edit</button>
                <button type="button" className="btn btn-danger m-3" onClick={() => deleteHandler(card.id)}>Delete</button>
              </div>
              
        </div>
      </div>
        )
    } );
    
    
    
    return (
            <div>
              <h2>Cards</h2>
              {list}
            </div>
        
        
    )
}

export default CardList;