"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "./button";

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
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center">Personajes Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="text-center text-gray-500">No hay personajes favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritos.map((personaje) => (
            <Card key={personaje.id} className="flex flex-col items-center">
              <CardHeader className="flex justify-between items-center w-full">
                <CardTitle className="text-base">{personaje.name}</CardTitle>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-12 text-xs"
                  onClick={() => {
                    onEliminarFavorito(personaje.id);
                    toast.error(`${personaje.name} eliminado de favoritos`);
                  }}
                >
                  Quitar
                </Button>
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
