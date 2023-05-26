import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error?.status === 'error') {
          return throwError(
            new HttpException(
              {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message,
              },
              HttpStatus.BAD_REQUEST
            )
          );
        }
        return throwError(error);
      })
    );
  }
}
