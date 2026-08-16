import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';

describe('BooksService', () => {
  let service: BooksService;

  const mockBookModel = {
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books = [
        { title: 'Book 1', authors: 'Author 1' },
        { title: 'Book 2', authors: 'Author 2' },
      ];

      mockBookModel.find.mockResolvedValue(books);

      const result = await service.findAll();

      expect(result).toEqual(books);
      expect(mockBookModel.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
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

      mockBookModel.create.mockResolvedValue(book);

      const result = await service.create(book);

      expect(result).toEqual(book);
      expect(mockBookModel.create).toHaveBeenCalledWith(book);
    });
  });

  describe('update', () => {
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

      mockBookModel.findByIdAndUpdate.mockResolvedValue(book);

      const result = await service.update(id, book);

      expect(result).toEqual(book);
      expect(mockBookModel.findByIdAndUpdate).toHaveBeenCalledWith(id, book, {
        new: true,
      });
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      const id = '123';
      const book = {
        title: 'Book 1',
        authors: 'Author 1',
      };

      mockBookModel.findByIdAndDelete.mockResolvedValue(book);

      const result = await service.remove(id);

      expect(result).toEqual(book);
      expect(mockBookModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
});
