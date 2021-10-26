import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  const initialFormState = {
    front: "",
    back: "",
    deckId: parseInt(deckId),
    id: parseInt(cardId),
  };

  const [formData, setFormData] = useState(initialFormState);

  //retrieves the deck that the card belongs to
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        console.log(response);
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
  useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
      try {
        const response = await readCard(cardId, abortController.signal);
        console.log(response);
        setCard(() => response);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadCard();
    return () => abortController.abort();
  }, [cardId]);

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
    await updateCard(formData);
    setFormData(initialFormState);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item "><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{`Edit Card ${card.id}`}</Link></li>
        </ul>
      </nav>

      <div className="m-4">
        <h2>Edit Card</h2>
        <CardForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          deckId={deckId}
          formData={formData}
          card={card}
        />
      </div>
    </div>
  );
}

export default EditCard;
