// ==========================================
// THE LIBRARY OF OUR DREAMS - JAVASCRIPT ENGINE
// ==========================================

// 1. GLOBAL STATE & CONSTRUCTOR
let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Unique stable identifier for each volume
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
  this.read = !this.read;
  saveAndRender(); // Save state changes immediately
};

// ==========================================
// 2. CORE FUNCTIONS & PERSISTENCE
// ==========================================
function saveAndRender() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  renderLibrary();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  saveAndRender();
}

function loadLibrary() {
  const storedLibrary = localStorage.getItem('myLibrary');
  
  if (storedLibrary) {
    const parsedData = JSON.parse(storedLibrary);
    // Re-map plain objects back into full Book instances so prototypes work!
    myLibrary = parsedData.map(item => {
      const book = new Book(item.title, item.author, item.pages, item.read);
      book.id = item.id; // Keep the original cryptographic UUID intact
      return book;
    });
  } else {
    // Populate initial sanctuary shelves if storage is completely empty
    
    // My Gothic & Poetic Soul 
    addBookToLibrary("The Complete Tales and Poems", "Edgar Allan Poe", 450, true);
    addBookToLibrary("No Longer Human", "Osamu Dazai", 176, true);
    addBookToLibrary("The Little Mermaid & Other Dark Fairy Tales", "Hans Christian Andersen", 220, true);
    addBookToLibrary("The Lady with the Dog and Other Stories", "Anton Chekhov", 310, false);
    addBookToLibrary("Notes from Underground", "Fyodor Dostoevsky", 160, false);
    addBookToLibrary("The Master and Margarita", "Mikhail Bulgakov", 390, true);

    // Poetic Fables & Heavy Russian Toska (New Additions)
    addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
    addBookToLibrary("The Adventures of Pinocchio", "Carlo Collodi", 192, true);
    addBookToLibrary("Toska: Melancholy & Short Stories", "Anton Chekhov", 190, false);

    // Katsuki's Unyielding Core (ENTJ 8w7 Drive, Strategy & Grit)
    addBookToLibrary("The Art of War", "Sun Tzu", 112, true);
    addBookToLibrary("The Book of Five Rings", "Miyamoto Musashi", 144, true);
    addBookToLibrary("Can't Hurt Me: Master Your Mind and Defy the Odds", "David Goggins", 364, true);
    addBookToLibrary("Endurance: Shackleton's Incredible Voyage", "Alfred Lansing", 400, true);
  }
}

function renderLibrary() {
  const libraryEl = document.querySelector('#library');
  libraryEl.innerHTML = ''; // Wipe clean to prevent duplicates

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id; // Permanently link DOM card to the unique book ID

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p class="author">by ${book.author}</p>
      <p class="pages">${book.pages} pages</p>
      <p class="book-id" style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.8rem;">ID: ${book.id.slice(0, 8)}...</p>
      <button class="toggle-read-btn">${book.read ? 'Absorbed' : 'Unread'}</button>
      <button class="remove-btn">Remove</button>
    `;

    libraryEl.appendChild(card);
  });
}

// ==========================================
// 3. INITIALIZE ON PAGE LOAD
// ==========================================
loadLibrary();
renderLibrary();

// ==========================================
// 4. EVENT LISTENERS & MODAL CONTROLS
// ==========================================
const bookDialog = document.querySelector('#book-dialog');
const openModalBtn = document.querySelector('#open-modal-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const bookForm = document.querySelector('#book-form');
const libraryEl = document.querySelector('#library');

// Open the modal when clicking "Add New Volume"
openModalBtn.addEventListener('click', () => {
  bookDialog.showModal();
});

// Close the modal via the 'X' button
closeModalBtn.addEventListener('click', () => {
  bookDialog.close();
});

// Close modal if clicking outside the backdrop area
bookDialog.addEventListener('click', (e) => {
  const dialogDimensions = bookDialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    bookDialog.close();
  }
});

// Form submission handler
bookForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Stop the page from reloading

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  
  bookDialog.close(); // Automatically close the modal after submitting!
});

// Event delegation for card buttons (Remove / Toggle Read) using unique IDs
libraryEl.addEventListener('click', function(e) {
  const card = e.target.closest('.book-card');
  if (!card) return;
  
  const bookId = card.dataset.id; // Retrieve the unique cryptographic ID

  if (e.target.classList.contains('remove-btn')) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
      saveAndRender(); // Save state changes immediately
    }
  }

  if (e.target.classList.contains('toggle-read-btn')) {
    const targetBook = myLibrary.find(book => book.id === bookId);
    if (targetBook) {
      targetBook.toggleRead(); // Calls prototype method which saves & re-renders
    }
  }
});