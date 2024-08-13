import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar } from '@vkontakte/vkui';
import { Icon28ErrorCircleOutline } from '@vkontakte/icons';

type SnackbarContextType = {
    openError: (message: string) => void;
    closeSnackbar: () => void;
    snackbar: ReactNode | null;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<ReactNode | null>(null);

    const closeSnackbar = () => setSnackbar(null);

    const openError = (message: string) => {
        if (snackbar) return; // Если уже есть snackbar, не показываем новый
        setSnackbar(
            <Snackbar
                onClose={closeSnackbar}
                before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
            >
                {message}
            </Snackbar>
        );
    };

    return (
        <SnackbarContext.Provider value={{ openError, closeSnackbar, snackbar }}>
            {children}
            {snackbar}
        </SnackbarContext.Provider>
    );
};