import RegistroForm from "@/components/pages/registro/RegistroForm";
import UsersTable from "@/components/pages/registro/UserTable";

export default function Page() {
  return (
    <div className="bg-white text-sgray-100 px-6 flex justify-center">
      <div className="max-w-[870px] flex-col flex-1 gap-8">
        <span className="text-2xl">Usuarios</span>
        <UsersTable className="py-4" />
        <div className="text-2xl py-8">Registro</div>
        <RegistroForm />
      </div>
    </div>
  )

}