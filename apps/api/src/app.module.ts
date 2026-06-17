import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AttendanceModule } from './attendance/attendance.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ResourcesModule } from './resources/resources.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ScheduleModule } from './schedule/schedule.module';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    AssignmentsModule,
    AnnouncementsModule,
    AttendanceModule,
    InstitutionsModule,
    MessagesModule,
    NotificationsModule,
    ResourcesModule,
    SubmissionsModule,
    EnrollmentsModule,
    ScheduleModule,
    GradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
