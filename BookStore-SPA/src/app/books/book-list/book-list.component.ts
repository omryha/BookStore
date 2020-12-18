import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BookService } from 'src/app/_services/book.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public books: any;
  public listComplete: any;
  public searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router, private service: BookService, private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getValues();

    this.searchValueChanged.pipe(debounceTime(1000)).subscribe(() => {
      this.search();
    })
  }

  private getValues() {
    this.service.getBooks().subscribe(books => {
      this.books = books;
      this.listComplete = books;
    })
  }

  public addBook() {
    this.router.navigate(['/book']);
  }

  public editBook(bookId: number) {
    this.router.navigate(['/book/' + bookId]);
  }

  public deleteBook(bookId: number) {
    this.confirmationDialogService.confirm('Attention', 'Do you really want to delete this book?').then(() => this.service.deleteBook(bookId).subscribe(() => {
      this.toastr.success('Book was deleted');
      this.getValues();
    },
      err => {
        this.toastr.error('Failed to delete book');
      })).catch(() => '');
  }

  public searchBooks() {
    this.searchValueChanged.next();
  }

  private search() {
    if (this.searchTerm !== '') {
      this.service.searchBooksWithCategory(this.searchTerm).subscribe(book => {
        this.books = book;
      }, error => {
        this.books = [];
      })
    } else {
      this.service.getBooks().subscribe(books => this.books = books);
    }
  }

}
