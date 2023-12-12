"use client"

import React, { MutableRefObject, useContext, useRef, useState } from "react"

export const STATES = {
  CONFIRM: "Confirma",
  SUCCESS: "Exitoso",
  ERROR: "Error",
  DEFAULT: "Info",
}

type NotificationContextType = {
  notification: string
  notificationText: string
  confirm: (text: string, callback: () => void) => void
  success: (text: string) => void
  error: (text: string) => void
  clear: () => void
  callback: MutableRefObject<(() => void) | undefined>
}
const NotificationContext = React.createContext<NotificationContextType | null>(
  null
)

export const NotificationProvider: React.FC<
  React.HTMLAttributes<HTMLElement>
> = ({ children }) => {
  const [notification, setNotification] = useState<string>("")
  const [notificationText, setNotificationText] = useState<string>("")
  const callback = useRef<() => void>();

  const confirm = (text: string, onConfirm: () => void) => {
    setNotificationText(text)
    setNotification(STATES.CONFIRM)
    callback.current = onConfirm
  }

  const success = (text: string) => {
    setNotificationText(text)
    setNotification(STATES.SUCCESS)
    callback.current = undefined
  }
  const error = (text: string) => {
    setNotificationText(text)
    setNotification(STATES.ERROR)
    callback.current = undefined
  }
  const clear = () => {
    setNotificationText("")
    setNotification("")
    callback.current = undefined
  }
  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        clear,
        confirm,
        callback,
        notification,
        notificationText,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)

  if (context === null) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    )
  }
  return context
}
