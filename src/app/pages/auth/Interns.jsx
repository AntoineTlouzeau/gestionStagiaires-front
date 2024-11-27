import React, { useEffect, useMemo, useRef, useState } from "react";
import apiBackEnd from "../../services/api.backend";
import Loader from "../../components/utils/Loader";
import InternListTable from "../../components/Intern/Intern_list/InternListTable";

import {
  URL_BACK_GET_ALL_INTERNS,
  URL_BACK_GET_ALL_SKILLS,
  URL_BACK_GET_ALL_TEAMS,
} from "../../constants/url/urlBack";

function Interns() {
  // Data fetching states
  const [skills, setSkills] = useState([]);
  const [teams, setTeams] = useState([]);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Pagination states
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(10);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortingBy, setSortingBy] = useState("lastName");
  const [sortingDirection, setSortingDirection] = useState("asc");
  // Filter states
  const [filterLastname, setFilterLastname] = useState("");
  const [filterFirstname, setFilterFirstname] = useState("");
  const [filterPresenceType, setFilterPresenceType] = useState("");
  const [filterSkillId, setFilterSkillId] = useState("");
  const [filterTeamId, setFilterTeamId] = useState("");

  // Get all unique skills from skills array in sorted order
  const uniqueSkills = useMemo(
    () => [...new Set(skills.map((skill) => skill.skillName).sort())],
    [skills]
  );
  // Get all unique teams from teams array in sorted order
  const uniqueTeams = useMemo(
    () =>
      teams
        .map((team) => ({ name: team.name, id: team.id }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [teams]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchSkillsAndTeams = async () => {
      try {
        const [skillsResponse, teamsResponse] = await Promise.all([
          apiBackEnd.get(URL_BACK_GET_ALL_SKILLS, { signal }),
          apiBackEnd.get(URL_BACK_GET_ALL_TEAMS, { signal }),
        ]);
        setSkills(skillsResponse.data);
        setTeams(teamsResponse.data.content);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Request was canceled.");
        } else {
          console.error("Error fetching skills or teams:", error);
        }
      }
    };
    fetchSkillsAndTeams();
    return () => {
      abortController.abort();
    };
  }, []);

  // Fetch interns data whenever the filters change
  useEffect(() => {
    // Create an AbortController instance
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchInterns = async () => {
      try {
        const response = await apiBackEnd.get(URL_BACK_GET_ALL_INTERNS, {
          params: {
            size: size,
            sort: `${sortingBy},${sortingDirection}`,
            page: currentPage,
            lastName: filterLastname,
            firstName: filterFirstname,
            presenceType: filterPresenceType,
            skillId: filterSkillId,
            teamId: filterTeamId,
          },
          signal,
        });
        setInterns(response.data.content);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setNumberOfElements(response.data.numberOfElements);
        setLoading(false);
        setError(null);
      } catch (error) {
        if (error.message === "AbortError") {
          console.error("La requete a été annulée.");
          setError("La requete a été annulée.");
        } else {
          if (error.response && error.response.status === 404) {
            console.error(error.response.data.message);
            setError(error.response.data.message);
            setInterns([]);
            setTotalElements(0);
            setTotalPages(0);
            setNumberOfElements(0);
            setLoading(false);
          } else {
            console.error("Erreur lors de la requete:", error);
            setError("Erreur lors de la requete. Veuillez réessayer plus tard");
            setLoading(false);
          }
        }
      }
    };
    fetchInterns();
    return () => {
      abortController.abort();
    };
  }, [
    size,
    sortingBy,
    sortingDirection,
    currentPage,
    filterLastname,
    filterFirstname,
    filterPresenceType,
    filterSkillId,
    filterTeamId,
  ]);

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
    params.append("lastName", filterLastname);
    params.append("firstName", filterFirstname);
    params.append("presenceType", filterPresenceType);
    params.append("skillId", filterSkillId);
    params.append("teamId", filterTeamId);
    // Append pagination and sorting states to the URLSearchParams
    params.append("size", size);
    params.append("page", currentPage);
    params.append("sort", `${sortingBy},${sortingDirection}`);
    // Get the current URL and update it with the new URLSearchParams
    const currentUrl = new URL(window.location.href);
    currentUrl.search = params.toString();
    // Use pushState to update the URL without a page reload
    window.history.pushState({}, "", currentUrl);
  }, [
    size,
    currentPage,
    sortingBy,
    sortingDirection,
    filterLastname,
    filterFirstname,
    filterPresenceType,
    filterSkillId,
    filterTeamId,
  ]);

  // DEBUT DE LA LOGIC POUR RECUPERER L'ETAT DES FILTRES DANS L'URL
  const parseQueryString = (url) => {
    const params = new URLSearchParams(url.search);
    // Extract filter states
    const lastName = params.get("lastName") || "";
    const firstName = params.get("firstName") || "";
    const presenceType = params.get("presenceType") || "";
    const skillId = params.get("skillId") || "";
    const teamId = params.get("teamId") || "";
    // Extract pagination and sorting states
    const size = Number(params.get("size")) || 10;
    const page = Number(params.get("page")) || 0;
    const sort = (params.get("sort") || "lastName,asc").split(",");
    return {
      filterLastname: lastName,
      filterFirstname: firstName,
      filterPresenceType: presenceType,
      filterSkillId: skillId,
      filterTeamId: teamId,
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
      filterLastname,
      filterFirstname,
      filterPresenceType,
      filterSkillId,
      filterTeamId,
      size,
      currentPage,
      sortingBy,
      sortingDirection,
    } = parsedParams;

    // Set the state variables to restore the previous settings
    setFilterLastname(filterLastname);
    setFilterFirstname(filterFirstname);
    setFilterPresenceType(filterPresenceType);
    setFilterSkillId(filterSkillId);
    setFilterTeamId(filterTeamId);
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
        <h3 className="principalTitle">Gestion des stagiaires</h3>
        <Loader />
      </div>
    );
  }

  // Create a variable to hold the props for InternListTableProps
  const InternListTableProps = {
    error: error,
    // Data sorting & pagination props
    data: interns,
    teams: teams,
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
    filterLastname: filterLastname,
    setFilterLastname: setFilterLastname,
    filterFirstname: filterFirstname,
    setFilterFirstname: setFilterFirstname,
    filterPresenceType: filterPresenceType,
    setFilterPresenceType: setFilterPresenceType,
    filterSkillId: filterSkillId,
    setFilterSkillId: setFilterSkillId,
    uniqueSkills: uniqueSkills,
    filterTeamId: filterTeamId,
    setFilterTeamId: setFilterTeamId,
    uniqueTeams: uniqueTeams,
  };

  return (
    <div>
      <h3 className="principalTitle m-5">Gestion des stagiaires</h3>
      <div className="container mx-auto px-4">
        <InternListTable {...InternListTableProps} />
        <button className='btn btn-primary mb-5'>
            Ajouter une review
        </button>
      </div>
    </div>
  );
}

export default Interns;
