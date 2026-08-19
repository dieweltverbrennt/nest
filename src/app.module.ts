import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { BookCommentsModule } from './book-comments/book-comments.module';
import { BookCommentsGatewayModule } from './book-comments/book-comments-gateway.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    BooksModule,
    AuthModule,
    BookCommentsModule,
    BookCommentsGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
