import Link from 'next/link'
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-grey-400 to-gray-800 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Bienvenue sur JDR Dashboard</h1>
        <h4 className="text-center mb-6">Un ensemble de ressources pour votre session de jeu de rôle</h4>
        {/* <form className="space-y-4">
          <div>
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input id="username" type="text" placeholder="Entrez votre nom d'utilisateur" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Entrez votre email" />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="Entrez votre mot de passe" />
          </div>
          <Link href="/dashboard">
            <Button className="w-full">S'inscrire</Button>
          </Link>
        </form> */}
        {/* <p className="mt-4 text-center text-sm">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </p> */}
        <Link href="/dashboard">
          <Button className="w-full">Commencer</Button>
        </Link>
      </div>
      <p className="text-xs text-white/50 mt-4">© Thekorzeremi 2024 - Made with ❤️</p>
    </div>
  )
}