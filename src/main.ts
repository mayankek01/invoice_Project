import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payload to DTO class instances
      whitelist: true, // Strip any properties that don't have decorators
      forbidNonWhitelisted: true, // Throw an error if payload has non-whitelisted properties
      validationError: { target: false }, // Include the target (class) in the validation error response
    }),
  );

  

  await app.listen(3000);

  
}
bootstrap();
