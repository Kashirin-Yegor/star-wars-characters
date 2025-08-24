"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ArrowLeft } from "lucide-react";
import {observer, } from "mobx-react-lite";
import {Card} from "./(components)"
import {CharacterStoreProvider} from "@/app/character/[id]/context";
import {useParams} from "next/navigation";

function CharacterPage() {
  const router = useRouter();
  const params = useParams();
  const characterId = Number(params?.id);

  return (
      <CharacterStoreProvider characterId={characterId}>
          <div className="container mx-auto px-4 py-8">
              <Button onClick={() => router.push("/")} className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Назад к списку
              </Button>

              <Card />
          </div>
      </CharacterStoreProvider>
  );
}

export default observer(CharacterPage)