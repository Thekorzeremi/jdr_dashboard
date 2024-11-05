// src/components/Inventory.js
import React from 'react';

function Inventory({ inventory, addItem, updateItem }) {
  return (
    <div>
      <h2>Inventaire</h2>
      {inventory.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateItem(index, e.target.value, 'name')}
          />
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateItem(index, parseInt(e.target.value), 'quantity')}
          />
        </div>
      ))}
      <button onClick={addItem}>Ajouter un objet</button>
    </div>
  );
}

export default Inventory;
