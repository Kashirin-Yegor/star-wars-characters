import React from 'react';
import {Loader2} from "lucide-react";

export const Loader = () => {
    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Загрузка персонажа...</span>
        </div>
    );
};