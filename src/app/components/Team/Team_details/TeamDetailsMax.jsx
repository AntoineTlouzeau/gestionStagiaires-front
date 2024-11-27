import React, { useEffect, useState } from 'react'
import Team_modifData from '../Team_modif/Team_modifData';
import Modal from '../../generic/Modal';
import Team_modifSkills from '../Team_modif/Team_modifSkills';
import Team_modifIntern from '../Team_modif/Team_modifIntern';
import { toast } from 'react-toastify';
import apiBackEnd from '../../../services/api.backend';
import { URL_BACK_ADD_SKILL_TO_TEAM_SKILL, URL_BACK_ADD_SKILL_TO_TEAM_TEAM, URL_BACK_DELETE_INTERN_FROM_TEAM_INTERN, URL_BACK_DELETE_INTERN_FROM_TEAM_TEAM, URL_BACK_DELETE_MANAGER_FROM_TEAM_MANAGER, URL_BACK_DELETE_MANAGER_FROM_TEAM_TEAM, URL_BACK_DELETE_SKILL_FROM_TEAM_SKILL, URL_BACK_DELETE_SKILL_FROM_TEAM_TEAM, URL_BACK_GET_ALL_INTERNS_FROM_TEAM, URL_BACK_GET_ONE_TEAM } from '../../../constants/url/urlBack';
import StatusCodes from '../../../constants/StatusCodes/statusCodes';
import Team_modifAddManager from '../Team_modif/Team_modifAddManager';
import Team_modifAddIntern from '../Team_modif/Team_modifAddIntern';
import { useParams } from 'react-router-dom';
import { formattedSmallDate } from '../../../utils/formattedDate'; 

function TeamDetails() {

    // STATES POUR TESTER
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };
    const [modalSelector, setModalSelector] = useState("data");
    // data received from api based on the url
    const [team, setTeam] = useState({});
    const [linkedInterns, setLinkedInterns] = useState([]);
    // need to retrive the teamId from the url useParams ?
    const { teamId } = useParams();

    // Lets fetch data from api
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchTeam = async () => {
            try {
                const response = await apiBackEnd.get(URL_BACK_GET_ONE_TEAM.replace(':teamId', teamId), { signal });
                if (response.status === StatusCodes.OK) {
                    setTeam(response.data);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('Request was canceled.');
                }
                else {
                    console.error('Error fetching team:', error);
                }
            }
        };
        fetchTeam();
        return () => { abortController.abort(); };
    }, [modalOpen]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchLinkedInterns = async () => {
            try {
                const response = await apiBackEnd.get(URL_BACK_GET_ALL_INTERNS_FROM_TEAM.replace(':teamId', teamId), { signal });
                if (response.status === StatusCodes.OK) {
                    setLinkedInterns(response.data);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('Request was canceled.');
                }
                else {
                    console.error('Error fetching linked interns:', error);
                }
            }
        };
        fetchLinkedInterns();
        return () => { abortController.abort(); };
    }, [modalOpen]);


    const handleShowModal = (selector) => {
        setModalSelector(selector);
        openModal();
    };

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

    const handleDeleteIntern = (internToDelete) => {
        const deleteIntern = async (internToDelete) => {
            try {
                const response = await apiBackEnd.delete(`${URL_BACK_DELETE_INTERN_FROM_TEAM_TEAM}/${teamId}/${URL_BACK_DELETE_INTERN_FROM_TEAM_INTERN}/${internToDelete.id}`);
                if (response.status === StatusCodes.OK || response.status === StatusCodes.NO_CONTENT) {
                    toast.success(`Le stagiaire ${internToDelete.firstName} ${internToDelete.lastName} a bien été supprimé de l'équipe ${team.name} !`);
                } else {
                    toast.error(`Erreur lors de la demande de suppression, retour de l'api : ${response.status} / ${response.message}`);
                }
            } catch (error) {
                if (error.response && error.response.status === StatusCodes.CONFLICT) {
                    toast.error(`Le stagiaire ${internToDelete.firstName} ${internToDelete.lastName} n'existe pas dans l'équipe ${team.name} !`);
                } else {
                    toast.error(`Erreur lors de la demande de suppression, retour de l'api : ${error.message}`);
                }
            }
        };
        deleteIntern(internToDelete);
    };

    const handleDeleteManager = (managerToDelete) => {
        const deleteManager = async (managerToDelete) => {
            try {
                const response = await apiBackEnd.delete(`${URL_BACK_DELETE_MANAGER_FROM_TEAM_TEAM}/${teamId}/${URL_BACK_DELETE_MANAGER_FROM_TEAM_MANAGER}/${managerToDelete.id}`);
                if (response.status === StatusCodes.OK || response.status === StatusCodes.NO_CONTENT) {
                    toast.success(`Le manager ${managerToDelete.firstName} ${managerToDelete.lastName} a bien été supprimé de l'équipe ${team.name} !`);
                } else {
                    toast.error(`Erreur lors de la demande de suppression, retour de l'api : ${response.status} / ${response.message}`);
                }
            } catch (error) {
                if (error.response && error.response.status === StatusCodes.CONFLICT) {
                    toast.error(`Le manager ${managerToDelete.firstName} ${managerToDelete.lastName} n'existe pas dans l'équipe ${team.name} !`);
                } else {
                    toast.error(`Erreur lors de la demande de suppression, retour de l'api : ${error.message}`);
                }
            }
        };
        deleteManager(managerToDelete);
    };

    return (
        <>
            <div className="flex flex-col justify-center text-center gap-5 p-5">
                <button className='btn-primary btn' onClick={() => handleShowModal('data')}>Modal pour modifier data d'une équipe</button>
                <button className='btn-primary btn' onClick={() => handleShowModal('addManager')}>Modal pour ajouter un manager à une équipe</button>
                <button className='btn-primary btn' onClick={() => handleShowModal('addIntern')}>Modal pour ajouter un stagiaire à une équipe</button>
                <button className='btn-primary btn' onClick={() => handleShowModal('skills')}>Modal pour ajouter un langage à une équipe</button>
            </div>
            <Modal isOpen={modalOpen} close={closeModal}>
                {modalSelector === 'data' && (<Team_modifData team={team} close={closeModal} />)}
                {modalSelector === 'addManager' && (<Team_modifAddManager team={team} close={closeModal} />)}
                {modalSelector === 'addIntern' && (<Team_modifAddIntern team={team} close={closeModal} />)}
                {modalSelector === 'skills' && (<Team_modifSkills team={team} close={closeModal} />)}
                {modalSelector === 'intern' && (<Team_modifIntern team={team} close={closeModal} internId={selectedInternId} />)}
            </Modal>
            <div className='flex flex-row text-sm'>

                TEAM :
                <div className='flex flex-row justify-between m-5'>
                    <table className="table-auto border-collapse border border-gray-800 m-5">
                        <tbody>
                            <tr>
                                <td className="border p-2">ID</td>
                                <td className="border p-2">{team.id}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">NAME</td>
                                <td className="border p-2">{team.name}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">STARTDATE</td>
                                <td className="border p-2">{formattedSmallDate(team.projectStartDate)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">ENDDATE</td>
                                <td className="border p-2">{formattedSmallDate(team.projectEndDate)}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">isWeekEven</td>
                                <td className="border p-2">{team.isWeekEven ===  true ? "true" : "false"}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">URL_REPO</td>
                                <td className="border p-2">{team.urlRepository}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">URL_BACKLOG</td>
                                <td className="border p-2">{team.urlBacklog}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">MEMBER COUNT</td>
                                <td className="border p-2">{team.memberCount}</td>
                            </tr>
                            <tr>
                                <td className="border p-2">LANGAGES</td>
                                <td className="border p-2">
                                    {team.skills ? team.skills.map((s) => (
                                        <div key={s.skillName}>
                                            {s.skillName} <button className='btn-red btn' onClick={() => handleDeleteSkill(s.skillName)}>delete</button>
                                        </div>
                                    )) : null}
                                </td>
                            </tr>
                            <tr>
                                <td className="border p-2">MANAGERS</td>
                                <td className="border p-2">
                                    {team.managers ? team.managers.map((m) => (
                                        <div key={m.id}>
                                            {m.firstName} <button className='btn btn-red' onClick={()=> handleDeleteManager(m)}>delete</button>
                                        </div>
                                    )) : null}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                STAGIAIRES :
                <div className='flex flex-row justify-between m-5'>
                    <table className="table-auto border-collapse border border-gray-800">
                        <tbody>
                            {linkedInterns.map(intern => (
                                <React.Fragment key={intern.id}>
                                    <tr>
                                        <td className="border p-2 bg-slate-600">ID</td>
                                        <td className="border p-2">
                                            {intern.id}
                                            <button className='btn btn-red' onClick={() => handleDeleteIntern(intern)}>delete</button>
                                            <button className='btn btn-secondary' onClick={() => {handleShowModal('intern'); setSelectedInternId(intern.id)}}>edit entrée/sortie</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Email</td>
                                        <td className="border p-2">{intern.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Last Name</td>
                                        <td className="border p-2">{intern.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">First Name</td>
                                        <td className="border p-2">{intern.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Presence Type</td>
                                        <td className="border p-2">{intern.presenceType}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Trainings</td>
                                        <td className="border p-2">{intern.trainings}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Deleted?</td>
                                        <td className="border p-2">{intern.isDeleted}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">URL CV</td>
                                        <td className="border p-2">{intern.urlCv}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Hired By</td>
                                        <td className="border p-2">{intern.hiredBy}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Hired At</td>
                                        <td className="border p-2">{intern.hiredAt}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Phone Number</td>
                                        <td className="border p-2">{intern.phoneNumber}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default TeamDetails;