'use client'
import Button from "@/components/common/button";
import Spinner from "@/components/common/spinner";
import UserDetail from "@/components/pages/usuario/UserDetail";
import { getUserById } from "@/lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export default function Page() {
  const { username } = useParams()

  const { data, isLoading, isError } = useQuery(`user:${username}`, () => getUserById(username as string), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto h-80 w-full">
        <Spinner className="text-spurple" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col gap-14 justify-center items-center mx-auto h-80 w-full text-xl text-white">
        Lo sentimos, no hay resultados disponibles.
        <Link href="/user">
          <Button>Volver</Button>
        </Link>
      </div>)
  }

  return (
    <div className="bg-white text-sgray-100 min-h-[60vh] px-6 flex justify-center">
      <div className="max-w-[870px] h-full flex-col flex-1 gap-8">
        <div className="text-2xl py-8">{data.name}</div>
        <UserDetail user={data} />
      </div>
    </div>
  )
}