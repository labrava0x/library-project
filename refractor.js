// ==========================================
// THE LIBRARY OF OUR DREAMS - JAVASCRIPT ENGINE
// Architectural Refactor Pattern: Inheritance & Subclasses (extends / super)
// ==========================================

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

// --- Base Book Class ---
class Book {
  constructor(title, author, pages, read) {
    this.id = generateId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // Instance method to toggle read status
  toggleRead() {
    this.read = !this.read;
    saveAndRender(); 
  }
}

// --- Subclass: HeroicBook extending Book (Demonstrating Inheritance & super) ---
class HeroicBook extends Book {
  constructor(title, author, pages, read, heroicRank = 'Explosive Apex', battleCry = 'SHINEEE!') {
    super(title, author, pages, read); // Inherit base properties via super()
    this.heroicRank = heroicRank;
    this.battleCry = battleCry;
  }

  // Specialized subclass method
  getCombatSummary() {
    return `${this.title} (${this.pages} pages) — Combat Tier: ${this.heroicRank}`;
  }
}

// ==========================================
// 2. CORE FUNCTIONS & PERSISTENCE
// ==========================================
function saveAndRender() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  renderLibrary();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new HeroicBook(title, author, pages, read);
  myLibrary.push(newBook);
  saveAndRender();
}

function loadLibrary() {
  const LIBRARY_VERSION = 'v12-gothic-classics-and-vendetta';
  const currentVersion = localStorage.getItem('libraryVersion');
  const storedLibrary = localStorage.getItem('myLibrary');
  
  if (storedLibrary && currentVersion === LIBRARY_VERSION) {
    const parsedData = JSON.parse(storedLibrary);
    myLibrary = parsedData.map(item => {
      // Rehydrate plain objects back into HeroicBook subclass instances
      const book = new HeroicBook(item.title, item.author, item.pages, item.read);
      book.id = item.id; 
      return book;
    });
  } else {
    // Raw seed data list containing your full collection plus Gothic, Mystery & Explosive additions
    const rawSeedData = [
      // My Gothic & Poetic Soul
      { title: "The Complete Tales and Poems", author: "Edgar Allan Poe", pages: 450, read: true },
      { title: "Dracula", author: "Bram Stoker", pages: 418, read: true },
      { title: "Carmilla", author: "Sheridan Le Fanu", pages: 110, read: true },
      { title: "The Haunting of Hill House", author: "Shirley Jackson", pages: 246, read: true },
      { title: "The Mysteries of Udolpho", author: "Ann Radcliffe", pages: 672, read: false },
      { title: "Frankenstein", author: "Mary Shelley", pages: 280, read: true },
      { title: "The Hunchback of Notre-Dame", author: "Victor Hugo", pages: 540, read: true },
      { title: "The Phantom of the Opera", author: "Gaston Leroux", pages: 368, read: true },
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

      // Katsuki's Unyielding Core (Drive, Strategy, Defiance & Grit)
      { title: "The Art of War", author: "Sun Tzu", pages: 112, read: true },
      { title: "The Book of Five Rings", author: "Miyamoto Musashi", pages: 144, read: true },
      { title: "Can't Hurt Me: Master Your Mind and Defy the Odds", author: "David Goggins", pages: 364, read: true },
      { title: "Endurance: Shackleton's Incredible Voyage", author: "Alfred Lansing", pages: 400, read: true },
      { title: "V for Vendetta", author: "Alan Moore", pages: 396, read: true },

      // Classic & Ultimate Mystery Masterpieces Wing
      { title: "The Adventures of Sherlock Holmes", author: "Sir Arthur Conan Doyle", pages: 307, read: true },
      { title: "The Hound of the Baskervilles", author: "Sir Arthur Conan Doyle", pages: 256, read: true },
      { title: "A Study in Scarlet", author: "Sir Arthur Conan Doyle", pages: 180, read: true },
      { title: "The Sign of the Four", author: "Sir Arthur Conan Doyle", pages: 192, read: false },
      { title: "And Then There Were None", author: "Agatha Christie", pages: 272, read: true },
      { title: "The Murder of Roger Ackroyd", author: "Agatha Christie", pages: 312, read: true },
      { title: "Murder on the Orient Express", author: "Agatha Christie", pages: 256, read: true },
      { title: "The ABC Murders", author: "Agatha Christie", pages: 288, read: false },
      { title: "The Mysterious Affair at Styles", author: "Agatha Christie", pages: 296, read: true },
      { title: "The Murders in the Rue Morgue", author: "Edgar Allan Poe", pages: 64, read: true },
      { title: "The Purloined Letter & Other Tales", author: "Edgar Allan Poe", pages: 120, read: true },
      { title: "The Hollow Man (The Three Coffins)", author: "John Dickson Carr", pages: 294, read: true },
      { title: "The Crooked Hinge", author: "John Dickson Carr", pages: 288, read: false },
      { title: "The Big Sleep", author: "Raymond Chandler", pages: 231, read: true },
      { title: "The Long Goodbye", author: "Raymond Chandler", pages: 379, read: false },
      { title: "The Maltese Falcon", author: "Dashiell Hammett", pages: 217, read: true },
      { title: "The Red House Mystery", author: "A.A. Milne", pages: 232, read: true },
      { title: "Whose Body?", author: "Dorothy L. Sayers", pages: 184, read: true },
      { title: "The Nine Tailors", author: "Dorothy L. Sayers", pages: 352, read: false },
      { title: "Strong Poison", author: "Dorothy L. Sayers", pages: 256, read: true },
      { title: "The Innocence of Father Brown", author: "G.K. Chesterton", pages: 265, read: true },
      { title: "The Man Who Was Thursday", author: "G.K. Chesterton", pages: 192, read: false },
      { title: "The Woman in White", author: "Wilkie Collins", pages: 608, read: true },
      { title: "The Moonstone", author: "Wilkie Collins", pages: 528, read: true },
      { title: "Trent's Last Case", author: "E.C. Bentley", pages: 240, read: false },
      { title: "The Devotion of Suspect X", author: "Keigo Higashino", pages: 296, read: true },
      { title: "The Tokyo Zodiac Murders", author: "Soji Shimada", pages: 310, read: false },
      { title: "The Beekeeper's Apprentice", author: "Laurie R. King", pages: 341, read: true },
      { title: "The Daughter of Time", author: "Josephine Tey", pages: 208, read: true },
      { title: "The Franchise Affair", author: "Josephine Tey", pages: 272, read: false },
      { title: "Malice Aforethought", author: "Francis Iles", pages: 288, read: true },
      { title: "Before the Fact", author: "Francis Iles", pages: 304, read: false },

      // Masterminds, Heists & Impossible Puzzles (Plus Ultra Wing)
      { title: "The Count of Monte Cristo", author: "Alexandre Dumas", pages: 1276, read: true },
      { title: "Six of Crows", author: "Leigh Bardugo", pages: 465, read: true },
      { title: "The Decagon House Murders", author: "Yukito Ayatsuji", pages: 232, read: false },
      { title: "The Royal Game (Chess Story)", author: "Stefan Zweig", pages: 112, read: true },
      { title: "Red Dragon", author: "Thomas Harris", pages: 454, read: true },
      { title: "The Lies of Locke Lamora", author: "Scott Lynch", pages: 550, read: false },
      { title: "Shibumi", author: "Trevanian", pages: 480, read: false },

      // Investigative Thrillers & Noir (Millennium Series)
      { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", pages: 465, read: true },
      { title: "The Girl Who Played with Fire", author: "Stieg Larsson", pages: 503, read: true },
      { title: "The Girl Who Kicked the Hornet's Nest", author: "Stieg Larsson", pages: 566, read: true },

      // Epic Fantasy (Mistborn Trilogy)
      { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", pages: 541, read: true },
      { title: "The Well of Ascension", author: "Brandon Sanderson", pages: 759, read: false },
      { title: "The Hero of Ages", author: "Brandon Sanderson", pages: 572, read: false }
    ];

    myLibrary = rawSeedData.map(item => new HeroicBook(item.title, item.author, item.pages, item.read));
    
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
      <button class="toggle-read-btn">${book.read ? '✨ Explosively Read' : '📖 Explosively Reading'} — Move it!</button>
      <button class="remove-btn">✨ SHINEEE</button>
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