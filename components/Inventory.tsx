'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus } from "lucide-react"

interface Item {
  id: string;
  name: string;
  quantity: string;
  description: string;
}

export default function Inventory() {
  const [items, setItems] = useState<Item[]>(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('inventoryItems');
      if (savedItems) {
        return JSON.parse(savedItems);
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)

  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formElements = form.elements as HTMLFormControlsCollection
    const newItem: Item = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: (formElements.namedItem('name') as HTMLInputElement).value,
      quantity: (formElements.namedItem('quantity') as HTMLInputElement).value,
      description: (formElements.namedItem('description') as HTMLTextAreaElement).value
    }

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? newItem : item))
    } else {
      setItems([...items, newItem])
    }

    setIsOpen(false)
    setEditingItem(null)
    form.reset()
  }

  const deleteItem = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const editItem = (item: Item) => {
    setEditingItem(item)
    setIsOpen(true)
  }

    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventaire</h2>
        <div className="space-x-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Modifier' : 'Ajouter'} un objet</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" name="name" defaultValue={editingItem?.name} required />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input id="quantity" name="quantity" type="number" defaultValue={editingItem?.quantity} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
                </div>
                <Button type="submit">{editingItem ? 'Modifier' : 'Ajouter'}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {item.name}
                <div>
                  <Button variant="ghost" size="icon" onClick={() => editItem(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Quantité:</strong> {item.quantity}</p>
              <p><strong>Description:</strong> {item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}