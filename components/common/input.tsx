import { ErrorMessage } from "@hookform/error-message"
import clsx from "clsx"
import React, { useEffect, useImperativeHandle, useState } from "react"
import { get } from "react-hook-form"
import Eye from "../icons/eye"
import EyeOff from "../icons/eye-off"

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, errors, touched, required, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const hasError = get(errors, name) && get(touched, name)

    return (
      <div>
        <div className="relative z-0 w-full text-base-regular">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            className={clsx(
              "pt-4 pb-1 block w-full px-4 mt-0 bg-sgray-10 border-0 border-b-[1px] focus:border-2 appearance-none focus:outline-none focus:ring-0 focus:border-spurple border-sgray-75",
              {
                "border-spurple focus:border-spurple": hasError,
              }
            )}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={clsx(
              "mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500",
              {
                "!text-spurple": hasError,
              }
            )}
          >
            {label}
            {required && <span className="text-spurple">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div className="pt-1 pl-2 text-spurple text-xsmall-regular">
                  <span>{message}</span>
                </div>
              )
            }}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
