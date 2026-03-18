import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { initialAccounts, initialClasses } from './data/mockData';
import {
  clearSessionUserId,
  loadStoredAccounts,
  loadStoredClasses,
  loadStoredSessionUserId,
  saveStoredAccounts,
  saveStoredClasses,
  saveStoredSessionUserId,
} from './data/storage';
import {
  Account,
  AuthResult,
  ClassInput,
  Classroom,
  StudentAccountInput,
} from './domain/types';
import { AdminDashboard } from './presentation/screens/Admin/AdminDashboard';
import { LoginScreen } from './presentation/screens/Login/LoginScreen';
import { StudentDashboard } from './presentation/screens/Student/StudentDashboard';

const App = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [classes, setClasses] = useState<Classroom[]>(initialClasses);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const currentUser = accounts.find((account) => account.id === sessionUserId) ?? null;

  useEffect(() => {
    const hydrateAppState = async () => {
      try {
        const [storedAccounts, storedClasses, storedSessionUserId] = await Promise.all([
          loadStoredAccounts(),
          loadStoredClasses(),
          loadStoredSessionUserId(),
        ]);

        setAccounts(storedAccounts ?? initialAccounts);
        setClasses(storedClasses ?? initialClasses);
        setSessionUserId(storedSessionUserId);
      } finally {
        setIsHydrated(true);
      }
    };

    hydrateAppState();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveStoredAccounts(accounts);
  }, [accounts, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveStoredClasses(classes);
  }, [classes, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (sessionUserId) {
      saveStoredSessionUserId(sessionUserId);
      return;
    }

    clearSessionUserId();
  }, [isHydrated, sessionUserId]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (sessionUserId && !currentUser) {
      setSessionUserId(null);
    }
  }, [currentUser, isHydrated, sessionUserId]);

  const handleLogin = (username: string, password: string): AuthResult => {
    const account = accounts.find(
      (item) =>
        item.username.toLowerCase() === username.toLowerCase() && item.password === password,
    );

    if (!account) {
      return {
        success: false,
        message: 'Sai tai khoan hoac mat khau.',
      };
    }

    setSessionUserId(account.id);

    return {
      success: true,
      message: 'Dang nhap thanh cong.',
    };
  };

  const handleLogout = () => {
    setSessionUserId(null);
  };

  const validateClassInput = (input: ClassInput): AuthResult => {
    if (
      !input.code.trim() ||
      !input.name.trim() ||
      !input.instructor.trim() ||
      !input.schedule.trim() ||
      !input.room.trim() ||
      !input.description.trim()
    ) {
      return {
        success: false,
        message: 'Can nhap day du thong tin lop hoc.',
      };
    }

    if (!Number.isInteger(input.capacity) || input.capacity <= 0) {
      return {
        success: false,
        message: 'Si so phai la so nguyen duong.',
      };
    }

    return {
      success: true,
      message: 'Hop le.',
    };
  };

  const handleCreateClass = (input: ClassInput): AuthResult => {
    const validation = validateClassInput(input);

    if (!validation.success) {
      return validation;
    }

    const duplicateCode = classes.some(
      (classroom) => classroom.code.toLowerCase() === input.code.trim().toLowerCase(),
    );

    if (duplicateCode) {
      return {
        success: false,
        message: 'Ma lop da ton tai.',
      };
    }

    const newClass: Classroom = {
      id: `class-${Date.now()}`,
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      instructor: input.instructor.trim(),
      schedule: input.schedule.trim(),
      room: input.room.trim(),
      description: input.description.trim(),
      capacity: input.capacity,
      enrolledStudentIds: [],
    };

    setClasses((previous) => [newClass, ...previous]);

    return {
      success: true,
      message: `Da them lop ${newClass.code}.`,
    };
  };

  const handleUpdateClass = (classId: string, input: ClassInput): AuthResult => {
    const validation = validateClassInput(input);

    if (!validation.success) {
      return validation;
    }

    const targetClass = classes.find((classroom) => classroom.id === classId);

    if (!targetClass) {
      return {
        success: false,
        message: 'Khong tim thay lop hoc can sua.',
      };
    }

    const duplicateCode = classes.some(
      (classroom) =>
        classroom.id !== classId &&
        classroom.code.toLowerCase() === input.code.trim().toLowerCase(),
    );

    if (duplicateCode) {
      return {
        success: false,
        message: 'Ma lop da ton tai o lop khac.',
      };
    }

    if (input.capacity < targetClass.enrolledStudentIds.length) {
      return {
        success: false,
        message: 'Si so moi khong duoc nho hon so sinh vien da dang ky.',
      };
    }

    setClasses((previous) =>
      previous.map((classroom) =>
        classroom.id === classId
          ? {
              ...classroom,
              code: input.code.trim().toUpperCase(),
              name: input.name.trim(),
              instructor: input.instructor.trim(),
              schedule: input.schedule.trim(),
              room: input.room.trim(),
              description: input.description.trim(),
              capacity: input.capacity,
            }
          : classroom,
      ),
    );

    return {
      success: true,
      message: `Da cap nhat lop ${input.code.trim().toUpperCase()}.`,
    };
  };

  const handleCreateStudent = (input: StudentAccountInput): AuthResult => {
    if (!input.fullName.trim() || !input.username.trim() || !input.password.trim()) {
      return {
        success: false,
        message: 'Can nhap day du thong tin sinh vien.',
      };
    }

    if (input.password.trim().length < 6) {
      return {
        success: false,
        message: 'Mat khau sinh vien phai co it nhat 6 ky tu.',
      };
    }

    const duplicateUsername = accounts.some(
      (account) => account.username.toLowerCase() === input.username.trim().toLowerCase(),
    );

    if (duplicateUsername) {
      return {
        success: false,
        message: 'Username da ton tai.',
      };
    }

    const newStudent: Account = {
      id: `student-${Date.now()}`,
      username: input.username.trim().toLowerCase(),
      password: input.password.trim(),
      fullName: input.fullName.trim(),
      role: 'student',
    };

    setAccounts((previous) => [...previous, newStudent]);

    return {
      success: true,
      message: `Da tao tai khoan cho ${newStudent.fullName}.`,
    };
  };

  const handleRegisterClass = (classId: string): AuthResult => {
    if (!currentUser || currentUser.role !== 'student') {
      return {
        success: false,
        message: 'Chi sinh vien moi duoc dang ky lop.',
      };
    }

    const classroom = classes.find((item) => item.id === classId);

    if (!classroom) {
      return {
        success: false,
        message: 'Khong tim thay lop hoc.',
      };
    }

    if (classroom.enrolledStudentIds.includes(currentUser.id)) {
      return {
        success: false,
        message: 'Ban da dang ky lop nay roi.',
      };
    }

    if (classroom.enrolledStudentIds.length >= classroom.capacity) {
      return {
        success: false,
        message: 'Lop hoc da day.',
      };
    }

    setClasses((previous) =>
      previous.map((item) =>
        item.id === classId
          ? {
              ...item,
              enrolledStudentIds: [...item.enrolledStudentIds, currentUser.id],
            }
          : item,
      ),
    );

    return {
      success: true,
      message: `Dang ky thanh cong lop ${classroom.code}.`,
    };
  };

  const handleUnregisterClass = (classId: string): AuthResult => {
    if (!currentUser || currentUser.role !== 'student') {
      return {
        success: false,
        message: 'Chi sinh vien moi duoc huy dang ky.',
      };
    }

    const classroom = classes.find((item) => item.id === classId);

    if (!classroom) {
      return {
        success: false,
        message: 'Khong tim thay lop hoc.',
      };
    }

    if (!classroom.enrolledStudentIds.includes(currentUser.id)) {
      return {
        success: false,
        message: 'Ban chua dang ky lop nay.',
      };
    }

    setClasses((previous) =>
      previous.map((item) =>
        item.id === classId
          ? {
              ...item,
              enrolledStudentIds: item.enrolledStudentIds.filter(
                (studentId) => studentId !== currentUser.id,
              ),
            }
          : item,
      ),
    );

    return {
      success: true,
      message: `Da huy dang ky lop ${classroom.code}.`,
    };
  };

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <StatusBar barStyle="light-content" />
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingTitle}>ClassSign</Text>
          <Text style={styles.loadingText}>Dang tai du lieu local...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentUser) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  if (currentUser.role === 'admin') {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <AdminDashboard
          admin={currentUser}
          classes={classes}
          students={accounts.filter((account) => account.role === 'student')}
          onLogout={handleLogout}
          onCreateStudent={handleCreateStudent}
          onCreateClass={handleCreateClass}
          onUpdateClass={handleUpdateClass}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <StudentDashboard
        student={currentUser}
        classes={classes}
        onLogout={handleLogout}
        onRegister={handleRegisterClass}
        onUnregister={handleUnregisterClass}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: '#3B0713',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  loadingTitle: {
    marginTop: 18,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  loadingText: {
    marginTop: 8,
    color: '#FFECEC',
    fontSize: 15,
  },
});

export default App;
