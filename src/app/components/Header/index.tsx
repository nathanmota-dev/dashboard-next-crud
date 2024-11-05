'use client';

import { useState, useEffect } from 'react';
import { ModeToggle } from '../mode-toogle';
import PageTitle from '@/components/PageTitle';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar perfil do usuário");
                }

                const data = await response.json();
                setUserName(data.name);
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <header className="bg-white dark:bg-black text-black dark:text-white shadow-md">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <PageTitle title={title} />
                <div className="flex items-center">
                    <div className="px-4">
                        <ModeToggle />
                    </div>
                    {userName && (
                        <>
                            <span className="text-black dark:text-white mr-4">{userName}</span>
                            <div className="h-10 w-10 rounded-full  text-white bg-yellow-400 dark:text-black flex items-center justify-center font-bold">
                                {userName[0].toUpperCase()}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
