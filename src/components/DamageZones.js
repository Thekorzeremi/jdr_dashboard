// src/components/DamageZones.js
import React from 'react';

function DamageZones({ damageZones, updateDamage }) {
  return (
    <div>
      <h2>Zones de Dégâts</h2>
      <svg width="200" height="400">
        <circle cx="100" cy="50" r="30" fill="red" onClick={() => updateDamage('head')} />
        <circle cx="100" cy="150" r="40" fill="blue" onClick={() => updateDamage('torso')} />
      </svg>
    </div>
  );
}

export default DamageZones;
