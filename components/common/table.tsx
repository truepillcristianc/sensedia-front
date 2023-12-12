import clsx from "clsx"

export default function Table({ children, className }: React.HtmlHTMLAttributes<HTMLDivElement>) {

  return (
    <div className={clsx(className, "relative overflow-x-auto")}>
      <table className="w-full text-sm text-left rtl:text-right text-sgray-50 table-auto break-words">
        {children}
      </table>
    </div>
  )
}