import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Classroom } from '../domain/types';

const STORAGE_KEYS = {
    accounts: 'classsign.accounts',
    classes: 'classsign.classes',
    sessionUserId: 'classsign.sessionUserId',
} as const;

const readJson = async <T>(key: string): Promise<T | null> => {
    try {
        const rawValue = await AsyncStorage.getItem(key);

        if (!rawValue) {
            return null;
        }

        return JSON.parse(rawValue) as T;
    } catch (error) {
        console.warn(`Failed to read local storage key: ${key}`, error);
        return null;
    }
};

const writeJson = async <T>(key: string, value: T) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Failed to write local storage key: ${key}`, error);
    }
};

export const loadStoredAccounts = () => readJson<Account[]>(STORAGE_KEYS.accounts);

export const saveStoredAccounts = (accounts: Account[]) =>
    writeJson(STORAGE_KEYS.accounts, accounts);

export const loadStoredClasses = () => readJson<Classroom[]>(STORAGE_KEYS.classes);

export const saveStoredClasses = (classes: Classroom[]) =>
    writeJson(STORAGE_KEYS.classes, classes);

export const loadStoredSessionUserId = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.sessionUserId);
    } catch (error) {
        console.warn('Failed to read local session user id', error);
        return null;
    }
};

export const saveStoredSessionUserId = async (userId: string) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.sessionUserId, userId);
    } catch (error) {
        console.warn('Failed to save local session user id', error);
    }
};

export const clearSessionUserId = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.sessionUserId);
    } catch (error) {
        console.warn('Failed to clear local session user id', error);
    }
};
