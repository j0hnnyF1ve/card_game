import Cards from './Cards.js';

// Dummy class, hasn't been implemented yet
// This is to provide an implementation of Cards with actual suits
// So we could possibly implement normal table games like 
// Blackjack and Poker
class CardsWithSuits extends Cards {
  constructor() {
    super();
    // this.cards = []
  }

  add(card) { 
    console.log('(CardsWithSuits.add)');    
    super.add(card); 
  }
  addAt(index, card) { 
    console.log('(CardsWithSuits.addAt)');
    super.addAt(index, card); 
  }
  removeAt(index, suitType='') { 
    // this would change because of suit
    // STUB
    console.log('(CardsWithSuits.removeAt)');
    super.removeAt(index);
  }
  list() { 
    console.log('(CardsWithSuits.list)');
    return super.list(); 
  }
  length() { 
    console.log('(CardsWithSuits.length)');    
    return super.length(); 
  }

  shuffle() { 
    console.log('(CardsWithSuits.shuffle)');
    super.shuffle();
  }
}

export default CardsWithSuits;