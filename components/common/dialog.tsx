'use client';
import { STATES, useNotification } from "@/lib/providers/notificationProvider"
import { Transition, Dialog as BaseDialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react"

export default function Dialog() {
  const { notification, notificationText, clear, callback } = useNotification()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (notification != "" && notificationText != "") {
      setVisible(true)
      if (notification != STATES.CONFIRM) {
        setTimeout(() => {
          setVisible(false)
          clear()
        }, 3000)
      }
    }
  }, [notification, notificationText])

  const closeModal = () => {
    setVisible(false)
    clear()
  }

  return (
    <Transition appear show={visible} as={Fragment}>
      <BaseDialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <BaseDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <BaseDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {notification}
                </BaseDialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {notificationText}
                  </p>
                </div>
                {notification === STATES.CONFIRM && (
                  <div className="mt-4 flex justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-spurple px-4 py-2 text-sm font-medium text-white hover:bg-spurple focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={callback.current}
                    >
                      Continuar
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sgray-25 px-4 py-2 text-sm font-medium text-sgray hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition>
  )
}