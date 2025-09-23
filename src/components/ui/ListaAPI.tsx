"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Personaje = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

type Episodio = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Personaje[];
};

type Props = {
  episodios: Episodio[];
  favoritos: Personaje[];
  onAgregarFavorito: (p: Personaje) => void;
};

export default function ListaAPI({ episodios, favoritos, onAgregarFavorito }: Props) {
  const esFavorito = (id: number) => favoritos.some((fav) => fav.id === id);

  if (episodios.length === 0) {
    return <p className="text-center">No hay episodios disponibles.</p>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-center text-xl font-medium">Lista de Episodios</h1>
      {episodios.map((episodio) => (
        <Card key={episodio.id} className="p-4">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>{episodio.name}</span>
              <span className="text-sm text-muted-foreground">
                {episodio.air_date}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {episodio.characters.map((personaje) => (
                <div
                  key={personaje.id}
                  className="flex flex-col items-center text-center"
                >
                  <Image
                    src={personaje.image}
                    alt={personaje.name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                    unoptimized
                  />
                  <p className="mt-2 text-sm font-medium">{personaje.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {personaje.species} - {personaje.status}
                  </p>
                  <Button
                    variant={esFavorito(personaje.id) ? "secondary" : "default"}
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      onAgregarFavorito(personaje);
                      toast.success(`${personaje.name} añadido a favoritos`);
                    }}
                    disabled={esFavorito(personaje.id)}
                  >
                    {esFavorito(personaje.id)
                      ? "En favoritos"
                      : "Agregar a favoritos"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
