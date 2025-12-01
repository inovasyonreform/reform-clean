"use client";
import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

type TeamMember = {
  id: number;
  name: string;
  title: string;
  image_url: string;
};

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then(setMembers);
  }, []);

  // InfiniteMovingCards için uygun formata dönüştür
  const items = members.map((m) => ({
    quote: m.title,      // ✅ quote alanına görev/unvan
    name: m.name,        // ✅ isim
    title: m.title,      // ✅ görev/unvan
    image_url: m.image_url, // ✅ görsel linki
  }));

  return (
    <section className="py-12 bg-neutral-950 text-white">
      <h2 className="text-center text-3xl font-bold text-red-600 mb-8">
        Ekibimiz
      </h2>
      <InfiniteMovingCards
        items={items}
        direction="left"
        speed="normal"
        pauseOnHover={true}
        className="mx-auto"
      />
    </section>
  );
}