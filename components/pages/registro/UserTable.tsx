'use client';
import Spinner from "@/components/common/spinner";
import Table from "@/components/common/table";
import Trash from "@/components/icons/trash";
import { blockUser, getUsers } from "@/lib/api";
import { useNotification } from "@/lib/providers/notificationProvider";
import clsx from "clsx";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function UsersTable({ className }: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const queryClient = useQueryClient()
  const { isLoading, isError, data } = useQuery('users', getUsers, {
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
  const { success, error, confirm } = useNotification()

  const blockUserMutation = useMutation(blockUser, {
    onSuccess: (_, u) => {
      queryClient.invalidateQueries('users')
      success(`Se eliminó el usuario ${u.name} correctamente.`)
    },
    onError: (_, u) => {
      error(`No se pudo eliminar el usuario ${u.name}. Intente nuevamente.`)
    }
  })

  const bloquear = (u: User) => {
    confirm(`Si continua se eliminará al usuario: ${u.name}. ¿Desea Continuar?`, () => {
      blockUserMutation.mutate(u)
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto h-80 w-full">
        <Spinner className="text-spurple" />
      </div>
    )
  }

  if (isError || data?.length === 0) {
    return (
      <div className="flex justify-center items-center mx-auto h-80 w-full">
        Lo sentimos, no hay resultados disponibles
      </div>)
  }

  return (
    <Table className={clsx(className)}>
      <thead className="text-xs text-sgray-50 uppercase whitespace-nowrap">
        <tr>
          <th scope="col" className="pr-6 py-3">
            Usuario
          </th>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Correo Electrónico
          </th>
          <th scope="col" className="px-6 py-3">
            Dias de la semana
          </th>
          <th scope="col" className="px-6 py-3">
            Posts
          </th>
          <th scope="col" className="px-6 py-3">
            Albums
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data?.map(u => !u.blocked &&
            <tr key={u.id} className="bg-white border-b group">
              <th scope="row" className="pr-6 py-4 font-medium text-sgray flex items-center">
                <div onClick={() => bloquear(u)} className="p-4 mr-2 bg-red-500 rounded-sm text-white group-hover:block hidden animate-bounce">
                  <Trash className="group-hover:block hidden" />
                </div>
                <Link className="underline" href={`/user/${u.id}`}>{u.id}</Link>
              </th>
              <td className="px-6 py-4">
                {u.name}
              </td>
              <td className="px-6 py-4">
                {u.email}
              </td>
              <td className="px-6 py-4">
                {1 + Math.ceil(Math.random() * 4)}
              </td>
              <td className="px-6 py-4">
                {u.posts?.length || 0}
              </td>
              <td className="px-6 py-4">
                {u.albums?.length || 0}
              </td>
            </tr>
          )
        }
      </tbody>

    </Table>
  )
}