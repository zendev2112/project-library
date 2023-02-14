const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readBook = function (element) {
  const chkbox = document.createElement('input');
  chkbox.setAttribute('type', 'checkbox');
  chkbox.setAttribute('id', 'innerchkbox');

  const lbl = document.createElement('label');
  lbl.setAttribute('for', 'innerchkbox');

  lbl.appendChild(document.createTextNode('Read '));

  const chkBoxDiv = document.createElement('div');
  chkBoxDiv.setAttribute('class', 'card-label');
  chkBoxDiv.appendChild(lbl);
  chkBoxDiv.appendChild(chkbox);

  element.appendChild(chkBoxDiv);

  if (this.read === true) {
    chkbox.checked = true;
  } else {
    chkbox.checked = false;
  }
};

function addBookToLibrary() {
  const bookAuthor = document.getElementById('author').value;
  const bookTitle = document.getElementById('title').value;
  const bookPages = document.getElementById('number-pages').value;
  const readCheckbox = document.getElementById('read').checked;
  const newBook = new Book(bookAuthor, bookTitle, bookPages, readCheckbox);
  myLibrary.push(newBook);
  const content = document.querySelector('#content');
  const div = document.createElement('div');
  div.setAttribute('id', 'card');
  content.appendChild(div);
  const arrayIndex = myLibrary.indexOf(newBook);
  div.dataset.index = arrayIndex;
  div.innerHTML = `<p class='card-label'> Author: ${newBook.author} </p>
  <p class='card-label'> Title: ${newBook.title} </p> <p class='card-label'> Pages: ${newBook.pages} <p/> 
  `;

  newBook.readBook(div);

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('id', 'delete-btn');
  deleteBtn.textContent = 'Remove Book';
  div.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', () => {
    if (parseInt(div.getAttribute('data-index')) === parseInt(arrayIndex)) {
      myLibrary.splice(arrayIndex, 1);
      content.removeChild(div);
    }
  });

  const inputs = document.querySelectorAll('#author,#title, #number-pages');
  inputs.forEach((input) => {
    input.value = '';
  });
  const chBox = document.getElementById('read');
  chBox.checked = false;
}

const button = document.getElementById('submit-btn');

button.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
});
