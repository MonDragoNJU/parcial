"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const esquema = z.object({
  titulo: z
    .string()
    .min(6, { message: "El título debe tener mínimo 6 caracteres" }),
  personajes: z
    .string()
    .regex(/^\d+(-\d+)*$/, {
      message: "Formato inválido. Ejemplo válido: 1-2-35-12-15",
    }),
});

type Formulario = z.infer<typeof esquema>;

type Personaje = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type Recurso = {
  id: number;
  titulo: string;
  personajes: Personaje[];
  fecha: string;
};

export default function FormPersonaje({
  onAgregar,
}: {
  onAgregar: (r: Recurso) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Formulario>({
    resolver: zodResolver(esquema),
    mode: "onChange",
  });

  const onSubmit = async (data: Formulario) => {
    try {
      const ids = data.personajes.split("-").join(",");
      const res = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
      if (!res.ok) throw new Error("Error al traer personajes");

      const personajes = await res.json();

      const listaPersonajes: Personaje[] = Array.isArray(personajes)
        ? personajes
        : [personajes];

      const nuevoRecurso: Recurso = {
        id: Date.now(),
        titulo: data.titulo,
        personajes: listaPersonajes,
        fecha: new Date().toISOString(),
      };

      onAgregar(nuevoRecurso);
      toast.success("Personajes agregados a la lista principal");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los personajes");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Titulo</label>
        <input
          {...register("titulo")}
          className="w-full border rounded px-3 py-2"
          placeholder="Escribe el título"
        />
        {errors.titulo && (
          <p className="text-red-500 text-sm">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Personajes</label>
        <input
          {...register("personajes")}
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: 1-2-35"
        />
        {errors.personajes && (
          <p className="text-red-500 text-sm">{errors.personajes.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Crear
      </button>
    </form>
  );
}
