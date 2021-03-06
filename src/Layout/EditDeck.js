import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    description: "",
    name: "",
    id: parseInt(deckId),
  };

  const [formData, setFormData] = useState(initialFormState);
  

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setFormData(() => response);
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData((currentDeck) => ({
      ...currentDeck,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData);
    setFormData(initialFormState);
    history.push(`/decks/${deckId}`);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{formData.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{`Edit Deck ${deckId}`}</li>
        </ul>
      </nav>
      <div className="m-4">
        <h2>Edit Deck {formData.id}</h2>
        <DeckForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          deckId={deckId}
          formData={formData}
        />
      </div>
    </div>
  );
}

export default EditDeck;
 