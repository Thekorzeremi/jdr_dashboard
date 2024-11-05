'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, Menu } from "lucide-react"
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

interface Skill {
  id: string;
  name: string;
  type: string;
  value: string;
  description: string;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  description: string;
}

interface StatValues {
  [key: string]: number;
}

interface StatCategory {
  groupValue: number;
  values: StatValues;
}

interface Stats {
  Constitution: StatCategory;
  Habileté: StatCategory;
  Mental: StatCategory;
  Mana: StatCategory;
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

  const [stats, setStats] = useState<Stats>({
    "Constitution": { groupValue: 0, values: { "Vitalité": 0, "Résistance": 0, "Endurance": 0 } },
    "Habileté": { groupValue: 0, values: { "Force": 0, "Dextérité": 0, "Rapidité": 0 } },
    "Mental": { groupValue: 0, values: { "Acuité": 0, "Raison": 0, "Process": 0 } },
    "Mana": { groupValue: 0, values: { "Réserve": 0, "Puissance": 0, "Maîtrise": 0 } }
  })

  const [skills, setSkills] = useState<Skill[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [activeTab, setActiveTab] = useState("profile")

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
      {(Object.entries(stats) as [keyof Stats, StatCategory][]).map(([category, data]) => (
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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'profile'
      setActiveTab(hash)
    }

    // Gérer le hash initial
    handleHashChange()

    // Écouter les changements de hash
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
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
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 mt-16">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 h-12 w-12 shadow-sm"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          </Tabs>
        </div>
      </div>

      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Menu</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24"
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveTab("stats")
                  window.location.hash = "stats"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
                  <path d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2.50006 12.0001C2.50006 7.52172 2.50006 5.28255 3.8913 3.8913C5.28255 2.50006 7.52172 2.50006 12.0001 2.50006C16.4784 2.50006 18.7176 2.50006 20.1088 3.8913C21.5001 5.28255 21.5001 7.52172 21.5001 12.0001C21.5001 16.4784 21.5001 18.7176 20.1088 20.1088C18.7176 21.5001 16.4784 21.5001 12.0001 21.5001C7.52172 21.5001 5.28255 21.5001 3.8913 20.1088C2.50006 18.7176 2.50006 16.4784 2.50006 12.0001Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Statistiques
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24"
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveTab("skills")
                  window.location.hash = "skills"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="#ffffff">
                  <path d="M11.5908 14.536C11.1388 14.7038 10.7358 15.0268 10.3317 15.2845C9.48946 15.8216 8.63063 16.4131 7.58474 16.3597C4.46802 16.2004 2 12.3209 2 9.56692C2 5.38782 6.10119 2 11.1603 2C15.7188 2 19.4995 4.75056 20.2031 8.35214C20.4227 9.47603 19.9208 10.1613 19.3027 11.0803L21.3692 13.1287C21.797 13.5528 22.011 13.7649 21.9996 13.9858C21.9881 14.2066 21.7199 14.4234 21.1834 14.8569C20.7141 15.236 20.3205 15.6902 20.3205 16.1249C20.5325 17.5959 21.4196 20.0253 20.4459 21.2837C19.2685 22.8054 16.9884 21.5105 15.6126 20.9801C14.178 20.4271 13.4607 20.1506 12.9795 19.6296C11.8449 18.4013 11.5908 14.536 11.5908 14.536Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.5 18.9999C20.5 18.9999 19 18.4999 18.5 17.4999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 9.01907C14 9.01907 12.1384 9.01907 11.3067 10.3287C11.0575 10.7213 10.6752 11.0693 10.2233 10.9881C9.01847 10.7716 7.65343 9.99767 7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Compétences
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24"
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveTab("health")
                  window.location.hash = "health"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
                  <path d="M19.4626 3.99352C16.7809 2.3486 14.4404 3.01148 13.0344 4.06738C12.4578 4.50033 12.1696 4.7168 12 4.7168C11.8304 4.7168 11.5422 4.50033 10.9656 4.06738C9.55962 3.01148 7.21909 2.3486 4.53744 3.99352C1.01807 6.1523 0.221719 13.2742 8.33953 19.2827C9.88572 20.4272 10.6588 20.9994 12 20.9994C13.3412 20.9994 14.1143 20.4272 15.6605 19.2827C23.7783 13.2742 22.9819 6.1523 19.4626 3.99352Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 9V15M9 12L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Santé
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24"
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveTab("inventory")
                  window.location.hash = "inventory"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
                  <path d="M19 14H20.2389C21.3498 14 22.1831 15.0805 21.9652 16.2386L21.7003 17.6466C21.4429 19.015 20.3127 20 19 20" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 14H3.76113C2.65015 14 1.81691 15.0805 2.03479 16.2386L2.29967 17.6466C2.55711 19.015 3.68731 20 5 20" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M18.2696 10.5L18.7911 15.1967C19.071 18.379 19.211 19.9701 18.2696 20.985C17.3283 22 15.7125 22 12.481 22H11.519C8.2875 22 6.67174 22 5.73038 20.985C4.78901 19.9701 4.92899 18.379 5.20893 15.1967L5.73038 10.4999" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Inventaire
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24"
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveTab("profile")
                  window.location.hash = "profile"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
                  <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Profil
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24"
                onClick={() => {
                  setIsMenuOpen(false)
                  setActiveTab("settings")
                  window.location.hash = "settings"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="#000000" fill="none">
                  <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Paramètres
              </Button>
            </div>
            
            <Button
              variant="destructive"
              className="w-full h-12"
              onClick={() => {
                window.location.href = "/"
              }}
            >
              Déconnexion
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}