import React from 'react';

const ExportButton = ({ onExport }) => {
    const handleExport = () => {
        onExport();
    };

    return (
        <button className='btn btn-primary btn-small' onClick={handleExport}>
            Export en CSV
        </button>
    );
};

export default ExportButton;