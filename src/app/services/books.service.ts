import { Injectable } from '@angular/core';
import {Book} from '../models/Book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // attention: bien générer books avec = []
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    // idem PUT -> écrase base existante
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    // le callback permet de mettre à jour en temps réel
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number) {
    // pour un livre pas besoin de callback comme en getBooks
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books' + id)
          .once('value')
          .then( (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
            }
          );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove);
    this.saveBooks();
    this.emitBooks();
  }
}