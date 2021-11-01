# Flashcards Inc.
Flashcards Inc. is an app for users to create decks of flashcards for studying key terms, concepts, and questions. 
## Overview
### 1. HomeScreen
![Alt text](/screenshots/home-page.png?raw=true "Home Screen") 

The home page displays a user's current decks. From here they may create a new deck, or view/study/delete an exisiting deck.

### 2. Create Deck
![Alt text](/screenshots/create-deck.png?raw=true "Home Screen")
Simple input form for a user to create a new deck including the title and description

### 3. View Deck
![Alt text](/screenshots/deck-view.png?raw=true "Home Screen")
View when the user opens up a deck. Displays all cards - each with the option to edit or delete - as well as the option to edit the deck title/description, study, add cards, or delete the entire deck.

Note: Includes a breadcrumb navigation bar that displays information and links for the previous/current page as the user navigates through the various screens within the deck.

### 4. Add Card
![Alt text](/screenshots/add-card.png?raw=true "Home Screen")
Input form for users to create new cards. Both fields require input to save. 

### 5. Edit Card
![Alt text](/screenshots/edit-card.png?raw=true "Home Screen")
Allows users to edit existing cards. 

### 6. Study Deck
![Alt text](/screenshots/study-deck.png?raw=true "Home Screen")
Main study component of the app. Cards display in order, and can be flipped with the click of a button to see the back side of the card.

![Alt text](/screenshots/study-deck-last-card.png?raw=true "Home Screen")
The last card gives the user the option to restart, which will take them back to the first card in the deck.

### 7. Not Enough Cards
![Alt text](/screenshots/not-enough-cards.png?raw=true "Home Screen")
If a deck has less than three cards, the _study_ screen will inform the user that at least three cards are required to begin a study session.

## Technology
### Built with:
* React, React Router 
    * Created with [create-react-app](https://github.com/facebook/create-react-app) 
    * Styling: Bootstrap 4, CSS3

## Planned Features:
* Personal accounts
* New options for study sessions 