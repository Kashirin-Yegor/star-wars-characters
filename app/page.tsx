'use client';

import { HomeStoreProvider } from './context';

import { Card, CardContent } from '@/shared/ui/Card';
import { ErrorLayout } from '@/app/(components)/ErrorLayout';
import { NotFound } from '@/app/(components)/NotFound';
import { Loader } from '@/app/(components)/Loader';
import { ActionsPanel } from '@/app/(components)/ActionsPanel';
import { Header } from '@/app/(components)/Header';
import { Table } from './(components)/Table';

export default function HomePage() {
  return (
    <HomeStoreProvider>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <Header />
          <CardContent>
            <ActionsPanel />
            <Loader />
            <ErrorLayout />
            <Table />
            <NotFound />
          </CardContent>
        </Card>
      </div>
    </HomeStoreProvider>
  );
}
