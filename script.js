const title = document.querySelector('.book-title');
const author = document.querySelector('.book-author');
const addButton = document.querySelector('.add');
let itemArray = [];

let bookObject = {
    title: '',
    author: '',
  };

addButton.addEventListener('click', () => {
    bookObject.title = title.value;
    bookObject.author = author.value;
    itemArray.push(bookObject);
    alert(itemArray)
    localStorage.setItem('bookData', JSON.stringify(itemArray));
})


console.log(itemArray);