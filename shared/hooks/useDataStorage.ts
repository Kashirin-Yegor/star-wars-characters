"use client";

import { useState, useEffect, useCallback } from "react";

export function useDataStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    // при монтировании читаем из localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                setValue(JSON.parse(stored));
            }
        } catch (err) {
            console.error("Could not parse localStorage key:", key, err);
        }
    }, [key]);

    // обёртка для записи
    const saveValue = useCallback(
        (newValue: T) => {
            try {
                setValue(newValue);
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (err) {
                console.error("Failed to save to localStorage:", err);
            }
        },
        [key]
    );

    return [value, saveValue] as const;
}
