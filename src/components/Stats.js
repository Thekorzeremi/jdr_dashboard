// src/components/Stats.js
import React from 'react';

function Stats({ stats, updateStats }) {
  return (
    <div>
      <h2>Statistiques</h2>
      {Object.keys(stats).map((stat) => (
        <div key={stat}>
          <label>{stat}</label>
          <input
            type="number"
            value={stats[stat]}
            onChange={(e) => updateStats(stat, parseInt(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}

export default Stats;
