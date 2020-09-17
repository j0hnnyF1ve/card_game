class Cards {
  constructor() {
    this.cards = []
  }

  /*
  Sort of self explanatory, but these methods are operations on the deck of cards
  */

  add(card) { this.cards.push(card); }
  addAt(index, card) { this.cards.splice(index, 0, card); }
  removeAt(index) { this.cards.splice(index, 1); }
  list() { return this.cards; }
  length() { return this.length; }
  shuffle() { 
    // Shuffle algorithm from here:
    // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    // Does a Fisher-Yates in place shuffle
    let j, x;
    for(let i = this.cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (1*i+1) );
      x = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  }
}

export default Cards;