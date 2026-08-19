import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  BookComment,
  BookCommentDocument,
} from './schemas/book-comment.schema';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private bookCommentModel: Model<BookCommentDocument>,
  ) {}

  async findAll() {
    return this.bookCommentModel.find();
  }

  async findOne(id: string) {
    const comment = await this.bookCommentModel.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async create(bookId: string, comment: string) {
    return this.bookCommentModel.create({
      bookId: new Types.ObjectId(bookId),
      comment,
    });
  }

  async update(id: string, comment: string) {
    const updatedComment = await this.bookCommentModel.findByIdAndUpdate(
      id,
      { comment },
      { new: true },
    );

    if (!updatedComment) {
      throw new NotFoundException('Comment not found');
    }

    return updatedComment;
  }

  async remove(id: string) {
    const deletedComment = await this.bookCommentModel.findByIdAndDelete(id);

    if (!deletedComment) {
      throw new NotFoundException('Comment not found');
    }

    return deletedComment;
  }

  async findAllBookComment(bookId: string) {
    return this.bookCommentModel.find({
      bookId: new Types.ObjectId(bookId),
    });
  }
}
