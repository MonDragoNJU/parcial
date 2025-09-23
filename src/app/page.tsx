"use client";

import { useEffect, useState } from "react";
import ListaAPI from "@/components/ui/ListaAPI";
import ListaFavoritos from "@/components/ui/ListaFavoritos";
import FormEpisodio from "@/components/ui/FormEpisodio";

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

export default function Home() {
  const [favoritos, setFavoritos] = useState<Personaje[]>([]);
  const [episodios, setEpisodios] = useState<Episodio[]>([]);

  useEffect(() => {
    async function obtenerEpisodios() {
      try {
        const resEpisodios = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await resEpisodios.json();

        const primerosDiez = data.results.slice(0, 10);
        const episodiosConPersonajes: Episodio[] = [];

        for (const episodio of primerosDiez) {
          const primerosCinco = episodio.characters.slice(0, 5);
          const ids = primerosCinco.map((url: string) => url.split("/").pop()).join(",");

          const resPersonajes = await fetch(
            `https://rickandmortyapi.com/api/character/${ids}`
          );
          const datos = await resPersonajes.json();

          const personajes: Personaje[] = Array.isArray(datos) ? datos : [datos];

          episodiosConPersonajes.push({
            id: episodio.id,
            name: episodio.name,
            air_date: episodio.air_date,
            episode: episodio.episode,
            characters: personajes,
          });
        }

        setEpisodios(episodiosConPersonajes);
      } catch (error) {
        console.error("Error al cargar episodios:", error);
      }
    }

    obtenerEpisodios();
  }, []);

  const agregarFavorito = (personaje: Personaje) => {
    if (!favoritos.some((favorito) => favorito.id === personaje.id)) {
      setFavoritos((prev) => [...prev, personaje]);
    }
  };

  const eliminarFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((favorito) => favorito.id !== id));
  };

  const agregarEpisodio = (episodio: Episodio) => {
    setEpisodios((prev) => [...prev, episodio]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
      <div className="lg:col-span-3">
        <ListaAPI
          episodios={episodios}
          favoritos={favoritos}
          onAgregarFavorito={agregarFavorito}
        />
      </div>

      <div className="lg:col-span-2 flex flex-col gap-6">
        <ListaFavoritos
          favoritos={favoritos}
          onEliminarFavorito={eliminarFavorito}
        />
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-center">Crear Episodio</h2>
          <FormEpisodio onAgregar={agregarEpisodio} />
        </div>
      </div>
    </div>

  );
}
