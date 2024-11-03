'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "../components/mode-toogle"
import Link from "next/link"
import FormLogin from "./formLogin"

export default function Login() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="absolute right-4 top-4">
                <ModeToggle />
            </div>
            <Card className="w-full max-w-sm mx-4">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Entre com e-mail e senha
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormLogin />
                    <div className="text-center text-sm">
                        <Link href="/register" className="text-muted-foreground hover:underline">
                            Não possui conta?
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
