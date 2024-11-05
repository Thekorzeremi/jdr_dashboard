'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Settings() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Paramètres</h2>
      </div>
      <Button onClick={handleLogout} variant="destructive">
        Se déconnecter
      </Button>
    </div>
  )
}