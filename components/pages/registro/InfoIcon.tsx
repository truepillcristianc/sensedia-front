type InfoIconProps = {
  title: string
  subTitle: string
  icon: React.ReactNode
}
export default function InfoIcon({ title, subTitle, icon }: InfoIconProps) {

  return (
    <div className="flex text-sm gap-3">
      {icon}
      <div className="flex flex-col justify-between">
        <b>{title}</b>
        <p>{subTitle}</p>
      </div>
    </div>
  )
}