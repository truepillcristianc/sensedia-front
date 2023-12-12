import clsx from "clsx"
import React from "react"
import Spinner from "./spinner"

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-small-regular border transition-colors duration-200 disabled:opacity-50 rounded-full",
        {
          "text-white bg-spurple border-spurple hover:bg-spurple hover:text-white disabled:hover:bg-spurple disabled:hover:text-white":
            variant === "primary",
          "text-spurple bg-transparent border-0 hover:bg-sgray-25":
            variant === "secondary",
        },
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
