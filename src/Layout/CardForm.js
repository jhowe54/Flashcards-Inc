import React from "react";
import {useHistory} from "react-router-dom";

function CardForm({handleSubmit, handleChange, deckId, formData, card}) {
const history = useHistory();
    return (
    <form onSubmit={handleSubmit} className="ml-3">
          <label htmlFor="front">
            Front
            <textarea
              className="form-control"
              cols="50"
              rows="2"
              id="front"
              name="front"
              value={formData.front}
              onChange={handleChange}
              placeholder={card.front}
              required
            >
            </textarea>
            
          </label>
          <br/>
          <label htmlFor="back">
            Back
            <textarea
              className="form-control"
              cols="50"
              rows="2"
              id="back"
              name="back"
              value={formData.back}
              onChange={handleChange}
              placeholder={card.back}
              required
            >
            </textarea>
            
          </label>
          <br/>
          <input type="submit" className="btn btn-primary mr-2" value="Save" />
          <button type="button" className="btn btn-secondary ml-2" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
          
        </form>
        
)
}



export default CardForm