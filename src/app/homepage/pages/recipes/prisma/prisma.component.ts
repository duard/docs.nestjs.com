import { Component, ChangeDetectionStrategy } from "@angular/core";
import { BasePageComponent } from "../../page/page.component";

@Component({
  selector: "app-prisma",
  templateUrl: "./prisma.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismaComponent extends BasePageComponent {
  get dependencies() {
    return `
$ npm install --save prisma prisma-binding`;
  }

  get prismaYaml() {
    return `
endpoint: https://us1.prisma.sh/nest-f6ec12/prisma/dev
datamodel: datamodel.graphql`;
  }

  get datamodelGraphql() {
    return `
type User {
  id: ID! @unique
  name: String!
}`;
  }

  get installGraphCli() {
    return `
$ npm install -g graphql-cli`;
  }

  get graphqlconfigYml() {
    return `
projects:
database:
  schemaPath: src/prisma/prisma-types.graphql
  extensions:
    prisma: prisma.yml
    codegen:
      - generator: prisma-binding
        language: typescript
        output:
          binding: src/prisma/prisma.binding.ts`;
  }

  get prismaService() {
    return `
import { Injectable } from '@nestjs/common';
import { Prisma } from './prisma.binding';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super({
      endpoint: 'https://us1.prisma.sh/nest-f6ec12/prisma/dev',
      debug: false,
    });
  }
}`;
  }

  get prismaModule() {
    return `
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}`;
  }
}
