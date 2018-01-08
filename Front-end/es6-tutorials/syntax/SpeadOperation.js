const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
const books2 = books;
console.log(...books);
console.log(books == books2);
console.log(books === books2);

const copiedBooks = [...books];
console.log(books == copiedBooks);
console.log(books === copiedBooks);