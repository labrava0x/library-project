// ==========================================
// THE LIBRARY OF OUR DREAMS - JAVASCRIPT ENGINE
// ==========================================

// 1. GLOBAL STATE & CONSTRUCTOR
let myLibrary = [];

// Safe ID generator that works locally without secure context restrictions
function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function Book(title, author, pages, read) {
  this.id = generateId();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
  this.read = !this.read;
  saveAndRender(); 
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
  const LIBRARY_VERSION = 'v3-gothic-toska-fixed';
  const currentVersion = localStorage.getItem('libraryVersion');
  const storedLibrary = localStorage.getItem('myLibrary');
  
  if (storedLibrary && currentVersion === LIBRARY_VERSION) {
    const parsedData = JSON.parse(storedLibrary);
    myLibrary = parsedData.map(item => {
      const book = new Book(item.title, item.author, item.pages, item.read);
      book.id = item.id; 
      return book;
    });
  } else {
    // Raw seed data list as plain objects
    const rawSeedData = [
      // My Gothic & Poetic Soul
      { title: "The Complete Tales and Poems", author: "Edgar Allan Poe", pages: 450, read: true },
      { title: "Dracula", author: "Bram Stoker", pages: 418, read: true },
      { title: "Carmilla", author: "Sheridan Le Fanu", pages: 110, read: true },
      { title: "The Haunting of Hill House", author: "Shirley Jackson", pages: 246, read: true },
      { title: "The Mysteries of Udolpho", author: "Ann Radcliffe", pages: 672, read: false },
      { title: "Frankenstein", author: "Mary Shelley", pages: 280, read: true },
      { title: "No Longer Human", author: "Osamu Dazai", pages: 176, read: true },
      { title: "The Little Mermaid & Other Dark Fairy Tales", author: "Hans Christian Andersen", pages: 220, read: true },
      { title: "The Little Prince", author: "Antoine de Saint-Exupéry", pages: 96, read: true },
      { title: "The Adventures of Pinocchio", author: "Carlo Collodi", pages: 192, read: true },
      { title: "Notes from Underground", author: "Fyodor Dostoevsky", pages: 160, read: false },
      { title: "The Master and Margarita", author: "Mikhail Bulgakov", pages: 390, read: true },

      // Heavy Russian Toska & Melancholy
      { title: "Toska: Melancholy & Short Stories", author: "Anton Chekhov", pages: 190, read: false },
      { title: "The Lady with the Dog and Other Stories", author: "Anton Chekhov", pages: 310, read: false },
      { title: "The Overcoat and Other Stories", author: "Nikolai Gogol", pages: 150, read: true },
      { title: "A Hero of Our Time", author: "Mikhail Lermontov", pages: 204, read: false },
      { title: "First Love and Asya", author: "Ivan Turgenev", pages: 188, read: false },

      // Existential & Philosophical Masterpieces
      { title: "The Metamorphosis", author: "Franz Kafka", pages: 200, read: true },
      { title: "The Trial", author: "Franz Kafka", pages: 255, read: false },
      { title: "The Stranger", author: "Albert Camus", pages: 123, read: true },
      { title: "Kafka on the Shore", author: "Haruki Murakami", pages: 505, read: true },
      { title: "Norwegian Wood", author: "Haruki Murakami", pages: 380, read: false },
      { title: "Life Is a Dream", author: "Calderón de la Barca", pages: 140, read: false },
      { title: "Never Let Me Go", author: "Kazuo Ishiguro", pages: 288, read: true },
      { title: "Breasts and Eggs", author: "Mieko Kawakami", pages: 435, read: false },

      // Katsuki's Unyielding Core (Drive, Strategy & Grit)
      { title: "The Art of War", author: "Sun Tzu", pages: 112, read: true },
      { title: "The Book of Five Rings", author: "Miyamoto Musashi", pages: 144, read: true },
      { title: "Can't Hurt Me: Master Your Mind and Defy the Odds", author: "David Goggins", pages: 364, read: true },
      { title: "Endurance: Shackleton's Incredible Voyage", author: "Alfred Lansing", pages: 400, read: true }
    ];

    myLibrary = rawSeedData.map(item => new Book(item.title, item.author, item.pages, item.read));
    
    localStorage.setItem('libraryVersion', LIBRARY_VERSION);
    saveAndRender();
  }
}

function renderLibrary() {
  const libraryEl = document.querySelector('#library');
  if (!libraryEl) return;
  libraryEl.innerHTML = ''; // Wipe clean to prevent duplicates

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

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

if (openModalBtn && bookDialog) {
  openModalBtn.addEventListener('click', () => {
    bookDialog.showModal();
  });
}

if (closeModalBtn && bookDialog) {
  closeModalBtn.addEventListener('click', () => {
    bookDialog.close();
  });
}

if (bookDialog) {
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
}

if (bookForm && bookDialog) {
  bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;

    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    bookDialog.close();
  });
}

if (libraryEl) {
  libraryEl.addEventListener('click', function(e) {
    const card = e.target.closest('.book-card');
    if (!card) return;
    
    const bookId = card.dataset.id;

    if (e.target.classList.contains('remove-btn')) {
      const bookIndex = myLibrary.findIndex(book => book.id === bookId);
      if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        saveAndRender();
      }
    }

    if (e.target.classList.contains('toggle-read-btn')) {
      const targetBook = myLibrary.find(book => book.id === bookId);
      if (targetBook) {
        targetBook.toggleRead();
      }
    }
  });
}

// ==========================================
// 5. PORTAL & IDLE THRESHOLD ENGINE
// ==========================================
const portalEl = document.querySelector('#sanctuary-portal');
let idleTimer = null;
const IDLE_LIMIT = 60000; // 60 seconds

function openPortal() {
  if (portalEl) portalEl.classList.add('active');
}

function closePortal() {
  if (portalEl) portalEl.classList.remove('active');
  resetIdleTimer();
}

// Global document listener so Enter breaks the portal cleanly
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const bookDialog = document.querySelector('#book-dialog');
    if (!bookDialog || !bookDialog.open) {
      closePortal();
      e.preventDefault();
    }
  }
});

// Click fallback to wake the sanctuary
if (portalEl) {
  portalEl.addEventListener('click', () => {
    closePortal();
  });
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    const bookDialog = document.querySelector('#book-dialog');
    if (!bookDialog || !bookDialog.open) {
      openPortal();
    }
  }, IDLE_LIMIT);
}

['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
  window.addEventListener(event, resetIdleTimer);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    openPortal();
  }
});

resetIdleTimer();