export type UserRole = 'admin' | 'student';

export type Account = {
    id: string;
    username: string;
    password: string;
    fullName: string;
    role: UserRole;
};

export type Classroom = {
    id: string;
    code: string;
    name: string;
    instructor: string;
    schedule: string;
    room: string;
    description: string;
    capacity: number;
    enrolledStudentIds: string[];
};

export type AuthResult = {
    success: boolean;
    message: string;
};

export type StudentAccountInput = {
    fullName: string;
    username: string;
    password: string;
};

export type ClassInput = {
    code: string;
    name: string;
    instructor: string;
    schedule: string;
    room: string;
    description: string;
    capacity: number;
};
