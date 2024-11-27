import { useEffect, useMemo, useRef, useState } from 'react';
import apiBackEnd from '../../services/api.backend';
import Loader from '../../components/utils/Loader';
import DailyListTable from '../../components/Meeting/Daily/Daily_list/DailyListTable'; 

import {
    URL_BACK_GET_ALL_MANAGERS,
    URL_BACK_GET_ALL_DAILIES,
    URL_BACK_GET_ALL_TEAMS
} from '../../constants/url/urlBack';
import Modal from '../../components/generic/Modal';

function Dailies() {
    // Data fetching states
    const [dailies, setDailies] = useState([]);
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
    const [sortingBy, setSortingBy] = useState('meetingDate');
    const [sortingDirection, setSortingDirection] = useState('asc');
    // Filter states
    const [filterDate, setFilterDate] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [filterTeamId, setFilterTeamId] = useState('');
    const [filterManager, setFilterManager] = useState('');
    // New daily states (for the modal)
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchTeamsAndManagers = async () => {
            try {
                const [teamsResponse, managersResponse] = await Promise.all([
                    apiBackEnd.get(URL_BACK_GET_ALL_TEAMS, { signal }),
                    apiBackEnd.get(URL_BACK_GET_ALL_MANAGERS, { signal }),
                ]);
                setTeams(teamsResponse.data.content);
                setManagers(managersResponse.data);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.error('Request was canceled.');
                } else {
                    console.error('Error fetching teams or managers:', error);
                }
            }
        };
        fetchTeamsAndManagers();
        
        return () => { abortController.abort(); };
    }, []);

    // Fetch dailies data whenever the filters change
    useEffect(() => {
        // Create an AbortController instance
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDailies = async () => {
            try {
                const response = await apiBackEnd.get(URL_BACK_GET_ALL_DAILIES, {
                    params: {
                        size: size,
                        sort: `${sortingBy},${sortingDirection}`,
                        page: currentPage,
                        meetingDate: filterDate,
                        location: filterLocation,
                        teamId: filterTeamId,
                        lastName: filterManager,
                    },
                    signal,
                });
                setDailies(response.data.content);
                setTotalElements(response.data.totalElements);
                setTotalPages(response.data.totalPages);
                setNumberOfElements(response.data.numberOfElements);
                setLoading(false);
                setError(null);
                console.log(dailies);
            } catch (error) {
                if (error.message === 'AbortError') {
                    console.error('La requete a été annulée.');
                    setError('La requete a été annulée.');
                } else {
                    if (error.response && error.response.status === 404) {
                        console.error(error.response.data.message);
                        setError(error.response.data.message);
                        setDailies([]);
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
        fetchDailies();
        return () => {
            abortController.abort();
        };
    }, [size, sortingBy, sortingDirection, currentPage, filterDate,filterLocation,filterTeamId,filterManager]);

    
    // Get all unique teams from teams array in sorted order
    const uniqueTeam = useMemo(
        () =>
          teams
            .map((team) => ({ name: team.name, id: team.id }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        [teams]
      );
    // Get all unique managers from managers array in sorted order
    const uniqueManager = useMemo(() => [...new Set(managers.map((manager) => manager.lastName).sort())], [managers]);
    // Get all unique meeting dates from dailies array in sorted order
    const uniqueDate = useMemo(() => [...new Set(dailies.map((daily) => daily.meetingDate).sort((a, b) => a.localeCompare(b)))], [dailies]);

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
        params.append('meetingDate', filterDate);
        params.append('location', filterLocation);
        params.append('teamId', filterTeamId);
        params.append('lastName', filterManager);
        // Append pagination and sorting states to the URLSearchParams
        params.append('size', size);
        params.append('page', currentPage);
        params.append('sort', `${sortingBy},${sortingDirection}`);
        // Get the current URL and update it with the new URLSearchParams
        const currentUrl = new URL(window.location.href);
        currentUrl.search = params.toString();
        // Use pushState to update the URL without a page reload
        window.history.pushState({}, '', currentUrl);
    }, [size, currentPage, sortingBy, sortingDirection, filterDate,filterLocation,filterTeamId,filterManager]);

    // DEBUT DE LA LOGIC POUR RECUPERER L'ETAT DES FILTRES DANS L'URL
    const parseQueryString = (url) => {
        const params = new URLSearchParams(url.search);
        // Extract filter states
        const meetingDate = params.get('meetingDate') || '';
        const location = params.get('location') || '';
        const teamId = params.get('teamId') || '';
        const lastName = params.get('lastName') || '';
        // Extract pagination and sorting states
        const size = Number(params.get('size')) || 10;
        const page = Number(params.get('page')) || 0;
        const sort = (params.get('sort') || 'meetingDate,asc').split(',');
        return {
            filterDate: meetingDate,
            filterLocation: location,
            filterTeamId: teamId,
            filterManager: lastName,
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
            filterDate,
            filterLocation,
            filterTeamId,
            filterManager,
            size,
            currentPage,
            sortingBy,
            sortingDirection,
        } = parsedParams;

        // Set the state variables to restore the previous settings
        setFilterDate(filterDate);
        setFilterLocation(filterLocation);
        setFilterTeamId(filterTeamId);
        setFilterManager(filterManager);
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
                <h3 className="principalTitle">Gestion des dailies</h3>
                <Loader />
            </div>
        );
    }

    // Create a variable to hold the props for DailyListTableProps
    const DailyListTableProps = {
        error: error,
        // Data sorting & pagination props
        data: dailies,
        teams:teams,
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
        filterDate:filterDate,
        setFilterDate:setFilterDate,
        uniqueDate:uniqueDate,
        filterLocation:filterLocation,
        setFilterLocation:setFilterLocation,
        filterTeamId:filterTeamId,
        setFilterTeamId:setFilterTeamId,
        uniqueTeam:uniqueTeam,
        filterManager:filterManager,
        setFilterManager:setFilterManager,
        uniqueManager:uniqueManager,
    };

    return (
        <div>
            <h3 className="principalTitle m-5">Gestion des dailies</h3>
            <div className="container mx-auto px-4">
                <DailyListTable {...DailyListTableProps} />
                <button className='btn btn-primary mb-5'>
                    Ajouter un daily
                </button>
            </div>
        </div>
    );
}

export default Dailies;