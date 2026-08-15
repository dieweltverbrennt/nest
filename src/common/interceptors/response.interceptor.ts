import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data,
      })),

      catchError((error) => {
        return throwError(() => ({
          status: 'fail',
          data: error,
        }));
      }),
    );
  }
}
