import React, { Component } from 'react';

export default class FilterDropdown extends Component {
    render() {
        return (
            <div id="filterDropdownContainer">
            <label for="filterDropdown" id="filterLabel">filter:</label>
            <select onChange={this.props.handleFilter} name="filterDropdown" id="filterDropdown">
                <option value="all">all</option>
                <option value="clothing">clothing</option>
                <option value="lifestyle">lifestyle</option>
            </select>
        </div>
        )
    }
}