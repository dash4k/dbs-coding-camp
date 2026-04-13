import { nanoid } from "nanoid";
import books from './books.js';

export const createBook = (req, res) => {
    const {
        name = null,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
    }
    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = readPage === pageCount;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };
    books.push(newBook);

    const success = books.filter((book) => book.id === id).length > 0;

    if (success) {
        return res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id }
        });
    }
};

export const getBooks = (req, res) => {
    const { name, reading, finished } = req.query;
    let filteredBooks = books;

    if (name) {
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (reading) {
        filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
    }
    if (finished) {
        filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
    }
    
    const booksView = filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));
    
    return res.status(200).json({
        status: 'success',
        data: { books: booksView }
    });
};

export const getBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: { book }
    });
};

export const editBookById = (req, res) => {
    const { id } = req.params;
    const {
        name = null,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
    }
    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }
    
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });
    }

    const updatedAt = new Date().toISOString();

    books[bookIndex] = {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
    };

    return res.status(200).json({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    });
};

export const deleteBookById = (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            'status': 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        });
    }

    books.splice(bookIndex, 1);

    const success = books.filter((book) => book.id === id).length === 0;

    if (success) {
        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
    }
};
