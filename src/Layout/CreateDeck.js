import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    description: "",
    name: "",
    id: ""
  };

  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState(initialFormState);


  const handleChange = ({ target }) => {
    setFormData((currentDeck) => ({
      ...currentDeck,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createDeck(formData);
    setFormData(initialFormState);
    history.push(`/`);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ul>
      </nav>
      <div className="m-4">
        <h2>New Deck</h2>
        <DeckForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          deck={deck}
        />
      </div>
    </div>
  );
}

export default CreateDeck;
