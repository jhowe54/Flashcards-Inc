import React from "react";
import { useHistory} from "react-router-dom";
import { deleteCard } from "../utils/api";
import "./CardList.css"


function CardList({ cards = [] }) {
    const history = useHistory();

    const deleteHandler = async (id) => {
      const confirmation = window.confirm("Are you sure you want to delete this card?")
      if(confirmation) {
        await deleteCard(id);
        history.go(0);
      } 
    }
  
    const list = cards.map((card) => {
        return (
        <div className="row list-center" key={card.id}>
          <div  className="col col-lg-5 col-md-5 col-sm-5 card-center">
            {card.front}
          </div>
          <div className="col col-lg-5 col-md-5 col-sm-5 card-center" > 
              {card.back}
              <div className="text-right mt-4">
                <button type="button" className="btn btn-secondary m-1 col-lg-2 col-md-5 p-1" onClick={() => history.push(`/decks/${card.deckId}/cards/${card.id}/edit`)}>Edit</button>
                <button type="button" className="btn btn-danger m-1 col-lg-3 col-md-5 p-1" onClick={() => deleteHandler(card.id)}>Delete</button>
              </div>
              
        </div>
      </div>
        )
    } );
    
    
     
    return (
            <div className="ml-5">
              <h2 className="ml-4">Cards</h2>
              {list}
            </div>
        
        
    )
}

export default CardList;