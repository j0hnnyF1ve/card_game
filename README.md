# Build into the .dist directory
npm run build

# Run webserver for development
npm start

## Features
* Add Card - adds a card to end of the deck
* Shuffle Card - shuffles the cards in a random order
* Delete Card - clicking on a card will delete it

## Notes

* CardsWithSuits is currently a dummy class, but wanted briefly test if I liked the inheribility of my approach
  * Potentially Cards could be extended into many diff game domains
  * By being able to define the Card set, we can support a wide variety of games in the future

* Debated mutability vs immutability for objects (Cards)
  * Went with mutability for the simplicity
  * But want to revisit immutability / uni directional data flow in the future (ala Redux)
  * Hesitant with this approach, b/c I can already see some issues where event handlers need to have knowledge of underlying data
  * Better if the event handler or other functions don't need to know much
    * Am thinking of some sort of interface

* UI is set up to take advantage of existing DOM elements
  * New cards added to the Deck will either re-utilize existing DOM elements, or add a new one
  * At the end of each Update cycle, DOM elements not used get dropped

* For the actual game, I want to have a UI class and a GameEngine class
  * UI class would be a singleton that represented a game
    * The included version is merely a test UI that allows shuffling, adding and deleting of cards (when clicking on a card)
  
  * Game Engine (not implemented) would represent an actual game
    * Didn't implement yet b/c it's not in the spec
    * But the way it work is that the Game Engine would have awareness of both the UI and Cards, and call methods on both to drive the game forward
    * Example would be a Blackjack Engine

    * At this point, we would be following an MVC pattern:
      * M - Cards class
      * V - UI class
      * C - Game Engine class