'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        } else {
            console.log('Token:', token);
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>Bem-vindo ao Dashboard</div>
    );
}
