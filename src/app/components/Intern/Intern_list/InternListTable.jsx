import { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { URL_BACK_GET_ALL_INTERNS, URL_BACK_GET_ONE_INTERN } from "../../../constants/url/urlBack";
import InternsFilterBox from "./InternsFilterBox";
// import SortingIcon from "../../Team/Team_list/SortingIcon";
// import ExportButton from "../../Team/Team_list/ExportButton";
import SortingIcon from "./SortingIcon";
import ExportButton from "./ExportButton";
import { URL_LEARNING_TEAM } from "../../../constants/url/urlFront";

const InternListTable = ({
  error,
  // Data sorting & pagination props
  data,
  totalElements,
  numberOfElements,
  totalPages,
  size,
  currentPage,
  sortingBy,
  sortingDirection,
  onPageSizeChange,
  onPageChange,
  onSortingChange,
  // Filterbox props
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
  // Résultat par page logic
  const pageSizeOptions = [2, 5, 10, totalElements];

  // Pagination logic
  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    onPageSizeChange(newSize);
    onPageChange(0);
  };
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1);
    }
  };

  // Sorting logic
  const handleChangeSortAndSortDirection = (newSortingBy) => {
    const newSortingDirection = sortingDirection === "asc" ? "desc" : "asc";
    onSortingChange(newSortingBy, newSortingDirection);
  };

  // Filter box logic
  const [filterBox, setFilterBox] = useState(false);
  const toggleFilterBox = () => {
    setFilterBox((prevState) => !prevState);
  };

  // Render type de présence logic
  const renderPresenceType = (presenceType) => {
    switch (presenceType) {
      case "HYBRIDE":
        return <span className="pill-primary">Hybride</span>;
      case "PRESENTIEL":
        return <span className="pill-secondary">Présentiel</span>;
      case "DISTANCIEL":
        return <span className="pill-tertiary">Distanciel</span>;
      default:
        return <span className="pill-red">Inconnu</span>;
    }
  };


  return (
    <div className="mb-5 shadow overflow-x-auto border-b border-black-400 dark:border-b dark:border-white-400 rounded-lg border bg-gray-200 dark:bg-gray-600">
      {/* FILTER BOX & EXPORT LOGIC */}
      <div className="m-5 flex justify-between">
        <div>
          {filterBox && (
            <InternsFilterBox
              filterLastname={filterLastname}
              setFilterLastname={setFilterLastname}
              filterFirstname={filterFirstname}
              setFilterFirstname={setFilterFirstname}
              filterPresenceType={filterPresenceType}
              setFilterPresenceType={setFilterPresenceType}
              filterSkillId={filterSkillId}
              setFilterSkillId={setFilterSkillId}
              uniqueSkills={uniqueSkills}
              filterTeamId={filterTeamId}
              setFilterTeamId={setFilterTeamId}
              uniqueTeams={uniqueTeams}
            />
          )}
          <div className="flex flex-row">
            <button
              className="btn btn-primary rounded-full px-2 mx-2 my-2"
              onClick={toggleFilterBox}
            >
              <ChevronUpIcon
                className={`h-5 w-5 transition-transform ${filterBox ? "transform rotate-180" : ""
                  }`}
                aria-hidden="true"
              />
            </button>
            {error && <div className="error-red m-2">{error}</div>}
          </div>
        </div>
        <span>
          <div className="flex flex-row gap-5">
            <span><NavLink to={URL_LEARNING_TEAM}><button className="btn btn-small btn-secondary">Montées en compét.</button></NavLink></span>
            <ExportButton onExport={data} />
          </div>
        </span>
      </div>

      {/* TABLE LOGIC */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className=" tracking-wider text-left">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleChangeSortAndSortDirection("lastName")}
            >
              <div className="flex secondaryTitle">
                Nom:
                {sortingBy === "lastName" && (
                  <SortingIcon sortingDirection={sortingDirection} />
                )}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleChangeSortAndSortDirection("firstName")}
            >
              <div className="flex secondaryTitle">
                Prénom:
                {sortingBy === "firstName" && (
                  <SortingIcon sortingDirection={sortingDirection} />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Équipe:</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Compétence:</div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleChangeSortAndSortDirection("presenceType")}
            >
              <div className="flex secondaryTitle">
                Type de présence
                {sortingBy === "presenceType" && (
                  <SortingIcon sortingDirection={sortingDirection} />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Email:</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-background-lightest dark:bg-background-darker text-gray-900 dark:text-gray-100 divide-y divide-gray-200 whitespace-nowrap text-sm">
          {data?.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">
                <div className="">{item.lastName}</div>
              </td>
              <td className="px-6 py-4">
                <div className="">{item.firstName}</div>
              </td>
              <td className="px-6 py-4 ">
                {item.teams && item.teams.length > 0 ? (
                  item.teams.map((teamObj, index) => {
                    const teamName =
                      uniqueTeams.find((team) => team.id === teamObj.teamId)
                        ?.name || "Inconnu";
                    return (
                      <span key={index} className="mb-1 flex flex-col">
                        {teamName}
                      </span>
                    );
                  })
                ) : (
                  <span className="pill-red">Aucune !</span>
                )}
              </td>
              <td className="px-6 py-4">
                {item.skills && item.skills.length > 0
                  ? item.skills.map((skill, index) => (
                    <div key={index}>
                      {skill.skill} {Array(skill.level).fill("⭐").join("")}
                    </div>
                  ))
                  : <span className="pill-red">Aucune !</span>}
              </td>
              <td className="px-6 py-4">
                <div className="">{renderPresenceType(item.presenceType)}</div>
              </td>
              <td className="px-6 py-4">
                <div className="">{item.email}</div>
              </td>
              {/* <td className="px-6 py-4"><div className=""><NavLink to={`/intern/${item.id}`} className="btn btn-primary">Editer</NavLink></div></td>
              <td className="px-6 py-4"><div className=""><button className="btn btn-secondary">Suppr.</button></div></td> */}
              <td className=""><div className=""><NavLink to={`/intern/${item.id}`} className="btn btn-primary">Editer</NavLink></div></td>
              <td className=""><div className=""><button className="btn btn-secondary">Suppr.</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION LOGIC */}
      <nav className="flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-600 border-t border-gray-200 sm:px-6">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700 dark:text-white">
            Affichage de <span className="font-medium">{numberOfElements}</span>{" "}
            sur <span className="font-medium">{totalElements}</span> résultats
          </p>
        </div>
        {/* Début option select */}
        <div className="flex-1 flex justify-between sm:justify-end items-center">
          <div className="flex items-center">
            <label
              htmlFor="pageSizeSelect"
              className="mr-2 text-sm text-gray-700 dark:text-white"
            >
              Résultats par page:
            </label>
            <select
              id="pageSizeSelect"
              className="input-select input-option rounded-md shadow-sm"
              value={size}
              onChange={handlePageSizeChange}
            >
              {pageSizeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option === totalElements ? `Tous(${totalElements})` : option}
                </option>
              ))}
            </select>
          </div>
          {/* Début changement page logic */}
          <button className="btn rounded-full dark:text-white" onClick={handlePreviousPage}>
            🡨
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`btn btn-sm rounded-full ${pageNumber - 1 === currentPage
                      ? "bg-primary-lightest text-primary-darkest"
                      : "bg-background-lightest dark:bg-background-dark text-gray-800 dark:text-gray-100"
                    }`}
                  onClick={() => handlePageChange(pageNumber - 1)}
                >
                  {" "}
                  {pageNumber}
                </button>
              )
            )}
          </div>
          <button className="btn rounded-full dark:text-white" onClick={handleNextPage}>
            🡪
          </button>
        </div>
      </nav>
    </div>
  );
};

export default InternListTable;
