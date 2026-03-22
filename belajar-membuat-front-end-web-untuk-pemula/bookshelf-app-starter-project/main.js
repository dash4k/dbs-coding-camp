// Do your work here...
const books = [];

const RENDER_EVENT = 'render-book';
const STORAGE_KEY = 'Bookshelf-App'

// Utils
const checkStorage = () => {
    return typeof (Storage) !== 'undefined';
}

const saveData = () => {
    if (checkStorage()) {
        const data = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, data);
    }
}

const findBook = (bookId) => {
    for (const book of books) {
        if (book.id == bookId) return book;
    }
    return null;
}

const findBookIndex = (bookId) => {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == bookId) return i;
    }
    return -1;
}

const makeBookElement = (bookOBject) => {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookOBject.title;
    bookTitle.setAttribute('data-testid', 'bookItemTitle');

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = 'Penulis: ' + bookOBject.author;
    bookAuthor.setAttribute('data-testid', 'bookItemAuthor');

    const bookYear = document.createElement('p');
    bookYear.innerText = 'Tahun: ' + bookOBject.year;
    bookYear.setAttribute('data-testid', 'bookItemYear');

    const readButton = document.createElement('button');
    readButton.classList.add('readButton');
    readButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    readButton.innerText = bookOBject.isComplete ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca';

    readButton.addEventListener('click', () => readUnreadBook(bookOBject.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.innerText = 'Hapus Buku';

    deleteButton.addEventListener('click', () => deleteBook(bookOBject.id));
    
    const editButton = document.createElement('button');
    editButton.classList.add('editButton');
    editButton.setAttribute('data-testid', 'bookItemEditButton');
    editButton.innerText = 'Edit Buku';

    editButton.addEventListener('click', () => editBook(bookOBject.id));

    const buttonContainer = document.createElement('div');
    buttonContainer.append(readButton, deleteButton, editButton);

    const container = document.createElement('div');
    container.append(bookTitle, bookAuthor, bookYear, buttonContainer);
    container.setAttribute('data-bookid', bookOBject.id);
    container.setAttribute('data-testid', 'bookItem');

    return container;
}


// Main CRUD
const addBook = () => {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;
    
    const id = +new Date().getTime();
    books.push({
        id,
        title,
        author,
        year: Number(document.getElementById('bookFormYear').value),
        isComplete,
    });

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    document.getElementById('bookForm').reset();
}

const loadBooks = () => {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(rawData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

const readUnreadBook = (bookId) => {
    const book = findBook(bookId);

    if (book === null) return;

    book.isComplete = !book.isComplete;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const deleteBook = (bookId) => {
    const index = findBookIndex(bookId);

    if (index === -1) return;

    books.splice(index, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

const editBook = (bookId) => {
    const book = findBook(bookId);

    if (book === null) return;

    const editForm = document.getElementById('editForm');
    const idElement = document.getElementById('editId');
    const titleElement = document.getElementById('editTitle');
    const authorElement = document.getElementById('editAuthor');
    const yearElement = document.getElementById('editYear');
    const completeElement = document.getElementById('editComplete');
    const cancelButton = document.getElementById('editFormCancel');

    idElement.innerText = book.id;
    titleElement.value = book.title;
    authorElement.value = book.author;
    yearElement.value = book.year;
    completeElement.checked = book.isComplete;

    editForm.removeAttribute('hidden');

    editForm.onsubmit = (e) => {
        e.preventDefault();
        book.title = titleElement.value;
        book.author = authorElement.value;
        book.year = Number(yearElement.value);
        book.isComplete = completeElement.checked;

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
        editForm.setAttribute('hidden', true);
    };

    cancelButton.onclick = () => {
        editForm.setAttribute('hidden', true);
    };
}

const searchBook = () => {
    const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const result = books.filter((book) => book.title.toLowerCase().includes(searchTitle));

    const searchSection = document.getElementById('searchSection');
    searchSection.innerHTML = '';
    
    if (result.length <= 0) {
        const notFound = document.createElement('p');
        notFound.innerText = `Tidak ditemukan buku dengan judul yang diinput.`
        searchSection.append(notFound);
    } else {
        for (const book of result) {
            const bookElement = makeBookElement(book);
            searchSection.append(bookElement);   
        }
    }
}


// Events listener
document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('bookForm');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addBook();
    });

    if (checkStorage()) {
        loadBooks();
    }

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchBook();
    });
})

document.addEventListener(RENDER_EVENT, () => {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    for (const book of books) {
        const bookElement = makeBookElement(book);
        if (book.isComplete) completeBookList.append(bookElement);
        else incompleteBookList.append(bookElement);
    }
});