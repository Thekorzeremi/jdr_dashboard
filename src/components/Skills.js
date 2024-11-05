// src/components/Skills.js
import React from 'react';

function Skills({ skills, updateSkillLevel, addSkill }) {
  return (
    <div>
      <h2>Compétences</h2>
      {skills.map((skill, index) => (
        <div key={index}>
          <input
            type="text"
            value={skill.name}
            onChange={(e) => updateSkillLevel(index, e.target.value, 'name')}
          />
          <select
            value={skill.type}
            onChange={(e) => updateSkillLevel(index, e.target.value, 'type')}
          >
            <option value="skill">Compétence</option>
            <option value="spell">Sort</option>
            <option value="ability">Capacité</option>
          </select>
          <input
            type="number"
            value={skill.level}
            onChange={(e) => updateSkillLevel(index, parseInt(e.target.value), 'level')}
          />
          <textarea
            value={skill.description}
            onChange={(e) => updateSkillLevel(index, e.target.value, 'description')}
            placeholder="Description..."
          />
        </div>
      ))}
      <button onClick={addSkill}>Ajouter une compétence</button>
    </div>
  );
}

export default Skills;
