import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Account, AuthResult, Classroom } from '../../../domain/types';
import { styles } from './styles';

type StudentDashboardProps = {
    student: Account;
    classes: Classroom[];
    onLogout: () => void;
    onRegister: (classId: string) => AuthResult;
    onUnregister: (classId: string) => AuthResult;
};

export const StudentDashboard = ({
    student,
    classes,
    onLogout,
    onRegister,
    onUnregister,
}: StudentDashboardProps) => {
    const registeredCount = classes.filter((classroom) =>
        classroom.enrolledStudentIds.includes(student.id),
    ).length;

    const handleRegister = (classId: string) => {
        const result = onRegister(classId);
        Alert.alert(result.success ? 'Thanh cong' : 'Loi', result.message);
    };

    const handleUnregister = (classId: string) => {
        const result = onUnregister(classId);
        Alert.alert(result.success ? 'Thanh cong' : 'Loi', result.message);
    };

    return (
        <LinearGradient colors={['#021B2B', '#004E64', '#007991']} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.headerCard}>
                        <Text style={styles.badge}>STUDENT PORTAL</Text>
                        <Text style={styles.title}>Dang ky lop hoc</Text>
                        <Text style={styles.subtitle}>Xin chao, {student.fullName}</Text>
                        <Text style={styles.summary}>So lop da dang ky: {registeredCount}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                            <Text style={styles.logoutButtonText}>Dang xuat</Text>
                        </TouchableOpacity>
                    </View>

                    {classes.map((classroom) => {
                        const isRegistered = classroom.enrolledStudentIds.includes(student.id);
                        const seatsLeft =
                            classroom.capacity - classroom.enrolledStudentIds.length;
                        const isFull = seatsLeft <= 0;

                        return (
                            <View key={classroom.id} style={styles.classCard}>
                                <Text style={styles.classCode}>{classroom.code}</Text>
                                <Text style={styles.className}>{classroom.name}</Text>
                                <Text style={styles.classMeta}>
                                    Giang vien: {classroom.instructor}
                                </Text>
                                <Text style={styles.classMeta}>Lich hoc: {classroom.schedule}</Text>
                                <Text style={styles.classMeta}>Phong: {classroom.room}</Text>
                                <Text style={styles.classMeta}>Cho trong: {seatsLeft}</Text>
                                <Text style={styles.classDescription}>{classroom.description}</Text>

                                {isRegistered ? (
                                    <TouchableOpacity
                                        style={styles.secondaryButton}
                                        onPress={() => handleUnregister(classroom.id)}
                                    >
                                        <Text style={styles.secondaryButtonText}>
                                            Huy dang ky
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.primaryButton,
                                            isFull && styles.disabledButton,
                                        ]}
                                        disabled={isFull}
                                        onPress={() => handleRegister(classroom.id)}
                                    >
                                        <Text style={styles.primaryButtonText}>
                                            {isFull ? 'Lop da day' : 'Dang ky lop'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};
