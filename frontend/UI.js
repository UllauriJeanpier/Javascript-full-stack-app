import BookService from './services/BookService'
import { format } from 'timeago.js' 

const bookService = new BookService();

class UI {

    async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardsContainers = document.getElementById('books-cards');
        booksCardsContainers.innerHTML = ''; // para asegurrar de que este limpio el contenedor
        books.forEach(book => {
            const div = document.createElement('div');
            console.log(book.imagePath);
            div.className = '',
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:3000/${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>

                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardsContainers.appendChild(div);      //  para agregarlo adentro del container
        })  
    }

    async addANewBook(book){
       await bookService.postBooks(book);        
       this.clearBookForm();
       this.renderBooks();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(){

    }

    deleteBook(){

    }

}

export default UI;