'use client';
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { createUser } from "@/lib/api";
import { useNotification } from "@/lib/providers/notificationProvider";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

export default function RegistroForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<User>();
  const queryClient = useQueryClient()
  const { success, error } = useNotification()

  return (
    <form onSubmit={handleSubmit((u: User) => {
      createUser(u).then(() => {
        queryClient.invalidateQueries('users');
        success(`Se ha creado el usuario ${u.name} satisfactoriamente.`)
        reset()
        if (onSubmitted) {
          onSubmitted()
        }
      }, () => {
        error(`Error al crear el usuario. Intenta más tarde.`)
      })
    })} autoComplete="new-password" className="border-sgray-25 border px-6 py-8 mb-16 rounded-xl text-sgray-50">
      <div className="uppercase pb-8">Registro</div>
      <div className="flex flex-col justify-between gap-24">
        <div className="flex flex-row justify-between gap-6">
          <div className="flex flex-1 flex-col gap-8">
            <Input label="Nombre completo" required autoComplete="new-password" {...register("name")} />
            <Input label="Correo electónico" required autoComplete="off" {...register("email")} />
            <Input label="Contraseña" type="password" autoComplete="new-password" aria-autocomplete="none" required {...register("password")} />
          </div>
          <div className="flex flex-1 flex-col">
            <Input label="Ciudad" name="city" />

          </div>
        </div>
        <div className="flex gap-4">
          <Button disabled={isSubmitting} role="submit">Registro</Button>
          <Link href="/user" className="my-auto text-xl mx-2 text-spurple" role="button" onClick={() => reset()} >Cancelar</Link>
        </div>
      </div>
    </form>
  )
}