import React, { useState, useEffect } from 'react';

const ComboBox = ({ initialOptions, selectedOption, onSelectionChange, className }) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(selectedOption);

  // Combina las opciones iniciales con la opción seleccionada
  useEffect(() => {
    if (selectedOption && !initialOptions.some(option => option.id === selectedOption.id)) {
      setOptions([selectedOption, ...initialOptions]);
    } else {
      setOptions(initialOptions);
    }
  }, [initialOptions, selectedOption]);

  const handleChange = (event) => {
    const selected = options.find(option => option.id === parseInt(event.target.value));
    setSelectedValue(selected);
    onSelectionChange(parseInt(event.target.value));
  };

  return (
    <select 
        id="combo" 
        value={selectedValue?.id || ''} 
        onChange={handleChange} 
        className={className}
    >
        <option value="" disabled>-- Selecciona una opción --</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.uc || option.ut}
          </option>
        ))}
    </select>
  );
};

export default ComboBox;
