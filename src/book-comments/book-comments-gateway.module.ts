import { Module } from '@nestjs/common';

import { BookCommentsModule } from './book-comments.module';
import { BookCommentsGateway } from './book-comments.gateway';

@Module({
  imports: [BookCommentsModule],
  providers: [BookCommentsGateway],
})
export class BookCommentsGatewayModule {}
