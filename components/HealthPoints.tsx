'use client'

import { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface BodyPart {
  name: string;
  maxHealth: number;
  currentHealth: number;
}

const initialBodyParts: BodyPart[] = [
  { name: "Tête", maxHealth: 100, currentHealth: 100 },
  { name: "Torse", maxHealth: 200, currentHealth: 200 },
  { name: "Épaule gauche", maxHealth: 50, currentHealth: 50 },
  { name: "Épaule droite", maxHealth: 50, currentHealth: 50 },
  { name: "Bras gauche", maxHealth: 75, currentHealth: 75 },
  { name: "Bras droit", maxHealth: 75, currentHealth: 75 },
  { name: "Avant-bras gauche", maxHealth: 50, currentHealth: 50 },
  { name: "Avant-bras droit", maxHealth: 50, currentHealth: 50 },
  { name: "Main gauche", maxHealth: 25, currentHealth: 25 },
  { name: "Main droite", maxHealth: 25, currentHealth: 25 },
  { name: "Hanche gauche", maxHealth: 75, currentHealth: 75 },
  { name: "Hanche droite", maxHealth: 75, currentHealth: 75 },
  { name: "Cuisse gauche", maxHealth: 100, currentHealth: 100 },
  { name: "Cuisse droite", maxHealth: 100, currentHealth: 100 },
  { name: "Jambe gauche", maxHealth: 75, currentHealth: 75 },
  { name: "Jambe droite", maxHealth: 75, currentHealth: 75 },
  { name: "Pied gauche", maxHealth: 25, currentHealth: 25 },
  { name: "Pied droit", maxHealth: 25, currentHealth: 25 },
]

export default function HealthPoints() {
  const [bodyParts, setBodyParts] = useState<BodyPart[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHealth = localStorage.getItem('healthPoints');
      if (savedHealth) {
        return JSON.parse(savedHealth);
      }
    }
    return initialBodyParts;
  });

  useEffect(() => {
    localStorage.setItem('healthPoints', JSON.stringify(bodyParts));
  }, [bodyParts]);

  const decrementHealth = (index: number) => {
    const updatedBodyParts = [...bodyParts];
    if (updatedBodyParts[index].currentHealth > 0) {
      updatedBodyParts[index].currentHealth -= 1;
      setBodyParts(updatedBodyParts);
    }
  }

  const getHealthColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 66) return 'bg-green-500';
    if (percentage > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Santé</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="relative w-full max-w-[300px] mx-auto lg:mx-0 aspect-[3/4]">
          <svg viewBox="0 0 100 133" className="w-full h-full">
            <path d="M50 0 L40 10 L40 20 L35 25 L35 40 L30 45 L30 80 L25 85 L25 130 L40 130 L40 85 L45 80 L45 45 L50 40 L55 45 L55 80 L60 85 L60 130 L75 130 L75 85 L70 80 L70 45 L65 40 L65 25 L60 20 L60 10 Z" fill="#e5e7eb" />
            
            <circle cx="50" cy="10" r="4" className={`${getHealthColor(bodyParts[0].currentHealth, bodyParts[0].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(0)} />
            <circle cx="50" cy="30" r="4" className={`${getHealthColor(bodyParts[1].currentHealth, bodyParts[1].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(1)} />
            <circle cx="40" cy="25" r="2.5" className={`${getHealthColor(bodyParts[2].currentHealth, bodyParts[2].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(2)} />
            <circle cx="60" cy="25" r="2.5" className={`${getHealthColor(bodyParts[3].currentHealth, bodyParts[3].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(3)} />
            <circle cx="35" cy="40" r="2.5" className={`${getHealthColor(bodyParts[4].currentHealth, bodyParts[4].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(4)} />
            <circle cx="65" cy="40" r="2.5" className={`${getHealthColor(bodyParts[5].currentHealth, bodyParts[5].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(5)} />
            <circle cx="32" cy="55" r="2.5" className={`${getHealthColor(bodyParts[6].currentHealth, bodyParts[6].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(6)} />
            <circle cx="68" cy="55" r="2.5" className={`${getHealthColor(bodyParts[7].currentHealth, bodyParts[7].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(7)} />
            <circle cx="30" cy="70" r="2.5" className={`${getHealthColor(bodyParts[8].currentHealth, bodyParts[8].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(8)} />
            <circle cx="70" cy="70" r="2.5" className={`${getHealthColor(bodyParts[9].currentHealth, bodyParts[9].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(9)} />
            <circle cx="45" cy="80" r="2.5" className={`${getHealthColor(bodyParts[10].currentHealth, bodyParts[10].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(10)} />
            <circle cx="55" cy="80" r="2.5" className={`${getHealthColor(bodyParts[11].currentHealth, bodyParts[11].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(11)} />
            <circle cx="40" cy="95" r="2.5" className={`${getHealthColor(bodyParts[12].currentHealth, bodyParts[12].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(12)} />
            <circle cx="60" cy="95" r="2.5" className={`${getHealthColor(bodyParts[13].currentHealth, bodyParts[13].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(13)} />
            <circle cx="35" cy="110" r="2.5" className={`${getHealthColor(bodyParts[14].currentHealth, bodyParts[14].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(14)} />
            <circle cx="65" cy="110" r="2.5" className={`${getHealthColor(bodyParts[15].currentHealth, bodyParts[15].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(15)} />
            <circle cx="32" cy="125" r="2.5" className={`${getHealthColor(bodyParts[16].currentHealth, bodyParts[16].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(16)} />
            <circle cx="68" cy="125" r="2.5" className={`${getHealthColor(bodyParts[17].currentHealth, bodyParts[17].maxHealth)} cursor-pointer`} onClick={() => decrementHealth(17)} />
          </svg>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {bodyParts.map((part, index) => (
            <Card key={index} className="hover:bg-gray-50">
              <CardContent className="p-2 text-sm flex flex-col items-center">
                <Label className="font-medium">
                  {part.name}
                </Label>
                <span>
                  {part.currentHealth}/{part.maxHealth}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}