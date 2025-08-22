import React from 'react';
import {Button} from "@/shared/ui";
import {Edit2, Save, X} from "lucide-react";
import {observer} from "mobx-react-lite";
import {useCharacterStore} from "@/app/character/[id]/context";

export const Actions = observer(() => {
    const store = useCharacterStore();
    return (
        <div className="flex space-x-2">
            {store.isEditing ? (
                <>
                    <Button size="sm" onClick={() => store.handleSave()}>
                        <Save className="w-4 h-4 mr-2" /> Сохранить
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => store.handleCancel()}>
                        <X className="w-4 h-4 mr-2" /> Отмена
                    </Button>
                </>
            ) : (
                <Button size="sm" onClick={() => store.handleOnEdit()}>
                    <Edit2 className="w-4 h-4 mr-2" /> Редактировать
                </Button>
            )}
        </div>
    );
});