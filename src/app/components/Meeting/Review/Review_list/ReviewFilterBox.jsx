import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { formattedSmallDate } from "../../../../utils/formattedDate";

const ReviewFilterBox = ({
    filterDate,
    setFilterDate,
    uniqueDate,
    filterLocation,
    setFilterLocation,
    filterTeamId,
    setFilterTeamId,
    uniqueTeam,
    filterManager,
    setFilterManager,
    uniqueManager,
}) => {
    return (
        <div className='w-80'>         
            {/* Filtrer par date */}  
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtrer par date :</span>
                <input type={'date'} value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)} className={'input'} />
            </label> 

            {/* Filtrer par location */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtrer par location :</span>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={500}
                    className='input px-2 py-1 border rounded'
                    type="text"
                    placeholder="Rechercher un nom de salle"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                />
            </label>

            {/* Filtrer par équipe */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtre par équipe:</span>
                <select
                className="input-select input-option px-2 py-1 border rounded"
                value={filterTeamId}
                onChange={(e) => setFilterTeamId(e.target.value)}
                >
                <option value="">Tous</option>
                {uniqueTeam?.map((team, index) => (
                    <option key={index} value={team.id}>
                    {team.name}
                    </option>
                ))}
                </select>
            </label>  

            {/* Filtrer par manager */}
            <label className="label-container flex flex-col">
                <span className="mb-1">Filtrer par responsable :</span>
                <select
                    className='input-select input-option px-2 py-1 border rounded'
                    value={filterManager}
                    onChange={(e) => setFilterManager(e.target.value)}
                >
                    <option value="">Tous</option>
                    {uniqueManager?.map((manager, index) => (
                        <option key={index} value={manager}>
                            {manager}
                        </option>
                    ))}
                </select>
            </label>   

        </div>
    );
};

export default ReviewFilterBox;
