import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});

  const initialFormState = {
    front: "",
    back: "",
    deckId: "",
    id: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  //retrieves the deck that the card belongs to
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(() => response);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  //Loads the selected card
  

  //handles changes in the input fields
  const handleChange = ({ target }) => {
    setFormData((currentCard) => ({
      ...currentCard,
      [target.name]: target.value,
    }));
  };
  
  //updates the card on submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialFormState);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item "><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ul>
      </nav>

      <div className="m-4">
        <h2>Add Card</h2>
        <CardForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          deckId={deckId}
          formData={formData}
        />
      </div>
    </div>
  );
}



export default AddCard;