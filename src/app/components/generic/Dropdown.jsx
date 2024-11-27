import React from 'react'

const Dropdown = ( props ) => {
    return (
        // eslint-disable-next-line react/prop-types
        <select id={props.id} name={props.name} onChange={props.handle} className='input-select input-option'>
            {/* eslint-disable-next-line react/prop-types */}
            {props.options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default Dropdown;