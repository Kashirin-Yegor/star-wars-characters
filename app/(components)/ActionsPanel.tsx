'use client';

import React from 'react';
import { Grid, List, Search } from 'lucide-react';
import { Input, Label, Switch } from '@/shared/ui';
import { observer } from 'mobx-react-lite';
import { useHomeStore } from '@/app/context';

export const ActionsPanel = observer(() => {
  const store = useHomeStore();

  return (
    <>
      {/* Поиск и переключатель вида */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Поиск персонажей..."
            value={store.searchQuery}
            onChange={e => store.handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4" />
          <Switch
            checked={store.isCardView}
            onCheckedChange={value => store.handleChangeCardView(value)}
            id="view-mode"
          />
          <Grid className="w-4 h-4" />
          <Label htmlFor="view-mode" className="text-sm">
            {store.isCardView ? 'Карточки' : 'Список'}
          </Label>
        </div>
      </div>
    </>
  );
});
