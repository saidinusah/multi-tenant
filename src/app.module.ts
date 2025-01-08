import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { NotificationProcessor } from "./jobs/notification.job";
import { OrganizationModule } from "./organizations/organization.module";
import { RoleModule } from "./roles/roles.module";
import { UserModule } from "./users/user.module";
import { validate } from "./utils/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: process.env.REDIS_PORT as unknown as number,
      },
    }),

    UserModule,
    RoleModule,
    OrganizationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [NotificationProcessor],
})
export class AppModule {}
