import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
  ) {}

  async findAll() {
    return this.bookModel.find();
  }

  async create(book: Book) {
    return this.bookModel.create(book);
  }

  async update(id: string, book: Book) {
    return this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
