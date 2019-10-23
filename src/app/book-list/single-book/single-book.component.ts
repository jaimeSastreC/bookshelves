import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, // récupérer identifiant de l'url
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    // book vide en attendant qu'il charge, sinon erreur d'affichage
    this.book = new Book('', '');
    // récupérer l'identifiant
    const id = this.route.snapshot.params['id'];
    // cast number +
    this.booksService.getSingleBook(+id)
      .then( (book: Book) => {
        this.book = book;
        }
      );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
