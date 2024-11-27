import React from 'react';
import { DebounceInput } from 'react-debounce-input';

const FilterBox = ({
    filterName,
    setFilterName,
    filterManagers,
    setFilterManagers,
    filterIsWeekEven,
    setFilterIsWeekEven,
    filterSkillId,
    setFilterSkillId,
    filterProjectState,
    setFilterProjectState,
    uniqueSkills,
    uniqueManagers,
}) => {
    return (
        <div className='w-80'>
            {/* Filtrer par name */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Nom:</span>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={500}
                    className='input px-2 py-1 border rounded'
                    type="text"
                    placeholder="Rechercher un nom d'équipe"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
            </label>
            {/* Filtrer par manager */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtre par manager:</span>
                <select
                    className='input-select input-option px-2 py-1 border rounded'
                    value={filterManagers}
                    onChange={(e) => setFilterManagers(e.target.value)}
                >
                    <option value="">Tous</option>
                    {uniqueManagers?.map((manager, index) => (
                        <option key={index} value={manager}>
                            {manager}
                        </option>
                    ))}
                </select>
            </label>
            {/* Filtrer par isWeekEven */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtre par semaine:</span>
                <select
                    className="input-select input-option px-2 py-1 border rounded"
                    value={filterIsWeekEven}
                    onChange={(e) => setFilterIsWeekEven(e.target.value)}
                >
                    <option value="">Tous</option>
                    <option value="true">Paire</option>
                    <option value="false">Impaire</option>
                </select>
            </label>
            {/* Filtrer par skillId */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtre par langage:</span>
                <select
                    className="input-select input-option px-2 py-1 border rounded"
                    value={filterSkillId}
                    onChange={(e) => setFilterSkillId(e.target.value)}
                >
                    <option value="">Tous</option>
                    {uniqueSkills?.map((skill, index) => (
                        <option key={index} value={skill}>
                            {skill}
                        </option>
                    ))}
                </select>
            </label>
            {/* Filtrer par projectState */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtre par état du projet:</span>
                <select
                    className="input-select input-option px-2 py-1 border rounded"
                    value={filterProjectState}
                    onChange={(e) => setFilterProjectState(e.target.value)}
                >
                    <option value="">Tous</option>
                    <option value="unfinished">En cours</option>
                    <option value="finished">Terminé</option>
                </select>
            </label>
        </div>
    );
};

export default FilterBox;
