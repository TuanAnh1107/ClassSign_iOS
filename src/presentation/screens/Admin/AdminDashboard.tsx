import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    Account,
    AuthResult,
    ClassInput,
    Classroom,
    StudentAccountInput,
} from '../../../domain/types';
import { styles } from './styles';

type AdminDashboardProps = {
    admin: Account;
    classes: Classroom[];
    students: Account[];
    onLogout: () => void;
    onCreateStudent: (input: StudentAccountInput) => AuthResult;
    onCreateClass: (input: ClassInput) => AuthResult;
    onUpdateClass: (classId: string, input: ClassInput) => AuthResult;
};

type ClassFormState = {
    code: string;
    name: string;
    instructor: string;
    schedule: string;
    room: string;
    description: string;
    capacity: string;
};

const emptyClassForm: ClassFormState = {
    code: '',
    name: '',
    instructor: '',
    schedule: '',
    room: '',
    description: '',
    capacity: '40',
};

const emptyStudentForm = {
    fullName: '',
    username: '',
    password: '',
};

export const AdminDashboard = ({
    admin,
    classes,
    students,
    onLogout,
    onCreateStudent,
    onCreateClass,
    onUpdateClass,
}: AdminDashboardProps) => {
    const [classForm, setClassForm] = useState<ClassFormState>(emptyClassForm);
    const [studentForm, setStudentForm] = useState(emptyStudentForm);
    const [editingClassId, setEditingClassId] = useState<string | null>(null);

    const handleClassFieldChange = (field: keyof ClassFormState, value: string) => {
        setClassForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const resetClassForm = () => {
        setClassForm(emptyClassForm);
        setEditingClassId(null);
    };

    const handleSaveClass = () => {
        const result = editingClassId
            ? onUpdateClass(editingClassId, {
                  ...classForm,
                  capacity: Number(classForm.capacity),
              })
            : onCreateClass({
                  ...classForm,
                  capacity: Number(classForm.capacity),
              });

        Alert.alert(result.success ? 'Thanh cong' : 'Loi', result.message);

        if (result.success) {
            resetClassForm();
        }
    };

    const handleEditClass = (classroom: Classroom) => {
        setEditingClassId(classroom.id);
        setClassForm({
            code: classroom.code,
            name: classroom.name,
            instructor: classroom.instructor,
            schedule: classroom.schedule,
            room: classroom.room,
            description: classroom.description,
            capacity: String(classroom.capacity),
        });
    };

    const handleCreateStudent = () => {
        const result = onCreateStudent(studentForm);

        Alert.alert(result.success ? 'Thanh cong' : 'Loi', result.message);

        if (result.success) {
            setStudentForm(emptyStudentForm);
        }
    };

    return (
        <LinearGradient colors={['#2A0A12', '#5F0F2D', '#7A163D']} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.headerCard}>
                        <Text style={styles.badge}>ADMIN PANEL</Text>
                        <Text style={styles.title}>Quan ly lop hoc</Text>
                        <Text style={styles.subtitle}>Dang nhap voi: {admin.fullName}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                            <Text style={styles.logoutButtonText}>Dang xuat</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {editingClassId ? 'Sua thong tin lop' : 'Tao lop hoc moi'}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ma lop"
                            placeholderTextColor="#7A6A6F"
                            value={classForm.code}
                            onChangeText={(value) => handleClassFieldChange('code', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ten lop"
                            placeholderTextColor="#7A6A6F"
                            value={classForm.name}
                            onChangeText={(value) => handleClassFieldChange('name', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Giang vien"
                            placeholderTextColor="#7A6A6F"
                            value={classForm.instructor}
                            onChangeText={(value) => handleClassFieldChange('instructor', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Lich hoc"
                            placeholderTextColor="#7A6A6F"
                            value={classForm.schedule}
                            onChangeText={(value) => handleClassFieldChange('schedule', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phong hoc"
                            placeholderTextColor="#7A6A6F"
                            value={classForm.room}
                            onChangeText={(value) => handleClassFieldChange('room', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Si so toi da"
                            placeholderTextColor="#7A6A6F"
                            keyboardType="number-pad"
                            value={classForm.capacity}
                            onChangeText={(value) => handleClassFieldChange('capacity', value)}
                        />
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Mo ta lop"
                            placeholderTextColor="#7A6A6F"
                            multiline
                            value={classForm.description}
                            onChangeText={(value) => handleClassFieldChange('description', value)}
                        />

                        <TouchableOpacity style={styles.primaryButton} onPress={handleSaveClass}>
                            <Text style={styles.primaryButtonText}>
                                {editingClassId ? 'Luu cap nhat lop' : 'Them lop hoc'}
                            </Text>
                        </TouchableOpacity>

                        {editingClassId ? (
                            <TouchableOpacity style={styles.secondaryButton} onPress={resetClassForm}>
                                <Text style={styles.secondaryButtonText}>Huy sua</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Danh sach lop hoc</Text>
                        {classes.map((classroom) => (
                            <View key={classroom.id} style={styles.classCard}>
                                <Text style={styles.classCode}>{classroom.code}</Text>
                                <Text style={styles.className}>{classroom.name}</Text>
                                <Text style={styles.classMeta}>Giang vien: {classroom.instructor}</Text>
                                <Text style={styles.classMeta}>Lich hoc: {classroom.schedule}</Text>
                                <Text style={styles.classMeta}>Phong: {classroom.room}</Text>
                                <Text style={styles.classMeta}>
                                    Dang ky: {classroom.enrolledStudentIds.length}/{classroom.capacity}
                                </Text>
                                <Text style={styles.classDescription}>{classroom.description}</Text>

                                <TouchableOpacity
                                    style={styles.inlineActionButton}
                                    onPress={() => handleEditClass(classroom)}
                                >
                                    <Text style={styles.inlineActionText}>Sua thong tin</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cap tai khoan sinh vien</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ho va ten"
                            placeholderTextColor="#7A6A6F"
                            value={studentForm.fullName}
                            onChangeText={(value) =>
                                setStudentForm((previous) => ({
                                    ...previous,
                                    fullName: value,
                                }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="#7A6A6F"
                            autoCapitalize="none"
                            value={studentForm.username}
                            onChangeText={(value) =>
                                setStudentForm((previous) => ({
                                    ...previous,
                                    username: value,
                                }))
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mat khau"
                            placeholderTextColor="#7A6A6F"
                            value={studentForm.password}
                            onChangeText={(value) =>
                                setStudentForm((previous) => ({
                                    ...previous,
                                    password: value,
                                }))
                            }
                        />

                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={handleCreateStudent}
                        >
                            <Text style={styles.primaryButtonText}>Them tai khoan sinh vien</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tai khoan sinh vien da cap</Text>
                        {students.map((student) => (
                            <View key={student.id} style={styles.studentCard}>
                                <Text style={styles.studentName}>{student.fullName}</Text>
                                <Text style={styles.studentMeta}>Username: {student.username}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};
