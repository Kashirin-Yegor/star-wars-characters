"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";
import { ArrowLeft } from "lucide-react";
import {observer, } from "mobx-react-lite";
import {Card} from "./(components)"
import {CharacterStoreProvider} from "@/app/character/[id]/context";

function CharacterPage() {
  const router = useRouter();

  return (
      <CharacterStoreProvider>
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