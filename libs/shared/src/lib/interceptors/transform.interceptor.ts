import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
  statusCode: number;
  message?: string;
  data: any;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private dto: any;

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        if (data.meta) {
          const dataWithMeta: any = plainToInstance(this.dto, data);
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data?.message,
            data: dataWithMeta.data.map((item) => this.transformObjectId(item)),
            meta: dataWithMeta.meta,
          };
        }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message,
          data: this.transformObjectId(plainToInstance(this.dto, data)),
        };
      })
    );
  }

  private transformObjectId(data: any): any {
    if (data?._id) {
      data.id = data._id.toString();
      delete data._id;
      delete data.__v;
    }
    return data;
  }
}
