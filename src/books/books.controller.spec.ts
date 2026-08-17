import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  const mockBooksService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    app = module.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());

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

      expect(mockBooksService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by id', async () => {
      const id = '123';

      const book = {
        title: 'Book 1',
        authors: 'Author 1',
      };

      mockBooksService.findOne.mockResolvedValue(book);

      const response = await request(app.getHttpServer())
        .get(`/books/${id}`)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        data: book,
      });

      expect(mockBooksService.findOne).toHaveBeenCalledWith(id);
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

      expect(mockBooksService.create).toHaveBeenCalledWith(book);
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

      expect(mockBooksService.update).toHaveBeenCalledWith(id, book);
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

      expect(mockBooksService.remove).toHaveBeenCalledWith(id);
    });
  });
});
