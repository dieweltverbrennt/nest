import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private books = [];

  getAll() {
    return this.books;
  }
}
