class BookService {
    constructor () {
        this.URI = 'http://localhost:3000/api/books';
    }

    async getBooks() {
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;
    }

    async postBooks(book) {
        const res = await fetch(this.URI, {
            method: 'POST',     // no se coloca el content type, ya que se esta enviando una imagen tbm, no solo json
            body: book
        });

        const data = await res.json();  // la respuesta del servidor es la misma data que esta enviando
      //  console.log(data);
    }

    async deleteBooks(bookId) {
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await res.json();
    //    console.log(data);
    }

}

module.exports = BookService;