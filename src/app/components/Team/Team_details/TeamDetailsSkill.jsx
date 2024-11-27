import React from 'react';
import apiBackEnd from '../../../services/api.backend.js';
import { URL_BACK_DELETE_SKILL_FROM_TEAM_SKILL, URL_BACK_DELETE_SKILL_FROM_TEAM_TEAM } from '../../../constants/url/urlBack';
import { toast } from 'react-toastify';
import StatusCodes from '../../../constants/StatusCodes/statusCodes.js';

const TeamDetailsSkill = ({skill, team, teamId}) => {
    const handleDeleteSkill = (skillToDelete) => {
        const deleteSkill = async (skillToDelete) => {
            const encodedSkillToDelete = encodeURIComponent(skillToDelete);
            try {
                const response = await apiBackEnd.delete(`${URL_BACK_DELETE_SKILL_FROM_TEAM_TEAM}/${teamId}/${URL_BACK_DELETE_SKILL_FROM_TEAM_SKILL}/${encodedSkillToDelete}`);
                if (response.status === StatusCodes.OK || response.status === StatusCodes.NO_CONTENT) {
                    toast.success(`Le langage ${skillToDelete} a bien été supprimé de l'équipe ${team.name} !`);
                } else {
                    toast.error(`Erreur lors de la demande de suppression, retour de l'api : ${response.status} / ${response.message}`);
                }
            } catch (error) {
                if (error.response && error.response.status === StatusCodes.CONFLICT) {
                    toast.error(`Le langage ${skillToDelete} n'existe pas dans l'équipe ${team.name} !`);
                } else {
                    toast.error(`Erreur lors de la demande de suppression, retour de l'api : ${error.message}`);
                }
            }
        };
        deleteSkill(skillToDelete);
    };
    return (
        <>   
        <div className='bg-white dark:bg-background-dark rounded-xl p-2 flex'>
            <p className='w-10/12 dark:text-white text-center mt-2'>{skill.skillName}</p>
            <button className='btn btn-secondary' onClick={() => handleDeleteSkill(skill.skillName)}>Supprimer</button>
        </div>
        </>
    );
};

export default TeamDetailsSkill;