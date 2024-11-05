'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import DashboardLayout from './DashboardLayout';

const cardData: CardProps[] = [
    {
        label: "Receita Total",
        amount: "R$45.231,89",
        discription: "+20,1% em relação ao mês passado",
        icon: DollarSign
    },
    {
        label: "Assinaturas",
        amount: "+2350",
        discription: "+180,1% em relação ao mês passado",
        icon: Users
    },
    {
        label: "Vendas",
        amount: "+12.234",
        discription: "+19% em relação ao mês passado",
        icon: CreditCard
    },
    {
        label: "Ativos Agora",
        amount: "+573",
        discription: "+201 na última hora",
        icon: Activity
    }
];

const userSalesData: SalesProps[] = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        saleAmount: "+R$1.999,00"
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        saleAmount: "+R$1.999,00"
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        saleAmount: "+R$39,00"
    },
    {
        name: "William Kim",
        email: "will@email.com",
        saleAmount: "+R$299,00"
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        saleAmount: "+R$39,00"
    }
];

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
        <DashboardLayout title="Dashboard">
            <div className="flex flex-col gap-5 w-full p-10">
                <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                    {cardData.map((d, i) => (
                        <Card
                            key={i}
                            amount={d.amount}
                            discription={d.discription}
                            icon={d.icon}
                            label={d.label}
                        />
                    ))}
                </section>
                <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
                    <CardContent>
                        <p className="p-4 font-semibold">Visão geral</p>
                        <BarChart />
                    </CardContent>
                    <CardContent className="flex justify-between gap-4">
                        <section>
                            <p>Vendas Recentes</p>
                            <p className="text-sm text-gray-400">
                                Você fez 265 vendas nesse mês.
                            </p>
                        </section>
                        {userSalesData.map((d, i) => (
                            <SalesCard
                                key={i}
                                email={d.email}
                                name={d.name}
                                saleAmount={d.saleAmount}
                            />
                        ))}
                    </CardContent>
                </section>
            </div>
        </DashboardLayout>
    );
}
