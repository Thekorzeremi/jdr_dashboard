'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from 'next/image'

interface Character {
  name: string;
  population: string;
  ethnicity: string;
  age: number;
  role: 'player' | 'admin';
  avatar: string;
}

export default function CharacterProfile() {
  const [character, setCharacter] = useState<Character>({
    name: "John Doe",
    population: "Humain",
    ethnicity: "Caucasien",
    age: 30,
    role: "player",
    avatar: "/default-avatar.jpg"
  })

  const [isOpen, setIsOpen] = useState(false)
  const [editedCharacter, setEditedCharacter] = useState<Character>(character)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedCharacter(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setEditedCharacter(prev => ({ ...prev, role: value as 'player' | 'admin' }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedCharacter(prev => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCharacter(editedCharacter)
    setIsOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profil du Personnage</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Modifier</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier le profil</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label htmlFor="name">Avatar</Label>
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image 
                    src={editedCharacter.avatar}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" value={editedCharacter.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="population">Population</Label>
                <Input id="population" name="population" value={editedCharacter.population} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="ethnicity">Ethnie</Label>
                <Input id="ethnicity" name="ethnicity" value={editedCharacter.ethnicity} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="age">Âge</Label>
                <Input id="age" name="age" type="number" value={editedCharacter.age} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="role">Rôle</Label>
                <Select value={editedCharacter.role} onValueChange={handleSelectChange}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="player">Joueur</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Enregistrer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image 
              src={character.avatar}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <Label>Nom</Label>
          <div className="p-2 bg-gray-100 rounded">{character.name}</div>
        </div>
        <div>
          <Label>Population</Label>
          <div className="p-2 bg-gray-100 rounded">{character.population}</div>
        </div>
        <div>
          <Label>Ethnie</Label>
          <div className="p-2 bg-gray-100 rounded">{character.ethnicity}</div>
        </div>
        <div>
          <Label>Âge</Label>
          <div className="p-2 bg-gray-100 rounded">{character.age}</div>
        </div>
        <div>
          <Label>Rôle</Label>
          <div className="p-2 bg-gray-100 rounded">{character.role === 'player' ? 'Joueur' : 'Admin'}</div>
        </div>
      </div>
    </div>
  )
}