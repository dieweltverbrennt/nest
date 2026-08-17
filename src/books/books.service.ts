import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
  ) {}

  async findAll() {
    return this.bookModel.find();
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async create(book: CreateBookDto) {
    return this.bookModel.create(book);
  }

  async update(id: string, book: CreateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
