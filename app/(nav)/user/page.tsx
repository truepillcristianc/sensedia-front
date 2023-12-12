import UsersTable from "@/components/pages/registro/UserTable";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white text-sgray-100 px-6 flex justify-center">
      <div className="max-w-[870px] flex-col flex-1 gap-8">
        <span className="text-2xl">Usuarios<Link href='/user/new' className="rounded-xl bg-spurple text-white mx-2 my-auto text-center inline-flex gap-2 items-center px-2 py-0">+ <p className="text-sm">Agregar</p></Link></span>
        <UsersTable className="py-4" />
      </div>
    </div>
  )
}