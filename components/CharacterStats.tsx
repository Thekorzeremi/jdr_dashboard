'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from "lucide-react"

interface StatValue {
  [key: string]: number
}

interface GroupData {
  groupValue: number;
  values: StatValue;
}

interface StatsData {
  [key: string]: GroupData;
}

const StatGroup = ({ 
  title, 
  stats, 
  savedData,
  onUpdate 
}: { 
  title: string, 
  stats: string[], 
  savedData?: GroupData,
  onUpdate: (title: string, data: GroupData) => void 
}) => {
  const [groupValue, setGroupValue] = useState<number>(savedData?.groupValue || 0)
  const [values, setValues] = useState<StatValue>(
    savedData?.values || stats.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {})
  )

  useEffect(() => {
    if (JSON.stringify(savedData?.values) !== JSON.stringify(values) || 
        savedData?.groupValue !== groupValue) {
      onUpdate(title, { groupValue, values });
    }
  }, [groupValue, values, title, onUpdate, savedData]);

  const handleChange = (stat: string, increment: number) => {
    setValues(prev => ({
      ...prev,
      [stat]: Math.max(0, Math.min(100, prev[stat] + increment))
    }))
  }

  const handleGroupChange = (increment: number) => {
    setGroupValue(prev => Math.max(0, Math.min(100, prev + increment)))
  }

  return (
    <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">{title}</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleGroupChange(-1)}
            disabled={groupValue <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-bold">{groupValue}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleGroupChange(1)}
            disabled={groupValue >= 100}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat} className="flex items-center justify-between">
            <Label htmlFor={stat.toLowerCase()} className="w-24">{stat}</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleChange(stat, -1)}
                disabled={values[stat] <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold">{values[stat]}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleChange(stat, 1)}
                disabled={values[stat] >= 100}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CharacterStats() {
  const allStats = {
    "Constitution": ["Vitalité", "Résistance", "Endurance"],
    "Habileté": ["Force", "Dextérité", "Rapidité"],
    "Mental": ["Acuité", "Raison", "Process"],
    "Mana": ["Réserve", "Puissance", "Maîtrise"]
  }

  const [statsData, setStatsData] = useState<StatsData>(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('characterStats');
      if (savedStats) {
        return JSON.parse(savedStats);
      }
    }
    return Object.keys(allStats).reduce((acc, key) => ({
      ...acc,
      [key]: {
        groupValue: 0,
        values: allStats[key as keyof typeof allStats].reduce((statAcc, stat) => ({ ...statAcc, [stat]: 0 }), {})
      }
    }), {});
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('characterStats');
    if (savedStats !== JSON.stringify(statsData)) {
      localStorage.setItem('characterStats', JSON.stringify(statsData));
    }
  }, [statsData]);

  const handleGroupUpdate = (title: string, data: GroupData) => {
    setStatsData(prev => {
      const newData = {
        ...prev,
        [title]: data
      };
      return JSON.stringify(newData) !== JSON.stringify(prev) ? newData : prev;
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(allStats).map(([title, stats]) => (
          <StatGroup 
            key={title} 
            title={title} 
            stats={stats} 
            savedData={statsData[title]}
            onUpdate={handleGroupUpdate}
          />
        ))}
      </div>
    </div>
  )
}