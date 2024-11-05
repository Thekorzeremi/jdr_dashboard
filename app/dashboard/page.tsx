'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CharacterProfile from '@/components/CharacterProfile'
import CharacterStats from '@/components/CharacterStats'
import Skills from '@/components/Skills'
import HealthPoints from '@/components/HealthPoints'
import Inventory from '@/components/Inventory'
import Settings from '@/components/Settings'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 relative">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <Tabs defaultValue="profile">
          <TabsContent value="profile">
            <CharacterProfile />
          </TabsContent>
          <TabsContent value="stats">
            <CharacterStats />
          </TabsContent>
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
          <TabsContent value="health">
            <HealthPoints />
          </TabsContent>
          <TabsContent value="inventory">
            <Inventory />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
          <TabsList className="fixed bottom-0 left-0 right-0 grid w-full grid-cols-6 bg-white border-t shadow-lg">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="health">Santé</TabsTrigger>
            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}