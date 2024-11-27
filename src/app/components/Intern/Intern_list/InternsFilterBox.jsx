import React from "react";
import { DebounceInput } from "react-debounce-input";

const InternsFilterBox = ({
  filterLastname,
  setFilterLastname,
  filterFirstname,
  setFilterFirstname,
  filterPresenceType,
  setFilterPresenceType,
  filterSkillId,
  setFilterSkillId,
  uniqueSkills,
  filterTeamId,
  setFilterTeamId,
  uniqueTeams,
}) => {
  return (
    <div className="w-80">
      {/* Filtrer par nom */}
      <label className="label-container flex flex-col">
        <span className="mb-1">Nom:</span>
        <DebounceInput
          minLength={2}
          debounceTimeout={500}
          className="input px-2 py-1 border rounded"
          type="text"
          placeholder="Rechercher un nom"
          value={filterLastname}
          onChange={(e) => setFilterLastname(e.target.value)}
        />
      </label>
      {/* Filtrer par prénom */}
      <label className="label-container flex flex-col">
        <span className="mb-1">Prénom:</span>
        <DebounceInput
          minLength={2}
          debounceTimeout={500}
          className="input px-2 py-1 border rounded"
          type="text"
          placeholder="Rechercher un prénom"
          value={filterFirstname}
          onChange={(e) => setFilterFirstname(e.target.value)}
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
          {uniqueTeams?.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </label>
      {/* Filtrer par skillId */}
      <label className="label-container flex flex-col">
        <span className="mb-1">Filtre par compétence:</span>
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
      {/* Filtrer par type de présence */}
      <label className="label-container flex flex-col">
        <span className="mb-1">Filtre par type de présence:</span>
        <select
          className="input-select input-option px-2 py-1 border rounded"
          value={filterPresenceType}
          onChange={(e) => setFilterPresenceType(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="PRESENTIEL">Présentiel</option>
          <option value="DISTANCIEL">Distanciel</option>
          <option value="HYBRIDE">Hybride</option>
        </select>
      </label>
    </div>
  );
};

export default InternsFilterBox;
