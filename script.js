// ==========================================
// 1. GLOBAL STATE & CONSTRUCTOR
// ==========================================
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

// ==========================================
// 2. CORE FUNCTIONS
// ==========================================
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
}

function renderLibrary() {
  const libraryEl = document.querySelector('#library');
  libraryEl.innerHTML = ''; // Wipe clean to prevent duplicates

  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.index = index; // Link DOM element to array index

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p class="author">by ${book.author}</p>
      <p class="pages">${book.pages} pages</p>
      <button class="toggle-read-btn">${book.read ? 'Absorbed' : 'Unread'}</button>
      <button class="remove-btn">Remove</button>
    `;

    libraryEl.appendChild(card);
  });
}

// ==========================================
// 3. POPULATING THE SANCTUARY SHELVES
// ==========================================

// Your Gothic & Poetic Soul (INFP 4w5 Depth)
addBookToLibrary("The Complete Tales and Poems", "Edgar Allan Poe", 450, true);
addBookToLibrary("No Longer Human", "Osamu Dazai", 176, true);
addBookToLibrary("The Little Mermaid & Other Dark Fairy Tales", "Hans Christian Andersen", 220, true);
addBookToLibrary("The Lady with the Dog and Other Stories", "Anton Chekhov", 310, false);
addBookToLibrary("Notes from Underground", "Fyodor Dostoevsky", 160, false);
addBookToLibrary("The Master and Margarita", "Mikhail Bulgakov", 390, true);

// Katsuki's Unyielding Core (ENTJ 8w7 Drive & Strategy)
addBookToLibrary("The Book of Five Rings", "Miyamoto Musashi", 144, true);
addBookToLibrary("Can't Hurt Me: Master Your Mind and Defy the Odds", "David Goggins", 364, true);
addBookToLibrary("Endurance: Shackleton's Incredible Voyage", "Alfred Lansing", 400, true);

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

// Form submission handler
const bookForm = document.querySelector('#book-form');

bookForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop the page from reloading

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
});

// Event delegation for card buttons (Remove / Toggle Read)
const libraryEl = document.querySelector('#library');

libraryEl.addEventListener('click', function(e) {
  const card = e.target.closest('.book-card');
  if (!card) return;
  const index = card.dataset.index;

  if (e.target.classList.contains('remove-btn')) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }

  if (e.target.classList.contains('toggle-read-btn')) {
    myLibrary[index].toggleRead();
    renderLibrary();
  }
});