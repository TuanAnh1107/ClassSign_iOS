import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        padding: 18,
        paddingBottom: 40,
    },
    headerCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 24,
        padding: 20,
        marginBottom: 18,
    },
    badge: {
        color: '#9BE7FF',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.6,
        marginBottom: 8,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        color: '#D4F3FF',
        fontSize: 15,
        marginBottom: 6,
    },
    summary: {
        color: '#C2F1FF',
        fontSize: 14,
        marginBottom: 14,
    },
    logoutButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#9BE7FF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 999,
    },
    logoutButtonText: {
        color: '#073642',
        fontWeight: '700',
    },
    classCard: {
        backgroundColor: '#F2FBFD',
        borderRadius: 22,
        padding: 18,
        marginBottom: 14,
    },
    classCode: {
        color: '#0B7285',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 6,
    },
    className: {
        color: '#083344',
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 10,
    },
    classMeta: {
        color: '#20535E',
        fontSize: 14,
        marginBottom: 4,
    },
    classDescription: {
        color: '#1D4B57',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
    },
    primaryButton: {
        backgroundColor: '#007991',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 14,
    },
    disabledButton: {
        backgroundColor: '#8FBCC5',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#007991',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 14,
    },
    secondaryButtonText: {
        color: '#007991',
        fontSize: 16,
        fontWeight: '700',
    },
});
