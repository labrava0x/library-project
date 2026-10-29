function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error("You must use the 'new' operator to call the Book constructor");
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  const readStatus = this.read ? "read already" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());