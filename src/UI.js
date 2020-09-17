/*
attrs - list of key/value pairs
*/
const comp = (elementType='div', attrs=[], listeners=[]) => {
  if(elementType.length <= 0 || typeof elementType !== 'string') { elementType = 'div';}
  const el = document.createElement(elementType);
  
  attrs.forEach( attr => {
    let [key, val] = attr;
    el[key] = val;
  });
  
  listeners.forEach( listener => {
    let [eventType, handler] = listener;
    el.addEventListener(eventType, handler);
  });

  return el;
};

// ****************************************************************

/*
addClickHandler - add a card to the deck
- updateFunc - An update function that will update the UI after cardsRef has been mutated
- cardsRef - reference to the deck of cards
*/
const addClickHandler = (updateFunc, cardsRef) => function(e) {
  if(cardsRef == null) { 
    console.error(`(UI.addClickHandler) - No card ref was supplied`);
  }

  cardsRef.add( Math.round(1*1 + Math.random() * 10) );
  updateFunc( cardsRef.list() );
};

/*
cardClickHandler - handles clicks on the cards
- updateFunc - An update function that will update the UI after cardsRef has been mutated
- cardsRef - reference to the deck of cards
*/
const cardClickHandler = (updateFunc, cardsRef) => function(e) {
  e.preventDefault();
  let target = e.target;

  if(cardsRef == null) { 
    console.error(`(UI.cardClickHandler) - No card ref was supplied`);
    return;
  }

  if(target == null || target.className != 'card') {
    return;
  }
  let index = target.dataset.index;

  cardsRef.removeAt(index);
  updateFunc( cardsRef.list() );
};

/*
shuffleClickHandler - handles shuffling of cards
- updateFunc - An update function that will update the UI after cardsRef has been mutated
- cardsRef - reference to the deck of cards
*/
const shuffleClickHandler = (updateFunc, cardsRef) => function(e) {
  // short circuit the event handler if no card ref is supplied
  if(cardsRef == null) { 
    console.error(`(UI.shuffleClickHandler) - No card ref was supplied`);
  }
    // This may be problematic in the future, in that we make an assumption
  // cardsRef has a shuffle method
  cardsRef.shuffle();
  updateFunc( cardsRef.list() );
};

// ****************************************************************

/*
UI class
- meant to be used as a Singleton
- since it interacts with the DOM, of which there should only be one
*/
class UI {
  constructor() {
    this.headerEl = null;
    this.cardEls = null;
    this.cardsRef = {};
  }

  setCardsRef(cardsRef) { this.cardsRef = cardsRef; }
  getCardsRef() { return this.cardsRef; }
  get cards() { return this.cardsRef; }

  /*
  setup - Setup the header, shuffle and add buttons
  */
  setup() {
    this.headerEl = comp('section', [
      ['className', 'header']
    ]);

      let button = comp('button', [
        ['className', 'button shuffleButton'],
        ['innerText', 'Shuffle']
      ], 
      [
        ['click', shuffleClickHandler(this.update.bind(this), this.cardsRef) ]
      ]);  
      this.headerEl.append(button);

      button = comp('button', [
        ['className', 'button addButton'],
        ['innerText', 'Add']
      ], 
      [
        ['click', addClickHandler(this.update.bind(this), this.cardsRef) ]
      ]);  
      this.headerEl.append(button);

    document.body.appendChild(this.headerEl);
  }

  /*
  update - the UI update thread, updates the cards UI
  cards - cards list 
  */
  update(cards=[]) {
    if(this.cardEls == null) {
      this.cardEls = comp('section', 
        [
          ['className', 'cards']
        ],
        [
          ['click', cardClickHandler(this.update.bind(this), this.cards) ]
        ]
      );
      document.body.appendChild(this.cardEls);
    }

    let existingCardEls = Array.from(this.cardEls.querySelectorAll('.card'));
    let lastIndex = 0;

    // Updates are going to be O(N)
    // Creation initially is also O(N)
    cards.forEach( (card, index) => {
      lastIndex = index;
      if(card == null) return;

      let existingCardEl = existingCardEls[index];
      if(existingCardEl != null) {

        existingCardEl.dataset.index = index;
        let tr = existingCardEl.querySelector('.tr');
        let bl = existingCardEl.querySelector('.bl'); 
        tr.innerText = card;
        bl.innerText = card;
      }
      else {
        // create the card
        let cardEl      = comp('div', [['className', 'card']]);
          let tr        = comp('span', [['className', 'tr']]);
          let bl        = comp('span', [['className', 'bl']]);
            tr.innerText  = card;
            bl.innerText   = card;
          cardEl.append(tr);
          cardEl.append(bl);
          cardEl.dataset.index = index;
        this.cardEls.append(cardEl);
      }
    });

    // remove last element
    if(lastIndex === 0 && existingCardEls.length === 1) { 
      existingCardEls[lastIndex].remove();
    }
    else {
      // remove any orphaned nodes (items with indexes greater than lastIndex)
      existingCardEls.slice(lastIndex*1+1).forEach(el => el.remove() );
    }
  }
};

// UI is a singleton
UI = new UI();
export default UI;