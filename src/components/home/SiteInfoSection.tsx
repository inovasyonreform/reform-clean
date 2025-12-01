"use client";
import useSWR from "swr";
import Image from "next/image";

type SiteInfo = {
  id: number;
  company_name: string;
  slogan: string;
  logo_url: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SiteInfoSection() {
  const { data = [] } = useSWR<SiteInfo[]>("/api/site-info", fetcher);
  const info = data[0];

  if (!info) return null;

  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        {info.logo_url && (
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={info.logo_url}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">{info.company_name}</h3>
        <p className="text-sm text-zinc-400">{info.slogan}</p>
      </div>
    </footer>
  );
}