'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus } from "lucide-react"

interface Skill {
  id: string;
  name: string;
  type: string;
  value: string;
  description: string;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formElements = form.elements as HTMLFormControlsCollection
    const newSkill: Skill = {
      id: editingSkill ? editingSkill.id : Date.now().toString(),
      name: (formElements.namedItem('name') as HTMLInputElement).value,
      type: (formElements.namedItem('type') as HTMLInputElement).value,
      value: (formElements.namedItem('value') as HTMLInputElement).value,
      description: (formElements.namedItem('description') as HTMLTextAreaElement).value
    }

    if (editingSkill) {
      setSkills(skills.map(skill => skill.id === editingSkill.id ? newSkill : skill))
    } else {
      setSkills([...skills, newSkill])
    }

    setIsOpen(false)
    setEditingSkill(null)
    form.reset()
  }

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id))
  }

  const editSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setIsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Compétences</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSkill(null)}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? 'Modifier' : 'Ajouter'} une compétence</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input id="name" defaultValue={editingSkill?.name} required />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input id="type" defaultValue={editingSkill?.type} required />
              </div>
              <div>
                <Label htmlFor="value">Valeur</Label>
                <Input id="value" type="number" defaultValue={editingSkill?.value} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={editingSkill?.description} required />
              </div>
              <Button type="submit">{editingSkill ? 'Modifier' : 'Ajouter'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {skill.name}
                <div>
                  <Button variant="ghost" size="icon" onClick={() => editSkill(skill)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteSkill(skill.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Type:</strong> {skill.type}</p>
              <p><strong>Valeur:</strong> {skill.value}</p>
              <p><strong>Description:</strong> {skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}