import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthResult } from '../../../domain/types';
import { useLoginViewModel } from './useLoginViewModel';
import { styles } from './styles';

type LoginScreenProps = {
    onLogin: (username: string, password: string) => AuthResult;
};

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
    const { username, setUsername, password, setPassword, errorMessage, handleLogin } =
        useLoginViewModel(onLogin);

    return (
        <LinearGradient
            colors={['#5A0000', '#A71D31', '#D7263D']}
            style={styles.gradientContainer}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.formContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../../assets/image/hust-logo.png')}
                            style={styles.logo}
                        />
                    </View>

                    <Text style={styles.title}>ClassSign</Text>
                    <Text style={styles.description}>
                        He thong dang ky hoc tap voi giao dien rieng cho admin va sinh vien
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Tai khoan"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        placeholderTextColor="#666"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Mat khau"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#666"
                    />

                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Dang nhap</Text>
                    </TouchableOpacity>

                    <View style={styles.helperCard}>
                        <Text style={styles.helperTitle}>Tai khoan mau</Text>
                        <Text style={styles.helperText}>Admin: admin / admin123</Text>
                        <Text style={styles.helperText}>Sinh vien: sv001 / 123456</Text>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};
