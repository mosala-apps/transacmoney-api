import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Je suis authetnpm install @nest-middlewares/morgannicated');
    next();
  }
}
