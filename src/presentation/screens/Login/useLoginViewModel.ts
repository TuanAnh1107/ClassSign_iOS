import { useState } from 'react';
import { AuthResult } from '../../../domain/types';

export const useLoginViewModel = (
    onLogin: (username: string, password: string) => AuthResult,
) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        const result = onLogin(username.trim(), password);

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }

        setErrorMessage('');
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        errorMessage,
        handleLogin,
    };
};
