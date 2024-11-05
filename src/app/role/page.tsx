'use client';

import DashboardLayout from "../dashboard/DashboardLayout";
import { useState, useEffect } from 'react';
import { User, UserCog } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type User = {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
};

export default function Role() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api');
            if (!response.ok) {
                throw new Error("Erro ao buscar usuários");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError("Erro ao carregar os usuários");
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (userId: string, newRole: 'user' | 'admin') => {
        try {
            const response = await fetch(`/api/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            if (!response.ok) {
                throw new Error("Erro ao atualizar a role");
            }
            const updatedUser = await response.json();

            setUsers(users.map(user => user._id === userId ? { ...user, role: updatedUser.user.role } : user));
        } catch (error) {
            setError("Erro ao atualizar a role");
            console.error("Erro:", error);
        }
    };

    const toggleRole = (userId: string) => {
        const user = users.find(user => user._id === userId);
        if (user) {
            const newRole = user.role === 'user' ? 'admin' : 'user';
            updateRole(userId, newRole);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Carregando usuários...</p>;
    if (error) return <p>{error}</p>;

    return (
        <DashboardLayout title="Gerenciamento de Roles de Usuários">
            <div className="min-h-screen p-10">
                <div className="container mx-auto p-4 bg-white dark:bg-black text-black dark:text-white">                    
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.role === 'admin' ? (
                                            <span className="flex items-center">
                                                <UserCog className="mr-2 h-4 w-4" />
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                Usuário
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className="mr-2">{user.role === 'user' ? 'Usuário' : 'Admin'}</span>
                                            <Switch
                                                checked={user.role === 'admin'}
                                                onCheckedChange={() => toggleRole(user._id)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
}