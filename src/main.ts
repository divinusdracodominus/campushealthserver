import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';

async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync(__dirname + '/../ssl/philosophism.org-key.pem');
  const certFile = fs.readFileSync(__dirname + '/../ssl/philosophism.org.pem');

  const httpsapp = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }});

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });

  app.use(json({ limit: '10mb' }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(80);
}

bootstrap();
