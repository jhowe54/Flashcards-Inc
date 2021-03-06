import React from "react";
import {useHistory} from "react-router-dom";


function DeckForm({handleChange, handleSubmit, deckId, formData}) {
    const history = useHistory();
    return (
        <form onSubmit={handleSubmit} className="ml-3">
              <label htmlFor="name">
                Name
                <input
                  className="form-control"
                  cols="50"
                  rows="2"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{backgroundColor: 'rgba(129, 129, 138, 0.425)'}}
                />
                 
                
              </label>
              <br/>
              <label htmlFor="description">
                Description
                <textarea
                  className="form-control"
                  cols="50"
                  rows="2"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  style={{backgroundColor: 'rgba(129, 129, 138, 0.425)'}}
                >
                </textarea>
                
              </label>
              <br/>
              <button type="submit" className="btn btn-primary mr-2">Submit</button>
              <button type="button" className="btn btn-secondary ml-2" onClick={() => history.push(deckId ? `/decks/${deckId}` : '/')}>Cancel</button>
              
            </form>
            
    )
}

export default DeckForm;