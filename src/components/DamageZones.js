// src/components/DamageZones.js
import React from 'react';

function DamageZones({ damageZones, updateDamage }) {
  return (
    <div>
      <h2>Zones de Dégâts</h2>
      <svg width="200" height="400">
        {/* Tête */}
        <circle 
          cx="100" 
          cy="50" 
          r="30" 
          fill={damageZones.head === 0 ? "grey" : "green"} 
          onClick={() => updateDamage('head')} 
        />
        <text x="100" y="50" textAnchor="middle" fill="black">{damageZones.head}</text>
        
        {/* Torse */}
        <circle 
          cx="100" 
          cy="150" 
          r="40" 
          fill={damageZones.torso === 0 ? "grey" : "green"} 
          onClick={() => updateDamage('torso')} 
        />
        <text x="100" y="150" textAnchor="middle" fill="black">{damageZones.torso}</text>

        {/* Épaules */}
        <circle cx="60" cy="120" r="15" fill={damageZones.leftShoulder === 0 ? "grey" : "green"} onClick={() => updateDamage('leftShoulder')} />
        <text x="60" y="120" textAnchor="middle" fill="black">{damageZones.leftShoulder}</text>
        <circle cx="140" cy="120" r="15" fill={damageZones.rightShoulder === 0 ? "grey" : "green"} onClick={() => updateDamage('rightShoulder')} />
        <text x="140" y="120" textAnchor="middle" fill="black">{damageZones.rightShoulder}</text>
        
        {/* Bras */}
        <circle cx="45" cy="150" r="12" fill={damageZones.leftArm === 0 ? "grey" : "green"} onClick={() => updateDamage('leftArm')} />
        <text x="45" y="150" textAnchor="middle" fill="black">{damageZones.leftArm}</text>
        <circle cx="155" cy="150" r="12" fill={damageZones.rightArm === 0 ? "grey" : "green"} onClick={() => updateDamage('rightArm')} />
        <text x="155" y="150" textAnchor="middle" fill="black">{damageZones.rightArm}</text>
        
        {/* Avant-bras */}
        <circle cx="35" cy="180" r="12" fill={damageZones.leftForearm === 0 ? "grey" : "green"} onClick={() => updateDamage('leftForearm')} />
        <text x="35" y="180" textAnchor="middle" fill="black">{damageZones.leftForearm}</text>
        <circle cx="165" cy="180" r="12" fill={damageZones.rightForearm === 0 ? "grey" : "green"} onClick={() => updateDamage('rightForearm')} />
        <text x="165" y="180" textAnchor="middle" fill="black">{damageZones.rightForearm}</text>
        
        {/* Mains */}
        <circle cx="25" cy="210" r="10" fill={damageZones.leftHand === 0 ? "grey" : "green"} onClick={() => updateDamage('leftHand')} />
        <text x="25" y="210" textAnchor="middle" fill="black">{damageZones.leftHand}</text>
        <circle cx="175" cy="210" r="10" fill={damageZones.rightHand === 0 ? "grey" : "green"} onClick={() => updateDamage('rightHand')} />
        <text x="175" y="210" textAnchor="middle" fill="black">{damageZones.rightHand}</text>
        
        {/* Hanches */}
        <circle cx="80" cy="220" r="15" fill={damageZones.leftHip === 0 ? "grey" : "green"} onClick={() => updateDamage('leftHip')} />
        <text x="80" y="220" textAnchor="middle" fill="black">{damageZones.leftHip}</text>
        <circle cx="120" cy="220" r="15" fill={damageZones.rightHip === 0 ? "grey" : "green"} onClick={() => updateDamage('rightHip')} />
        <text x="120" y="220" textAnchor="middle" fill="black">{damageZones.rightHip}</text>
        
        {/* Cuisses */}
        <circle cx="75" cy="260" r="15" fill={damageZones.leftThigh === 0 ? "grey" : "green"} onClick={() => updateDamage('leftThigh')} />
        <text x="75" y="260" textAnchor="middle" fill="black">{damageZones.leftThigh}</text>
        <circle cx="125" cy="260" r="15" fill={damageZones.rightThigh === 0 ? "grey" : "green"} onClick={() => updateDamage('rightThigh')} />
        <text x="125" y="260" textAnchor="middle" fill="black">{damageZones.rightThigh}</text>
        
        {/* Jambes */}
        <circle cx="75" cy="300" r="12" fill={damageZones.leftLeg === 0 ? "grey" : "green"} onClick={() => updateDamage('leftLeg')} />
        <text x="75" y="300" textAnchor="middle" fill="black">{damageZones.leftLeg}</text>
        <circle cx="125" cy="300" r="12" fill={damageZones.rightLeg === 0 ? "grey" : "green"} onClick={() => updateDamage('rightLeg')} />
        <text x="125" y="300" textAnchor="middle" fill="black">{damageZones.rightLeg}</text>
        
        {/* Pieds */}
        <circle cx="75" cy="340" r="10" fill={damageZones.leftFoot === 0 ? "grey" : "green"} onClick={() => updateDamage('leftFoot')} />
        <text x="75" y="340" textAnchor="middle" fill="black">{damageZones.leftFoot}</text>
        <circle cx="125" cy="340" r="10" fill={damageZones.rightFoot === 0 ? "grey" : "green"} onClick={() => updateDamage('rightFoot')} />
        <text x="125" y="340" textAnchor="middle" fill="black">{damageZones.rightFoot}</text>
      </svg>
    </div>
  );
}

export default DamageZones;
