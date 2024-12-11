import React, { useState, useEffect } from 'react';

const ComboBox = ({ initialOptions, disabled=true, selectedOption, onSelectionChange, className, colorOptions }) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(selectedOption);

  // Combina las opciones iniciales con la opción seleccionada
  useEffect(() => {
    if (selectedOption && !initialOptions.some(option => option.id === selectedOption.id)) {
      setOptions([selectedOption, ...initialOptions]);
    } else {
      if(selectedOption == null && selectedValue != null) setSelectedValue(null)
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
        <option value="" disabled={disabled} className={!disabled ? colorOptions:''}>-- Selecciona una opción --</option>
        {options.map((option) => (
          <option key={option.id} value={option.id} className={colorOptions}>
            {option.uc || option.ut}
          </option>
        ))}
    </select>
  );
};

export default ComboBox;
