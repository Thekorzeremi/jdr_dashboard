// src/components/Skills.js
import React from 'react';

function Skills({ skills, updateSkillLevel }) {
  return (
    <div>
      <h2>Compétences</h2>
      {skills.map((skill, index) => (
        <div key={index}>
          <label>{skill.name}</label>
          <input
            type="number"
            value={skill.level}
            onChange={(e) => updateSkillLevel(index, parseInt(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}

export default Skills;
