import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stats from './components/Stats';
import DamageZones from './components/DamageZones';
import Skills from './components/Skills';
import Inventory from './components/Inventory';
import Profile from './components/Profile';
import BottomNavBar from './components/BottomNavBar';

function App() {
  const initialCharacterData = () => {
    const savedData = localStorage.getItem('characterData');
    return savedData
      ? JSON.parse(savedData)
      : {
          profile: { "Nom : ": "Nom", "Population : ": "0", "Ethnie : ": "0", "Âge : ": 1, "Rôle : ": "Aucun" },
          stats: { 
            "Constitution": 0, 
            "Vitalité": 0,
            "Resistance": 0,
            "Endurance": 0,
            "Habilité": 0,
            "Force": 0,
            "Dex": 0,
            "Rapidité": 0,
            "Mental": 0,
            "Acuité": 0,
            "Raison": 0,
            "Process": 0,
            "Mana": 0,
            "Réserve": 0,
            "Puissance": 0,
            "Maitrise": 0 
          },
          health: { 
            max: 100, 
            current: 80 
          },
          skills: [
            { 
              name: 'Compétence 1', 
              level: 2 
            }
          ],
          inventory: [
            { 
              name: 'Épée', 
              quantity: 1 
            }
          ],
          damageZones: { 
            head: 5, 
            torso: 5, 
            leftShoulder: 0,
            rightShoulder: 0,
            leftArm: 0,
            rightArm: 0,
            leftForearm: 0,
            rightForearm: 0,
            leftHand: 0,
            rightHand: 0,
            leftHip: 0,
            rightHip: 0,
            leftThigh: 0,
            rightThigh: 0,
            leftLeg: 0,
            rightLeg: 0,
            leftFoot: 0,
            rightFoot: 0
          },
        };
  };

  const [character, setCharacter] = useState(initialCharacterData);

  useEffect(() => {
    localStorage.setItem('characterData', JSON.stringify(character));
  }, [character]);

  const updateStats = (stat, value) => {
    setCharacter((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: value },
    }));
  };

  const updateDamage = (zone) => {
    setCharacter((prev) => ({
      ...prev,
      damageZones: { ...prev.damageZones, [zone]: Math.max(0, prev.damageZones[zone] - 1) },
    }));
  };

  const updateProfile = (profile, value) => {
    setCharacter((prev) => ({
      ...prev,
      profile: { ...prev.profile, [profile]: value}
    }));
  }

  const updateSkillLevel = (index, level) => {
    const newSkills = [...character.skills];
    newSkills[index].level = level;
    setCharacter((prev) => ({ ...prev, skills: newSkills }));
  };

  const addItem = () => {
    setCharacter((prev) => ({
      ...prev,
      inventory: [...prev.inventory, { itemName: 'Nouvel Objet', quantity: 1 }],
    }));
  };

  const updateItem = (index, value, field) => {
    const newInventory = [...character.inventory];
    newInventory[index][field] = value;
    setCharacter((prev) => ({ ...prev, inventory: newInventory }));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/stats" element={<Stats stats={character.stats} updateStats={updateStats} />} />
          <Route path="/damage" element={<DamageZones damageZones={character.damageZones} updateDamage={updateDamage} />} />
          <Route path="/skills" element={<Skills skills={character.skills} updateSkillLevel={updateSkillLevel} />} />
          <Route path="/inventory" element={<Inventory inventory={character.inventory} addItem={addItem} updateItem={updateItem} />} />
          <Route path="/profile" element={<Profile profile={character.profile} updateProfile={updateProfile}/>}></Route>
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;
