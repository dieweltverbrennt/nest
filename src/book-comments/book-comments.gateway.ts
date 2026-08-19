import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import { BookCommentsService } from './book-comments.service';
import { GetAllCommentsDto } from './dto/get-all-comments.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@WebSocketGateway()
export class BookCommentsGateway {
  constructor(private readonly bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('getAllComments')
  getAllComments(data: GetAllCommentsDto) {
    return this.bookCommentsService.findAllBookComment(data.bookId);
  }

  @SubscribeMessage('addComment')
  addComment(data: AddCommentDto) {
    return this.bookCommentsService.create(data.bookId, data.comment);
  }
}
