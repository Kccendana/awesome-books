/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
const list = document.querySelector('.list');
const addNew = document.querySelector('.add-new');
const contact = document.querySelector('.contact');
const listSect = document.querySelector('#list');
const addNewForm = document.querySelector('#add-new');
const contactSect = document.querySelector('#contact');

list.addEventListener('click', () => {
  listSect.style.display = 'block';
  contactSect.style.display = 'none';
  addNewForm.style.display = 'none';
});

addNew.addEventListener('click', () => {
  addNewForm.style.display = 'flex';
  listSect.style.display = 'none';
  contactSect.style.display = 'none';
});

contact.addEventListener('click', () => {
  contactSect.style.display = 'block';
  listSect.style.display = 'none';
  addNewForm.style.display = 'none';
});

function showDate() {
  const displayDate = document.querySelector('.date');
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const date1 = [1, 11, 21, 31];

  let ordinal;
  if (currentDate.getDate() in date1) {
    ordinal = 'st';
  } else if (currentDate.getDate() === 2 || currentDate.getDate() === 22) {
    ordinal = 'nd';
  } else if (currentDate.getDate() === 3 || currentDate.getDate() === 23) {
    ordinal = 'rd';
  } else {
    ordinal = 'th';
  }

  let amPm;
  if (currentDate.getHours() < 12) {
    amPm = 'am';
  } else {
    amPm = 'pm';
  }

  displayDate.textContent = `${monthName[currentDate.getMonth()]} ${currentDate.getDate()}${ordinal} ${currentDate.getFullYear()}, ${currentDate.getHours() - 12}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${amPm}`;
}

setInterval(showDate, 1000);

// class Book {
//   constructor(title, author) {
//     this.title = title;
//     this.author = author;
//   }
// }

class BookList {
  constructor() {
    this.booksArray = JSON.parse(localStorage.getItem('bookItems')) || [];
    this.bookListDiv = document.querySelector('#book-container');
    this.booklistHeading = document.querySelector('.list-title');
    this.form = document.querySelector('.form');
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.title = this.titleInput.value;
    this.author = this.authorInput.value;

    this.displayBooks();
    this.addEventListeners();
  }

  addBook(title, author) {
    const book = { title, author };
    this.booksArray.push(book);
    localStorage.setItem('bookItems', JSON.stringify(this.booksArray));
    this.displayBooks();
  }

  removeBook(index) {
    this.booksArray.splice(index, 1);
    localStorage.setItem('bookItems', JSON.stringify(this.booksArray));
    this.displayBooks();
  }

  displayBooks() {
    this.bookListDiv.innerHTML = '';

    if (this.booksArray.length === 0) {
      this.bookListDiv.style.border = 'none';
      this.booklistHeading.innerHTML = 'No book on the list';
    } else {
      this.booklistHeading.innerHTML = 'All awesome books';
    }

    this.booksArray.forEach((book, index) => {
      this.bookListDiv.innerHTML += `
      <li><span><strong>"${book.title}"</strong> by <strong>${book.author}</strong></span><button class="button" id="remove" data-index="${index}">Remove</button></li>`;
      this.bookListDiv.style.border = '2px solid';
      this.removeBtns = document.querySelectorAll('.button');
      this.removeBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
          const { index } = event.target.dataset;
          this.removeBook(index);
        });
      });
    });
  }

  addEventListeners() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addBook(this.titleInput.value, this.authorInput.value);
      this.titleInput.value = '';
      this.authorInput.value = '';
    });
  }

  static initialize() {
    const booklist = new BookList();
    return booklist;
  }
}

BookList.initialize();