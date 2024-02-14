import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/Products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dunglv:dunglv@cluster0.e47zd98.mongodb.net/',
    ),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
