"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Personaje = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type Props = {
  personajes: Personaje[];
  favoritos: Personaje[];
  onAgregarFavorito: (p: Personaje) => void;
};

export default function ListaAPI({ personajes, favoritos, onAgregarFavorito }: Props) {
  const esFavorito = (id: number) => favoritos.some((fav) => fav.id === id);

  if (personajes.length === 0) {
    return <p className="text-center">No hay personajes disponibles.</p>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-center">Lista de Personajes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {personajes.map((personaje) => (
          <Card key={personaje.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{personaje.name}</CardTitle>
              <button
                onClick={() => {
                  if (!esFavorito(personaje.id)) {
                    onAgregarFavorito(personaje);
                    toast.success(`${personaje.name} añadido a favoritos`);
                  } else {
                    toast.info(`${personaje.name} ya está en favoritos`);
                  }
                }}
                className="text-2xl"
              >
                {esFavorito(personaje.id) ? "🌟" : "⭐"}
              </button>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src={personaje.image}
                alt={personaje.name}
                width={200}
                height={200}
                className="rounded-lg"
                unoptimized
              />
              <p className="mt-2 text-sm text-muted-foreground">
                {personaje.species} - {personaje.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
