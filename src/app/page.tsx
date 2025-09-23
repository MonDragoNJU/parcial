"use client";

import { useEffect, useState } from "react";
import ListaAPI from "@/components/ui/ListaAPI";
import ListaFavoritos from "@/components/ui/ListaFavoritos";
import FormPersonaje from "@/components/ui/FormPersonaje";

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

export default function Home() {
  const [favoritos, setFavoritos] = useState<Personaje[]>([]);
  const [personajes, setPersonajes] = useState<Personaje[]>([]);

  useEffect(() => {
    async function obtenerPersonajes() {
      try {
        const resEpisodio = await fetch("https://rickandmortyapi.com/api/episode/1");
        const episodio = await resEpisodio.json();
        const primerosCinco = episodio.characters.slice(0, 5);
        const ids = primerosCinco.map((url: string) => url.split("/").pop()).join(",");
        const resPersonajes = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
        const datos = await resPersonajes.json();
        const lista: Personaje[] = Array.isArray(datos) ? datos : [datos];
        setPersonajes(lista);
      } catch (error) {
        console.error("Error al cargar personajes:", error);
      }
    }
    obtenerPersonajes();
  }, []);

  const agregarFavorito = (p: Personaje) => {
    if (!favoritos.some((f) => f.id === p.id)) {
      setFavoritos([...favoritos, p]);
    }
  };

  const eliminarFavorito = (id: number) => {
    setFavoritos(favoritos.filter((f) => f.id !== id));
  };

  const agregarRecurso = (recurso: Recurso) => {
    setPersonajes((prev) => [...prev, ...recurso.personajes]);
  };

  return (
    <div>
      <ListaAPI
        personajes={personajes}
        favoritos={favoritos}
        onAgregarFavorito={agregarFavorito}
      />

        <ListaFavoritos
          favoritos={favoritos}
          onEliminarFavorito={eliminarFavorito}
        />

        <div className="border rounded-lg p-4 flex-1">
          <h2 className="text-xl font-bold mb-4 text-center">Agregar Peronajes</h2>
          <FormPersonaje onAgregar={agregarRecurso} />
        </div>
    </div>
  );
}
