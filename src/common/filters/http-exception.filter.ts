import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const status = exception.getStatus();
    const data = exception.getResponse();

    const code =
      typeof data === 'object' && data !== null && 'code' in data
        ? data.code
        : 500;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data,
      code,
    });
  }
}
