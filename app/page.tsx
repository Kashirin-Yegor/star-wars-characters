"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { Card, CardContent } from "@/shared/ui/Card";
import { observer, useLocalObservable } from "mobx-react-lite";
import { HomeStore } from "./store";
import {ErrorLayout} from "@/app/(components)/ErrorLayout";
import {NotFound} from "@/app/(components)/NotFound";
import {Loader} from "@/app/(components)/Loader";
import {ActionsPanel} from "@/app/(components)/ActionsPanel";
import {Header} from "@/app/(components)/Header";
import {Table} from "@/app/(components)/Table/Table";

function HomePage() {
  const store = useLocalObservable(() => new HomeStore());

  useEffect(() => {
    store.fetchCharacters();
  }, [store.currentPage, store.searchQuery]);


  return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <Header />
          <CardContent>
            <ActionsPanel />

            {/* Загрузка */}
            {store.loading && <Loader />}

            {/* Ошибка */}
            {store.error && <ErrorLayout />}

            {/* Персонажи */}
            <Table />

            {/* Нет результатов */}
            {!store.loading && !store.error && store.characters.length === 0 && <NotFound />}
          </CardContent>
        </Card>
      </div>
  );
}

export default observer(HomePage)