import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasePageComponent } from '../page/page.component';

@Component({
  selector: 'app-exception-filters',
  templateUrl: './exception-filters.component.html',
  styleUrls: ['./exception-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionFiltersComponent extends BasePageComponent {
  get errorResponse() {
    return `
{
    "statusCode": 500,
    "message": "Internal server error"
}`;
  }

  get createMethod() {
    return `
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
`;
  }

  get createMethodJs() {
    return `
@Post()
@Bind(Body())
async create(createCatDto) {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
`;
  }

  get exceptionObj() {
    return `
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  });
}
`;
  }

  get exceptionObjJs() {
    return `
@Post()
@Bind(Body())
async create(createCatDto) {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  });
}
`;
  }

  get customResponse() {
    return  `
{
    "status": 403,
    "error": "This is a custom message"
}`;
  }

  get forbiddenResponse() {
    return  `
{
    "statusCode": 403,
    "message": "Forbidden"
}`;
  }

  get forbiddenException() {
    return `
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}`;
  }

  get forbiddenCreateMethod() {
    return `
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}`;
  }

  get forbiddenCreateMethodJs() {
    return `
@Post()
@Bind(Body())
async create(createCatDto) {
  throw new ForbiddenException();
}`;
}

  get httpExceptionFilter() {
    return `
import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, response) {
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: \`It's a message from the exception filter\`,
    });
  }
}`;
  }

  get httpExceptionFilterJs() {
    return `
import { Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception, response) {
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: \`It's a message from the exception filter\`,
    });
  }
}`;
  }

  get forbiddenCreateMethodWithFilter() {
    return `
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
`;
  }

  get forbiddenCreateMethodWithFilterJs() {
    return `
@Post()
@UseFilters(new HttpExceptionFilter())
@Bind(Body())
async create(createCatDto) {
  throw new ForbiddenException();
}
`;
  }


  get controllerScopedFilter() {
    return `
@UseFilters(new HttpExceptionFilter())
export class CatsController {}`;
  }

  get globalScopedFilter() {
    return `
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
`;
  }
}