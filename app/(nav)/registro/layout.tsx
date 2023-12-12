import Ball from "@/components/icons/ball"
import Cup from "@/components/icons/cup"
import Stats from "@/components/icons/stats"
import InfoIcon from "@/components/pages/registro/InfoIcon"

export default function Layout({ children }: React.HtmlHTMLAttributes<HTMLDivElement>) {

  const infoIcons = [{ title: 'Tipo de cancha', subTitle: 'sociedad', icon: <Ball /> },
  { title: 'Nivel', subTitle: 'semiprofesional', icon: <Stats /> },
  { title: 'Victorias', subTitle: '345', icon: <Cup /> }]

  return (
    <>
      <div className="bg-spurple text-white flex justify-center">
        <div className="max-w-[870px] flex py-6 flex-1 gap-8">
          {infoIcons.map((info, i) =>
            <InfoIcon key={i} title={info.title} subTitle={info.subTitle} icon={info.icon} />
          )}
        </div>
      </div>
      {children}
    </>
  )
}