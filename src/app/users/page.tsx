"use client";

import PageTitle from "@/components/PageTitle";
import DashboardLayout from "../dashboard/DashboardLayout";
import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type User = {
    _id: string
    name: string;
    email: string;
    password?: string;
};

export default function Users() {


    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingUser) {
            try {
                const response = await fetch(`/api/${editingUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editingUser),
                });
                if (!response.ok) {
                    throw new Error("Erro ao atualizar usuário");
                }
                const updatedUser = await response.json();
                setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
                setEditingUser(null);
                setIsDialogOpen(false);
                await fetchUsers();
            } catch (error) {
                setError("Erro ao atualizar usuário");
                console.error("Erro:", error);
            }
        }
    };

    const handleDelete = async (userId: string) => {
        try {
            const response = await fetch(`/api/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Erro ao deletar usuário");
            }
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            setError("Erro ao deletar usuário");
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <DashboardLayout>
            <div className="min-h-screen p-10">
                <div className="container mx-auto p-4 bg-white dark:bg-black text-black dark:text-white">
                    <div className="flex justify-between items-center mb-10">
                        <PageTitle title="Alterar e Editar Usuários" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Editar Usuário</DialogTitle>
                                                    </DialogHeader>
                                                    <form onSubmit={handleSave} className="space-y-4">
                                                        <div>
                                                            <Label htmlFor="name">Nome</Label>
                                                            <Input
                                                                id="name"
                                                                value={editingUser?.name || ''}
                                                                onChange={(e) => setEditingUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="email">Email</Label>
                                                            <Input
                                                                id="email"
                                                                type="email"
                                                                value={editingUser?.email || ''}
                                                                onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="password">Senha</Label>
                                                            <Input
                                                                id="password"
                                                                type="password"
                                                                placeholder="Digite uma nova senha"
                                                                onChange={(e) => setEditingUser(prev => prev ? { ...prev, password: e.target.value } : null)}
                                                            />
                                                        </div>
                                                        <Button type="submit">Salvar</Button>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="outline" size="icon" onClick={() => handleDelete(user._id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout >
    )
}