export class UserEntity {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  role!: string;
  avatar?: string;
  level?: number;
  institutionId?: string;
  facultyId?: string;
  departmentId?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
