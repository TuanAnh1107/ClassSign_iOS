import { Account, Classroom } from '../domain/types';

export const initialAccounts: Account[] = [
    {
        id: 'admin-1',
        username: 'admin',
        password: 'admin123',
        fullName: 'Quan tri vien',
        role: 'admin',
    },
    {
        id: 'student-1',
        username: 'sv001',
        password: '123456',
        fullName: 'Nguyen Van A',
        role: 'student',
    },
    {
        id: 'student-2',
        username: 'sv002',
        password: '123456',
        fullName: 'Tran Thi B',
        role: 'student',
    },
];

export const initialClasses: Classroom[] = [
    {
        id: 'class-1',
        code: 'IT3170',
        name: 'Phat trien ung dung di dong',
        instructor: 'TS. Le Minh',
        schedule: 'Thu 2, tiet 1-3',
        room: 'D9-301',
        description: 'Mon hoc tap trung vao React Native va luong phat trien app.',
        capacity: 40,
        enrolledStudentIds: ['student-1'],
    },
    {
        id: 'class-2',
        code: 'IT2030',
        name: 'Co so du lieu',
        instructor: 'PGS. Tran Hieu',
        schedule: 'Thu 4, tiet 4-6',
        room: 'TC-205',
        description: 'Hoc phan nen tang ve mo hinh du lieu va truy van SQL.',
        capacity: 35,
        enrolledStudentIds: [],
    },
];
