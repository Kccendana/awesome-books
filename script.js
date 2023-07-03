const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addButton = document.querySelector('#add');
let itemArray = [];

let bookObject = {
    title: '',
    author: '',
  };

addButton.addEventListener('click', () => {
    bookObject.title = title.value;
    bookObject.author = author.value;
    itemArray.push(bookObject);
    localStorage.setItem(bookData, JSON.stringify(itemArray));
})


console.log(itemArray);