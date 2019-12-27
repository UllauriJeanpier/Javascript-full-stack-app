const { Router } = require('express');
const router = Router();

const Book = require('../models/Book')

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);

});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;       // req body estan los datos del objeto
    const imagePath = 'upload/' + req.file.filename                                                // req.file estan los datos de la imagen        
    const newBook = new Book({title, author, isbn, imagePath});
    await newBook.save();
    res.json({'message': 'Book saved'});
});

router.delete('/:id',async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({message : 'Libro Eliminado'});
})



module.exports = router;