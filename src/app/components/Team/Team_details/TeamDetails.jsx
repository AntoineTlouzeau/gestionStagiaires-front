import React, { useEffect, useState } from 'react';
import TeamDetailsSkill from './TeamDetailsSkill.jsx';
import TeamDetailsList from './TeamDetailsList.jsx';
import ReviewDetails from './ReviewDetails.jsx';
import CommentDetails from './CommentDetails.jsx';
import apiBackEnd from '../../../services/api.backend.js';
import { URL_BACK_GET_INTERN_DATES, URL_BACK_GET_ONE_TEAM, URL_BACK_GET_ALL_REVIEWS_FROM_TEAM,URL_BACK_GET_ALL_INTERNS_FROM_TEAM } from '../../../constants/url/urlBack';
import { formattedSmallDate } from "../../../utils/formattedDate.js";
import { NavLink } from 'react-router-dom';
import Team_modifData from '../Team_modif/Team_modifData';
import Modal from '../../generic/Modal';
import Team_modifSkills from '../Team_modif/Team_modifSkills';
import Team_modifIntern from '../Team_modif/Team_modifIntern';
import { toast } from 'react-toastify';
import StatusCodes from '../../../constants/StatusCodes/statusCodes';
import Team_modifAddManager from '../Team_modif/Team_modifAddManager';
import Team_modifAddIntern from '../Team_modif/Team_modifAddIntern';
import Loader from '../../utils/Loader.jsx';

function Team() {
    const [team, setTeam] = useState([]); 
    const [teamExist, setTeamExist] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [interns, setInterns] = useState([]);
    const [managers, setManagers] = useState([]);
    const [people, setPeople] = useState([]);
    const [skills, setSkills] = useState([]);
    const [terminatedProject,setTerminatedProject] = useState(true);
    const [nextMeetingDate, setNextMeetingDate]= useState();
    const [loading, setLoading] = useState(true);
    // quand les commentaires de team seront créés en entity et bdd
    const [comments, setComments] = useState([]);

    // teamDetails from maxence
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };
    const [modalSelector, setModalSelector] = useState("data");
    // state pôur récup l'id du stagiaire à modifier en cas de click sur le bouton modifier
    const [selectedInternId, setSelectedInternId] = useState(null);

    const pathname = window.location.pathname.substring(1);
    const teamId = Number(pathname.split("/")[1]);  

    const dateOfTheDay = new Date();

    // function ProjectIsTerminated(dateOfTheDay){
    //     let projectEndDate = new Date(team.projectEndDate);
    //     if(dateOfTheDay <= projectEndDate){
    //         setTerminatedProject(false);
    //     }else{
    //         setTerminatedProject(true);
    //     }
    // }

    function getNextReview(dateOfTheDay) {
        const targetDay = 4; // 4 corresponds to Thursday (Sunday = 0, Monday = 1, ..., Saturday = 6)
        const daysInWeek = 7;
        let projectEndDate = new Date(team.projectEndDate);
    
        if (dateOfTheDay <= projectEndDate) {
            let currentDate = new Date(dateOfTheDay);
    
            while (currentDate.getDay() !== targetDay) {
                currentDate.setDate(currentDate.getDate() + 1);
            }
    
            const weekNumber = Math.ceil(
                (currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 
                (daysInWeek * 24 * 60 * 60 * 1000)
            );
    
            if (weekNumber % 2 !== 0 && !team.isWeekEven) {
                // For odd weeks and odd team weeks, advance by 7 days
                currentDate.setDate(currentDate.getDate() + 7);
            }
    
            return formattedSmallDate(currentDate);
        } else {
            return "Projet terminé";
        }
    }
    

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataTeam = async () => {
            try {   
                const dataTeam = await apiBackEnd.get(URL_BACK_GET_ONE_TEAM.replace(':teamId', teamId), { signal }); 
                if (dataTeam.status === StatusCodes.OK) {
                    setTeam(dataTeam.data);        
                    setManagers(dataTeam.data.managers);    
                    setSkills(dataTeam.data.skills);
                    setTeamExist(true);
                    setLoading(false);
                }

                //TODO
                // fetch comments sur l'équipe
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

    useEffect(() => {
        setNextMeetingDate(getNextReview(dateOfTheDay));
    }, [team]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataInterns = async () => {
            try {
                const dataInterns = await apiBackEnd.get(URL_BACK_GET_ALL_INTERNS_FROM_TEAM.replace(':teamId', teamId), { signal });             
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
    }, [modalOpen]); 


    const handleShowModal = (selector) => {
        setModalSelector(selector);
        openModal();
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataReviews = async () => {
            try {
                const dataReviews = await apiBackEnd.get(URL_BACK_GET_ALL_REVIEWS_FROM_TEAM.replace(':teamId', teamId), { signal });
                if (dataReviews.status === StatusCodes.OK) {
                    setReviews(dataReviews.data);
                }  
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('Request was canceled.');
                }
                else {
                    console.error('Error fetching reviews:', error);
                }
            }
        };
        fetchDataReviews();
    }, []);
    useEffect(() => {
        const adaptedData = async () => {
            const adaptedManagers = managers.map(manager => ({
                id: manager.id,
                lastName: manager.lastName,
                firstName: manager.firstName,
                startDate: null,
                endDate: null,
                status: "Responsable",
            }));
            const adaptedInterns = await Promise.all(interns.map(async intern => {
                try {
                    const dataInternTeam = await apiBackEnd.get(URL_BACK_GET_INTERN_DATES.replace(':teamId', teamId).replace(':internId', intern.id));
                    
                    return {
                        id: dataInternTeam.data.id,
                        lastName: dataInternTeam.data.lastName,
                        firstName: dataInternTeam.data.firstName,
                        endDate: dataInternTeam.data.endDate,
                        startDate: dataInternTeam.data.startDate,
                        status: "Stagiaire",
                    };
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }));
    
            setPeople([ ...adaptedManagers, ...adaptedInterns]);
        };
        adaptedData();
    }, [interns, managers, team]);

    if (loading) {
        return (
            <div>
                <h3 className="principalTitle">Gestion d'une équipe</h3>
                <Loader />
            </div>
        );
    }

    
  // Date formatting logic
  const handleFormatState = () => {
    if (team.projectState.startsWith("j+")) {
      const days = parseInt(team.projectState.slice(2));
      return `Terminé (depuis ${days} jour${days !== 1 ? 's' : ''})`;
      // return `Depuis ${days} jour${days !== 1 ? 's' : ''}`;
    } else if (team.projectState.startsWith("j-")) {
      const days = parseInt(team.projectState.slice(2));
      return `En cours (reste ${days} jour${days !== 1 ? 's' : ''})`;
    } else {
      return projectState;
    }
  };

    return (
        <> 
        {teamExist ? (
            <>
            <h3 className="principalTitle mb-4">
            Equipe {team.name} <span className='text-base'>({interns.length} membre{interns.length > 1 ? "s" : ""})</span><br/>
            {team.projectState.startsWith("j+") ? (<span className="pill-red">{handleFormatState()}</span>) : (<span className="pill-green">{handleFormatState()}</span>)}
            </h3>
            <div className='container mx-auto px-4'>
                <div className="flex justify-center my-4">
                    <div className='bg-white dark:bg-background-dark rounded-xl p-2 w-full lg:flex mb-4'>
                        <div className="lg:w-1/2 dark:text-white mb-2">
                            <p><span className="secondaryTitle">Début du projet :</span> {formattedSmallDate(team.projectStartDate)}</p>
                            <p className='mb-3'><span className="secondaryTitle">Fin du projet :</span> {team.projectEndDate !== null ? formattedSmallDate(team.projectEndDate) : "Terminé"}</p> 
                            <p><span className="secondaryTitle">Type de reviews :</span> <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${team.isWeekEven ? 'pill-primary' : 'pill-secondary'}`}>{team.isWeekEven ? "Semaine PAIRE" : "Semaine IMPAIRE"}</span></p>
                            <p className='mb-3'><span className="secondaryTitle">Prochaine review :</span> {nextMeetingDate} </p>
                            <p><span className="secondaryTitle">Url repository :</span> <NavLink to={team.urlRepository} className="underline" target='_blank'>{team.urlRepository}</NavLink></p>
                            <p className='mb-3'><span className="secondaryTitle">Url back-log :</span> <NavLink to={team.urlBacklog} className="underline" target='_blank'>{team.urlBacklog}</NavLink></p>
                            <button className='btn btn-primary' onClick={() => handleShowModal('data')}>Modifier</button>
                        </div>
                        <div className="lg:w-1/2 bg-gray-200 dark:bg-gray-600 rounded-xl p-2">
                            <div className="secondaryTitle text-center mb-3">Languages utilisés pour le projet :</div>
                            <div className="grid grid-cols-2 gap-3 mb-2">    
                            {skills.map((skill) => <TeamDetailsSkill key={skill.skillName} skill={skill} teamId={teamId} team={team} />)}                                         
                            </div>
                            <div className="flex justify-end mb-2 mr-2 mb-4">
                                <button className='btn btn-primary' onClick={() => handleShowModal('skills')}>Ajouter</button>   
                            </div>    
                        </div>
                    </div>
                </div>
                <div className='peopleList my-4'>
                    <TeamDetailsList people={people} setModalSelector={setModalSelector} openModal={openModal} teamId={teamId} team={team} setSelectedInternId={setSelectedInternId} /> 
                    <button className='btn btn-primary mt-2 mb-4' onClick={() => handleShowModal('addManager')}>Ajouter Manager</button>
                    <button className='btn btn-primary mt-2 mb-4 ml-4' onClick={() => handleShowModal('addIntern')}>Ajouter Stagiaire</button>
                </div> 
                <div className='reviewsList my-4'>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 mb-2'>
                        {reviews ? reviews.map((review) => <ReviewDetails key={review.id} review={review}/>) : null} 
                    </div>
                    <button className='btn btn-primary w-fit'>Ajouter review</button>
                </div>

                {/* Commentaires quand créé coté back :*/}

                {/* <div className='commentsList m-4'>
                    <p className="secondaryTitle m-2 mt-4">Commentaires des responsables :</p>
                    {comments.map((comment) => <CommentDetails key={comment.id} comment={comment}/>)}
                    <div className='commentList'>
                        <div className='flex'>
                            <div className='commentInfos'>
                                <div className="secondaryTitle">Jean Dupont</div>
                                <p className="textDefault">Le 25/10/2023</p>
                                <p className="textDefault">(Modifié il y a 5 min)</p>
                            </div>
                            <div className='comment'>
                                <p className="textDefault">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet obcaecati beatae fugit fugiat veritatis tenetur. Deserunt commodi error eius rerum. Facere incidunt eveniet laboriosam, quam tempora voluptatum veniam ducimus repudiandae mollitia, molestiae illum asperiores quae nostrum. Unde praesentium explicabo fugiat? Natus consequuntur voluptatem modi aliquam optio obcaecati debitis nulla at placeat commodi harum eligendi cupiditate laudantium odio architecto, ad asperiores!</p>
                            </div>
                        </div>
                        <div className="flex mt-2 justify-end">
                            <button className='btn btn-primary mr-2'>Editer</button>  
                            <button className='btn btn-secondary'>Supprimer</button> 
                        </div> 
                    </div>
                    <button className='btn btn-primary mt-2 mb-4'>Ajouter</button>
                </div>      */}
                
                <Modal isOpen={modalOpen} close={closeModal}>
                    {modalSelector === 'data' && (<Team_modifData team={team} close={closeModal} />)}
                    {modalSelector === 'addManager' && (<Team_modifAddManager team={team} close={closeModal} />)}
                    {modalSelector === 'addIntern' && (<Team_modifAddIntern team={team} close={closeModal} />)}
                    {modalSelector === 'skills' && (<Team_modifSkills team={team} close={closeModal} />)}
                    {modalSelector === 'intern' && (<Team_modifIntern team={team} close={closeModal} internId={selectedInternId} />)}
                </Modal>
                
            </div>
            </>
            ) : (<div className='principalTitle'>L'équipe n'existe pas</div>)}                    
        </>
    );
}

export default Team;