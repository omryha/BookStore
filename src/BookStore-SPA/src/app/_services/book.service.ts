import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../_models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = environment.baseUrl + 'api/';

  constructor(private http: HttpClient) {
  }

  public addBook(book: Book) {
    return this.http.post(this.baseUrl + 'books', book);
  }

  public updateBook(id: number, book: Book) {
    return this.http.put(this.baseUrl + 'books/' + id, book);
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books');
  }

  public getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id);
  }

  public deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'books/' + id);
  }

  public searchBooksWithCategory(searchValue: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}books/search-book-with-category/${searchValue}`);
  }
}
