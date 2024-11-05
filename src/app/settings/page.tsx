"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

type Props = {};

interface Setting {
    category: string;
    value: string | number | boolean;
}

const columns: ColumnDef<Setting>[] = [
    {
        accessorKey: "category",
        header: "Categoria"
    },
    {
        accessorKey: "value",
        header: "Valor"
    }
];
const data: Setting[] = [
    {
        category: "Conta",
        value: "Sim"
    },
    {
        category: "Notificações",
        value: "Sim"
    },
    {
        category: "Idioma",
        value: "Português"
    },
    {
        category: "Tema",
        value: "Dark"
    }
];

export default function SettingsPage({ }: Props) {
    return (
        <DashboardLayout title="Configurações" >
            <div className="min-h-screen p-10">
                <div className="container mx-auto p-4 bg-white dark:bg-black text-black dark:text-white">                    
                    <div>
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}