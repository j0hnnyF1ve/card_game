import './styles.css';
import Cards from './Cards.js';
import CardsWithSuits from './CardsWithSuits.js';
import UI from './UI.js';

// Simple instantiation of 10 cards
let deckOfCards = new Cards();
// let deckOfCards = new CardsWithSuits();

for(let i=0; i < 10; i++) {
  // deckOfCards.add(i*1+1);  
  deckOfCards.add( Math.floor(Math.random() * 10)*1 + 1);  
}

// Just testing the card API
deckOfCards.removeAt(5);
deckOfCards.addAt(2, 15);

// Setup coupling of UI to this deck of cards
// Did consider an observer pattern, but went with this for this version
UI.setCardsRef(deckOfCards);

UI.setup();
UI.update( deckOfCards.list() );
