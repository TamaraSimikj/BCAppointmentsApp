import React, { FC, PropsWithChildren, useState } from 'react'
import { AlertColor } from '@mui/material';

interface IAuthContext {
    notification: Notification;
    showNotification(notification: Notification): void;
}

export type Notification = {
    message: string | null;
    severity: AlertColor,
    timeout: number
}


const initialState = {
    notification: {
        message: null,
        severity: "error" as AlertColor,
        timeout: 3000
    },
    showNotification: (_: Notification) => null,
}


export const AuthContext = React.createContext<IAuthContext>(initialState)

// const getOIDCConfig = ()

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [notification, setNotification] = useState<Notification>(initialState.notification)

    const showNotification = (notification: Notification) => {
        setNotification({ ...initialState.notification, ...notification })
    }


    return (
        <AuthContext.Provider
            value={{
                notification,
                showNotification
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


