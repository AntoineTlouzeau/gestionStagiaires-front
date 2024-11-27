import { useEffect, useMemo, useRef, useState } from 'react';
import apiBackEnd from '../../services/api.backend';
import Loader from '../../components/utils/Loader';
import TeamListTable from '../../components/Team/Team_list/TeamListTable';

import {
    URL_BACK_GET_ALL_MANAGERS,
    URL_BACK_GET_ALL_SKILLS,
    URL_BACK_GET_ALL_TEAMS
} from '../../constants/url/urlBack';
import Modal from '../../components/generic/Modal';
import NewTeam from '../../components/Team/Team_new/NewTeam';

function Teams() {
    // Data fetching states
    const [skills, setSkills] = useState([]);
    const [managers, setManagers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Pagination states
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortingBy, setSortingBy] = useState('name');
    const [sortingDirection, setSortingDirection] = useState('asc');
    // Filter states
    const [filterName, setFilterName] = useState('');
    const [filterIsWeekEven, setFilterIsWeekEven] = useState('');
    const [filterSkillId, setFilterSkillId] = useState('');
    const [filterProjectState, setFilterProjectState] = useState('');
    const [filterManagers, setFilterManagers] = useState('');
    // New team states (for the modal)
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };

    // Get all unique skills from skills array in sorted order
    const uniqueSkills = useMemo(() => [...new Set(skills.map((skill) => skill.skillName).sort())], [skills]);
    // Get all unique managers from managers array in sorted order
    const uniqueManagers = useMemo(() => [...new Set(managers.map((manager) => manager.lastName).sort())], [managers]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchSkillsAndResponsables = async () => {
            try {
                const [skillsResponse, managerResponse] = await Promise.all([
                    apiBackEnd.get(URL_BACK_GET_ALL_SKILLS, { signal }),
                    apiBackEnd.get(URL_BACK_GET_ALL_MANAGERS, { signal }),
                ]);
                setSkills(skillsResponse.data);
                setManagers(managerResponse.data);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('Request was canceled.');
                } else {
                    console.error('Error fetching skills or responsables:', error);
                }
            }
        };
        fetchSkillsAndResponsables();
        return () => { abortController.abort(); };
    }, []);

    // Fetch teams data whenever the filters change
    useEffect(() => {
        // Create an AbortController instance
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchTeams = async () => {
            try {
                const response = await apiBackEnd.get(URL_BACK_GET_ALL_TEAMS, {
                    params: {
                        size: size,
                        sort: `${sortingBy},${sortingDirection}`,
                        page: currentPage,
                        name: filterName,
                        isWeekEven: filterIsWeekEven,
                        skillId: filterSkillId,
                        projectState: filterProjectState,
                        lastName: filterManagers,
                    },
                    signal,
                });
                setTeams(response.data.content);
                setTotalElements(response.data.totalElements);
                setTotalPages(response.data.totalPages);
                setNumberOfElements(response.data.numberOfElements);
                setLoading(false);
                setError(null);
            } catch (error) {
                if (error.message === 'AbortError') {
                    console.error('La requete a été annulée.');
                    setError('La requete a été annulée.');
                } else {
                    if (error.response && error.response.status === 404) {
                        console.error(error.response.data.message);
                        setError(error.response.data.message);
                        setTeams([]);
                        setTotalElements(0);
                        setTotalPages(0);
                        setNumberOfElements(0);
                        setLoading(false);
                    } else {
                        console.error('Erreur lors de la requete:', error);
                        setError('Erreur lors de la requete. Veuillez réessayer plus tard');
                        setLoading(false);
                    }
                }
            }
        };
        fetchTeams();
        return () => {
            abortController.abort();
        };
    }, [size, sortingBy, sortingDirection, currentPage, filterName, filterIsWeekEven, filterSkillId, filterProjectState, filterManagers]);

    // DEBUT DE LA LOGIQUE POUR SAVE L'ETAT DES FILTRES DANS L'URL
    // useRef to store the initial render flag
    const initialRender = useRef(true);
    // useEffect to update the URL based on filter, pagination, and sorting state
    useEffect(() => {
        if (initialRender.current) {
            // Skip URL update on initial render
            initialRender.current = false;
            return;
        }
        // Create a new URLSearchParams instance
        const params = new URLSearchParams();
        // Append filter states to the URLSearchParams
        params.append('name', filterName);
        params.append('isWeekEven', filterIsWeekEven);
        params.append('skillId', filterSkillId);
        params.append('projectState', filterProjectState);
        params.append('lastName', filterManagers);
        // Append pagination and sorting states to the URLSearchParams
        params.append('size', size);
        params.append('page', currentPage);
        params.append('sort', `${sortingBy},${sortingDirection}`);
        // Get the current URL and update it with the new URLSearchParams
        const currentUrl = new URL(window.location.href);
        currentUrl.search = params.toString();
        // Use pushState to update the URL without a page reload
        window.history.pushState({}, '', currentUrl);
    }, [size, currentPage, sortingBy, sortingDirection, filterName, filterIsWeekEven, filterSkillId, filterProjectState, filterManagers]);

    // DEBUT DE LA LOGIC POUR RECUPERER L'ETAT DES FILTRES DANS L'URL
    const parseQueryString = (url) => {
        const params = new URLSearchParams(url.search);
        // Extract filter states
        const name = params.get('name') || '';
        const isWeekEven = params.get('isWeekEven') || '';
        const skillId = params.get('skillId') || '';
        const projectState = params.get('projectState') || '';
        const lastName = params.get('lastName') || '';
        // Extract pagination and sorting states
        const size = Number(params.get('size')) || 10;
        const page = Number(params.get('page')) || 0;
        const sort = (params.get('sort') || 'name,asc').split(',');
        return {
            filterName: name,
            filterIsWeekEven: isWeekEven,
            filterSkillId: skillId,
            filterProjectState: projectState,
            filterManagers: lastName,
            size,
            currentPage: page,
            sortingBy: sort[0],
            sortingDirection: sort[1],
        };
    };
    // useEffect to restore state from the URL on initial render
    useEffect(() => {
        // Parse query parameters and extract filter, pagination, and sorting states
        const parsedParams = parseQueryString(window.location);
        const {
            filterName,
            filterIsWeekEven,
            filterSkillId,
            filterProjectState,
            filterManagers,
            size,
            currentPage,
            sortingBy,
            sortingDirection,
        } = parsedParams;

        // Set the state variables to restore the previous settings
        setFilterName(filterName);
        setFilterIsWeekEven(filterIsWeekEven);
        setFilterSkillId(filterSkillId);
        setFilterProjectState(filterProjectState);
        setFilterManagers(filterManagers);
        setSize(size);
        setCurrentPage(currentPage);
        setSortingBy(sortingBy);
        setSortingDirection(sortingDirection);
        // Fetch teams data based on the restored filter, pagination, and sorting settings
        // The effect will be triggered again due to the changes in state variables
    }, []); 




    if (loading) {
        return (
            <div>
                <h3 className="principalTitle">Gestion des équipes</h3>
                <Loader />
            </div>
        );
    }

    // Create a variable to hold the props for TeamListTableProps
    const TeamListTableProps = {
        error: error,
        // Data sorting & pagination props
        data: teams,
        totalElements: totalElements,
        numberOfElements: numberOfElements,
        totalPages: totalPages,
        size: size,
        currentPage: currentPage,
        sortingBy: sortingBy,
        sortingDirection: sortingDirection,
        onPageSizeChange: (newSize) => setSize(newSize),
        onPageChange: (newPage) => setCurrentPage(newPage),
        onSortingChange: (newSortingBy, newSortingDirection) => {
            setSortingBy(newSortingBy);
            setSortingDirection(newSortingDirection);
        },
        // Filterbox props
        filterName: filterName,
        setFilterName: setFilterName,
        filterManagers: filterManagers,
        setFilterManagers: setFilterManagers,
        filterIsWeekEven: filterIsWeekEven,
        setFilterIsWeekEven: setFilterIsWeekEven,
        filterSkillId: filterSkillId,
        setFilterSkillId: setFilterSkillId,
        filterProjectState: filterProjectState,
        setFilterProjectState: setFilterProjectState,
        uniqueSkills: uniqueSkills,
        uniqueManagers: uniqueManagers,
    };

    return (
        <div>
            <h3 className="principalTitle m-5">Gestion des équipes</h3>
            <div className="container mx-auto px-4">
                <TeamListTable {...TeamListTableProps} />
                <button className='btn btn-primary mb-5' onClick={openModal}>
                    Ajouter une équipe
                </button>

                <NewTeam isOpen={modalOpen} close={closeModal} />
            </div>
        </div>
    );
}

export default Teams;