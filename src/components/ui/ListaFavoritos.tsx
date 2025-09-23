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
  favoritos: Personaje[];
  onEliminarFavorito: (id: number) => void;
};

export default function ListaFavoritos({ favoritos, onEliminarFavorito }: Props) {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-lg overflow-y-auto p-4">
      <h2 className="text-lg font-bold mb-4 text-center">Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="text-center text-gray-500">No hay favoritos aún.</p>
      ) : (
        <div className="space-y-4">
          {favoritos.map((personaje) => (
            <Card key={personaje.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-base">{personaje.name}</CardTitle>
                <button
                  onClick={() => {
                    onEliminarFavorito(personaje.id);
                    toast.error(`${personaje.name} eliminado de favoritos`);
                  }}
                  className="text-red-500 font-bold text-xs"
                >
                  Quitar
                </button>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Image
                  src={personaje.image}
                  alt={personaje.name}
                  width={120}
                  height={120}
                  className="rounded-lg"
                  unoptimized
                />
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  {personaje.species} - {personaje.status}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
