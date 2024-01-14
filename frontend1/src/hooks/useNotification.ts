import { AlertColor } from '@mui/material'
import React from 'react'
import { AuthContext, Notification } from '../contexts/AuthContext';


interface IShowNotificaiton {
    showNotification: (message: string | null | undefined, severity?: AlertColor, timeout?: number) => void;
    notification: Notification;
}

export const useNotification = (): IShowNotificaiton => {

    const context = React.useContext(AuthContext)

    if (context === null || context === undefined) {
        throw new Error("Auth context not initialized")
    }

    const showNotification = (notifMessage: string | null | undefined, severity: AlertColor = "error", timeout: number = 3000) => {
        const message = notifMessage === undefined? "Unexpected error" : notifMessage;
        context.showNotification({
            message,
            severity,
            timeout
        })
    }

    return {
        notification: context.notification,
        showNotification: showNotification
    }


}
