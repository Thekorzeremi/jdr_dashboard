'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus } from "lucide-react"
import CharacterProfile from '@/components/CharacterProfile'
import CharacterStats from '@/components/CharacterStats'
import Skills from '@/components/Skills'
import HealthPoints from '@/components/HealthPoints'
import Inventory from '@/components/Inventory'
import Settings from '@/components/Settings'

interface SetupStep {
  title: string;
  component: JSX.Element;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  const [profile, setProfile] = useState({
    name: "",
    population: "",
    ethnicity: "",
    age: "",
    role: "player",
    avatar: "/default-avatar.jpg"
  })

  const [stats, setStats] = useState({
    "Constitution": { groupValue: 0, values: { "Vitalité": 0, "Résistance": 0, "Endurance": 0 } },
    "Habileté": { groupValue: 0, values: { "Force": 0, "Dextérité": 0, "Rapidité": 0 } },
    "Mental": { groupValue: 0, values: { "Acuité": 0, "Raison": 0, "Process": 0 } },
    "Mana": { groupValue: 0, values: { "Réserve": 0, "Puissance": 0, "Maîtrise": 0 } }
  })

  const [skills, setSkills] = useState<Array<any>>([])
  const [inventory, setInventory] = useState<Array<any>>([])

  const ProfileSetup = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nom du personnage</Label>
        <Input 
          id="name" 
          value={profile.name}
          onChange={(e) => setProfile({...profile, name: e.target.value})}
          required 
        />
      </div>
      <div>
        <Label htmlFor="population">Population</Label>
        <Input 
          id="population" 
          value={profile.population}
          onChange={(e) => setProfile({...profile, population: e.target.value})}
          required 
        />
      </div>
      <div>
        <Label htmlFor="ethnicity">Ethnie</Label>
        <Input 
          id="ethnicity" 
          value={profile.ethnicity}
          onChange={(e) => setProfile({...profile, ethnicity: e.target.value})}
          required 
        />
      </div>
      <div>
        <Label htmlFor="age">Âge</Label>
        <Input 
          id="age" 
          type="number" 
          value={profile.age}
          onChange={(e) => setProfile({...profile, age: e.target.value})}
          required 
        />
      </div>
    </div>
  )

  const StatsSetup = (
    <div className="space-y-4">
      {Object.entries(stats).map(([category, data]) => (
        <div key={category} className="p-4 border rounded">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">{category}</h3>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  const newStats = {...stats}
                  newStats[category].groupValue = Math.max(0, data.groupValue - 1)
                  setStats(newStats)
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold">{data.groupValue}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  const newStats = {...stats}
                  newStats[category].groupValue = Math.min(100, data.groupValue + 1)
                  setStats(newStats)
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2 pl-4 border-l-2">
            {Object.entries(data.values).map(([stat, value]) => (
              <div key={stat} className="flex items-center justify-between">
                <Label>{stat}</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newStats = {...stats}
                      newStats[category].values[stat] = Math.max(0, value - 1)
                      setStats(newStats)
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{value}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newStats = {...stats}
                      newStats[category].values[stat] = Math.min(100, value + 1)
                      setStats(newStats)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const SkillsSetup = (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={() => {
          setSkills([...skills, {
            id: Date.now().toString(),
            name: "",
            type: "",
            value: "0",
            description: ""
          }])
        }}
      >
        Ajouter une compétence
      </Button>
      {skills.map((skill, index) => (
        <div key={skill.id} className="p-4 border rounded space-y-2">
          <div>
            <Label>Nom</Label>
            <Input
              value={skill.name}
              onChange={(e) => {
                const newSkills = [...skills]
                newSkills[index].name = e.target.value
                setSkills(newSkills)
              }}
              required
            />
          </div>
          <div>
            <Label>Type</Label>
            <Input
              value={skill.type}
              onChange={(e) => {
                const newSkills = [...skills]
                newSkills[index].type = e.target.value
                setSkills(newSkills)
              }}
              required
            />
          </div>
          <div>
            <Label>Valeur</Label>
            <Input
              type="number"
              value={skill.value}
              onChange={(e) => {
                const newSkills = [...skills]
                newSkills[index].value = e.target.value
                setSkills(newSkills)
              }}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={skill.description}
              onChange={(e) => {
                const newSkills = [...skills]
                newSkills[index].description = e.target.value
                setSkills(newSkills)
              }}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setSkills(skills.filter((_, i) => i !== index))
            }}
          >
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  )

  const InventorySetup = (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={() => {
          setInventory([...inventory, {
            id: Date.now().toString(),
            name: "",
            quantity: "1",
            description: ""
          }])
        }}
      >
        Ajouter un objet
      </Button>
      {inventory.map((item, index) => (
        <div key={item.id} className="p-4 border rounded space-y-2">
          <div>
            <Label>Nom</Label>
            <Input
              value={item.name}
              onChange={(e) => {
                const newInventory = [...inventory]
                newInventory[index].name = e.target.value
                setInventory(newInventory)
              }}
              required
            />
          </div>
          <div>
            <Label>Quantité</Label>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newInventory = [...inventory]
                newInventory[index].quantity = e.target.value
                setInventory(newInventory)
              }}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={item.description}
              onChange={(e) => {
                const newInventory = [...inventory]
                newInventory[index].description = e.target.value
                setInventory(newInventory)
              }}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setInventory(inventory.filter((_, i) => i !== index))
            }}
          >
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  )

  const steps: SetupStep[] = [
    { title: "Profil", component: ProfileSetup },
    { title: "Statistiques", component: StatsSetup },
    { title: "Compétences", component: SkillsSetup },
    { title: "Inventaire", component: InventorySetup }
  ]

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore')
    const hasCharacterData = localStorage.getItem('character')
    
    if (!hasVisited || !hasCharacterData) {
      setIsModalOpen(true)
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

  const handleSaveAll = () => {
    localStorage.setItem('character', JSON.stringify(profile))
    localStorage.setItem('characterStats', JSON.stringify(stats))
    localStorage.setItem('characterSkills', JSON.stringify(skills))
    localStorage.setItem('inventoryItems', JSON.stringify(inventory))

    setIsModalOpen(false)
    window.location.reload()
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configuration initiale - {steps[currentStep].title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {steps[currentStep].component}
            
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Précédent
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSaveAll}
                >
                  Terminer
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  )
}