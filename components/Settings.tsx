'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Settings() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      // Supprimer toutes les données du localStorage
      localStorage.clear(); // Supprime tout le localStorage
      
      // Rediriger vers la page d'accueil
      router.push('/');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Paramètres</h2>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Zone de danger</h3>
          <div className="space-y-4">
            <div>
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="w-full border-yellow-500 text-yellow-700 hover:bg-yellow-100"
              >
                Réinitialiser toutes les données
              </Button>
              <p className="text-sm text-yellow-600 mt-2">
                Cette action effacera toutes vos données (profil, stats, compétences, inventaire, etc.)
              </p>
            </div>
            <div>
              <Button 
                onClick={handleLogout} 
                variant="destructive" 
                className="w-full"
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
            <Link href="https://github.com/Thekorzeremi/jdr_dashboard/issues">
                <Button variant="outline" className="w-full">
                    Reporter un bug
                </Button>
            </Link>
        </div>
        <div className="text-center">
            <p className="text-xs text-black/50 mt-4">© Thekorzeremi 2024 - Made with ❤️</p>
        </div>
      </div>
    </div>
  )
}