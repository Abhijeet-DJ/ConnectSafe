import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HashModule } from './common/hash.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal : true,
      cache : true,
    }),
    MongooseModule.forRootAsync({
      inject : [ConfigService],
      useFactory : (config : ConfigService)=>({
        uri : config.get<string>('MONGO_URI'),
      })
    }),
    HashModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
