import React from 'react';

const FilterDropdown = ({ handleFilter }) => {
    return (
        <div id="filterDropdownContainer">
        <label htmlFor="filterDropdown" id="filterLabel">filter:</label>
        <select onChange={handleFilter} name="filterDropdown" id="filterDropdown">
            <option value="all">all</option>
            <option value="clothing">clothing</option>
            <option value="lifestyle">lifestyle</option>
            <option value="technology">technology</option>
            <option value="household">household</option>
        </select>
    </div>
    )
}

export default FilterDropdown