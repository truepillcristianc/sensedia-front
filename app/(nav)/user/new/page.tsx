'use client'
import RegistroForm from "@/components/pages/registro/RegistroForm";
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <div className="bg-white text-sgray-100 px-6 flex justify-center">
      <div className="max-w-[870px] flex-col flex-1 gap-8">
        <div className="text-2xl py-8">Registro</div>
        <RegistroForm onSubmitted={() => router.back()} />
      </div>
    </div>
  )
}