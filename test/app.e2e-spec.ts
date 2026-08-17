import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

import { BooksController } from '../src/books/books.controller';
import { BooksService } from '../src/books/books.service';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';

describe('BooksController (e2e)', () => {
  let app: INestApplication<App>;

  const mockBooksService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      const books = [
        {
          title: 'Book 1',
          authors: 'Author 1',
        },
        {
          title: 'Book 2',
          authors: 'Author 2',
        },
      ];

      mockBooksService.findAll.mockResolvedValue(books);

      const response = await request(app.getHttpServer())
        .get('/books')
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        data: books,
      });
    });
  });

  describe('GET /books/:id', () => {
    it('should return 404 if book is not found', async () => {
      mockBooksService.findOne.mockRejectedValue(
        new NotFoundException('Book not found'),
      );

      await request(app.getHttpServer()).get('/books/123').expect(404);
    });
  });

  describe('POST /books', () => {
    it('should create a book', async () => {
      const book = {
        title: 'Book 1',
        authors: 'Author 1',
        description: 'Book description',
        favorite: 'false',
        fileCover: 'cover.jpg',
        fileName: 'book.pdf',
        fileBook: 'book.pdf',
      };

      mockBooksService.create.mockResolvedValue(book);

      const response = await request(app.getHttpServer())
        .post('/books')
        .send(book)
        .expect(201);

      expect(response.body).toEqual({
        status: 'success',
        data: book,
      });
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const id = '123';

      const book = {
        title: 'Updated book',
        authors: 'Updated author',
        description: 'Updated description',
        favorite: 'false',
        fileCover: 'updated-cover.jpg',
        fileName: 'updated-book.pdf',
        fileBook: 'updated-book.pdf',
      };

      mockBooksService.update.mockResolvedValue(book);

      const response = await request(app.getHttpServer())
        .put(`/books/${id}`)
        .send(book)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        data: book,
      });
    });
  });

  describe('DELETE /books/:id', () => {
    it('should remove a book', async () => {
      const id = '123';

      const book = {
        title: 'Book 1',
        authors: 'Author 1',
      };

      mockBooksService.remove.mockResolvedValue(book);

      const response = await request(app.getHttpServer())
        .delete(`/books/${id}`)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        data: book,
      });
    });
  });
});
