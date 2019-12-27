require('./styles/styles.css');

import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {       // evento de - apenas se carga la pagina 
    const ui = new UI();
    ui.renderBooks();
})

document.getElementById('book-form')
    .addEventListener('submit', e => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();      // un conjunto de pares clave / valor que representan campos de formulario y sus valores
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);
        
        const ui = new UI();
        ui.addANewBook(formData);

        e.preventDefault();   // al enviar el formulario ya no se reinicia (cosa que hace por defecto)
        

    })