import React from 'react';
import {Loader2} from "lucide-react";

export const Loader = () => {
    return (
        <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Загрузка персонажей...</span>
        </div>
    );
};