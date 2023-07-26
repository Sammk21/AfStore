import React, { useState } from "react";
import "./Dropdown.scss";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ options, selectedOption, onSelectOption }) => {
  const handleOptionSelect = (optionValue) => {
    onSelectOption(optionValue);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-btn">
        <button className="dropbtn">Sort by price</button>
        <FiChevronDown size={"15px"} />
      </div>
      <div className="dropdown-content">
      {options.map((option) => (
          <label
            key={option.value}
            className={`inputItem d-flex align-items-center justify-content-center ${
              option.value === selectedOption ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              value={option.value}
              checked={option.value === selectedOption}
              onChange={() => handleOptionSelect(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};
export default Dropdown;
