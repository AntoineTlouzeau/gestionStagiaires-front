import React, { useEffect, useState } from 'react'
import apiBackEnd from '../../services/api.backend';
import { URL_BACK_DELETE_INTERN_FROM_TEAM_INTERN, URL_BACK_DELETE_INTERN_FROM_TEAM_TEAM, URL_BACK_GET_ALL_INTERNS_FROM_TEAM, URL_BACK_GET_ONE_TEAM } from '../../constants/url/urlBack';
import StatusCodes from '../../constants/StatusCodes/statusCodes';
import Modal from '../../components/generic/Modal';
import Team_modifAddIntern from '../../components/Team/Team_modif/Team_modifAddIntern';
import Team_modifIntern from '../../components/Team/Team_modif/Team_modifIntern';
import Loader from '../../components/utils/Loader';
import LearningTeamList from '../../components/Team/Team_other/LearningTeamList';
import { toast } from 'react-toastify';

function learningTeam() {

    const HARDCODED_LEARNINGTEAM_ID = 0;

    const [team, setTeam] = useState([]);
    const [teamExist, setTeamExist] = useState(false);
    const [loading, setLoading] = useState(true);
    const [interns, setInterns] = useState([]);

    // teamDetails from maxence
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };
    const [modalSelector, setModalSelector] = useState("data");
    // state pôur récup l'id du stagiaire à modifier en cas de click sur le bouton modifier
    const [selectedInternId, setSelectedInternId] = useState(null);

    const handleShowModal = (selector) => {
        setModalSelector(selector);
        openModal();
    };

    // Get team data
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataTeam = async () => {
            try {
                const dataTeam = await apiBackEnd.get(URL_BACK_GET_ONE_TEAM.replace(':teamId', HARDCODED_LEARNINGTEAM_ID), { signal });
                if (dataTeam.status === StatusCodes.OK) {
                    setTeam(dataTeam.data);
                    setTeamExist(true);
                    setLoading(false);
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
        fetchDataTeam();
        return () => { abortController.abort(); };
    }, []);

    // Get interns data
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataInterns = async () => {
            try {
                const dataInterns = await apiBackEnd.get(URL_BACK_GET_ALL_INTERNS_FROM_TEAM.replace(':teamId', HARDCODED_LEARNINGTEAM_ID), { signal });
                if (dataInterns.status === StatusCodes.OK) {
                    setInterns(dataInterns.data);
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('Request was canceled.');
                }
                else {
                    console.error('Error fetching interns:', error);
                }
            }
        };
        fetchDataInterns();
        return () => { abortController.abort(); };
    }, []);


    const handleDeleteIntern = async (internToDelete) => {
        try {
            const response = await apiBackEnd.delete(`${URL_BACK_DELETE_INTERN_FROM_TEAM_TEAM}/${HARDCODED_LEARNINGTEAM_ID}/${URL_BACK_DELETE_INTERN_FROM_TEAM_INTERN}/${internToDelete.id}`);
            if (response.status === StatusCodes.OK || response.status === StatusCodes.NO_CONTENT) {
                toast.success(`Le stagiaire ${internToDelete.firstName} ${internToDelete.lastName} a bien été supprimé de l'équipe ${team.name} !`);
                setInterns(interns.filter(intern => intern.id !== internToDelete.id));
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

    if (loading) {
        return (
            <div>
                <h3 className="principalTitle mb-4">Bienvenue sur la liste des stagiaires en montée en compétence !</h3>
                <Loader />
            </div>
        );
    }

    return (
        <>
            {teamExist ? (
                <>
                    <h4 className="principalTitle mb-4">
                        Bienvenue sur la liste des stagiaires en montée en compétence !<br />
                    </h4>
                    <div className='peopleList my-4'>
                        <LearningTeamList handleDeleteIntern={handleDeleteIntern} people={interns} setModalSelector={setModalSelector} openModal={openModal} teamId={team.id} team={team} setSelectedInternId={setSelectedInternId} />
                        <button className='btn btn-primary mt-2 mb-4 ml-4' onClick={() => handleShowModal('addIntern')}>Ajouter Stagiaire</button>
                    </div>
                    <Modal isOpen={modalOpen} close={closeModal}>
                        {modalSelector === 'addIntern' && (<Team_modifAddIntern team={team} close={closeModal} updateInterns={setInterns}/>)}
                        {modalSelector === 'intern' && (<Team_modifIntern team={team} close={closeModal} internId={selectedInternId} updatedDates={setInterns} />)}
                    </Modal>
                </>
            ) : (<div className='principalTitle'>L'équipe n'existe pas</div>)}
        </>
    );
}

export default learningTeam