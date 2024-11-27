import { useState } from "react";
import { formattedSmallDate, formattedLongDate } from "../../../utils/formattedDate";
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import ExportButton from "./ExportButton";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import FilterBox from "./FilterBox";
import SortingIcon from "./SortingIcon";
import { URL_BACK_GET_ALL_TEAMS } from "../../../constants/url/urlBack";
import { URL_LEARNING_TEAM, URL_TEAM } from "../../../constants/url/urlFront";

import { UserIcon } from '@heroicons/react/24/solid';

const TeamListTable = ({
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
  filterName,
  setFilterName,
  filterManagers,
  setFilterManagers,
  filterIsWeekEven,
  setFilterIsWeekEven,
  filterSkillId,
  setFilterSkillId,
  filterProjectState,
  setFilterProjectState,
  uniqueSkills,
  uniqueManagers,
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
    const newSortingDirection = sortingDirection === 'asc' ? 'desc' : 'asc';
    onSortingChange(newSortingBy, newSortingDirection);
  };

  // Filter box logic
  const [filterBox, setFilterBox] = useState(false);
  const toggleFilterBox = () => {
    setFilterBox((prevState) => !prevState);
  };

  // Date formatting logic
  const handleFormatState = (projectState) => {
    if (projectState === "j+0") {
      return <span className="w-24 h-8">Terminé<br /> ( today )</span>;
    }
    else {
      if (projectState.startsWith("j+")) {
        const days = parseInt(projectState.slice(2));
        return (
          <span className="w-24 h-8">
            Terminé <br />
            ({days} jour{days > 1 ? "s" : ""})
          </span>
        );
      } else if (projectState.startsWith("j-")) {
        const days = parseInt(projectState.slice(2));
        return <span className="w-24 h-8">A finir <br />({days} jour{days > 1 ? "s" : ""} )</span>;
      } else {
        return <span className="w-24 h-8">Oops erreur</span>;
      }
    }
  };
  


  // Copy to clipboard logic
  const handleCopyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success(`${url} copié dans le presse-papier !`);
      },
      () => {
        toast.error('Erreur lors de la copie dans le presse-papier !');
      }
    );
  };

  // Affichage du nombre de membre logic
  function renderMembers(memberCount) {
    if (memberCount > 5) {
      return <span className="flex flex-row"><UserIcon className="w-4 h-4 text-primary dark:text-primary-darkest" />x{memberCount}</span>;
    } else if (memberCount > 0) {
      return Array.from({ length: Math.min(memberCount, 8) }, (_, index) => (
        <span key={index}><UserIcon className="w-4 h-4 text-primary dark:text-primary-darkest" /></span>
      ));
    } else {
      return <span className="pill-red">Aucun</span>;
    }
  }

  return (
    <div className="mb-5 shadow overflow-x-auto border-b border-black-400 dark:border-b dark:border-white-400 rounded-lg border bg-gray-200 dark:bg-gray-600">
      {/* FILTER BOX & EXPORT LOGIC */}
      <div className="m-5 flex justify-between">
        <div>
          {filterBox &&
            <FilterBox
              filterName={filterName}
              setFilterName={setFilterName}
              filterManagers={filterManagers}
              setFilterManagers={setFilterManagers}
              filterIsWeekEven={filterIsWeekEven}
              setFilterIsWeekEven={setFilterIsWeekEven}
              filterSkillId={filterSkillId}
              setFilterSkillId={setFilterSkillId}
              filterProjectState={filterProjectState}
              setFilterProjectState={setFilterProjectState}
              uniqueSkills={uniqueSkills}
              uniqueManagers={uniqueManagers}
            />
          }
          <div className="flex flex-row">
            <button className="btn btn-primary rounded-full px-2 mx-2 my-2" onClick={toggleFilterBox}>
              <ChevronUpIcon className={`h-5 w-5 transition-transform ${filterBox ? 'transform rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {error && <div className="error-red m-2">{error}</div>}
          </div>
        </div>

        <div className="flex flex-row gap-5">
          <span><NavLink to={URL_LEARNING_TEAM}><button className="btn btn-small btn-secondary">Montées en compét.</button></NavLink></span>
          <span><ExportButton onExport={data} /></span>
        </div>

      </div>

      {/* TABLE LOGIC */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="tracking-wider text-left">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleChangeSortAndSortDirection('name')}>
              <div className="flex secondaryTitle">Nom :{sortingBy === 'name' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Langage:</div>
            </th>
            <th scope="col" className="hidden xl:table-cell px-6 py-3 cursor-pointer" onClick={() => handleChangeSortAndSortDirection('projectStartDate')}>
              <div className="flex secondaryTitle">Début :{sortingBy === 'projectStartDate' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="hidden xl:table-cell px-6 py-3 cursor-pointer" onClick={() => handleChangeSortAndSortDirection('projectEndDate')}>
              <div className="flex secondaryTitle">Fin :{sortingBy === 'projectEndDate' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleChangeSortAndSortDirection('isWeekEven')}>
              <div className="flex secondaryTitle">Semaine:{sortingBy === 'isWeekEven' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Nombre de<br />membres : {sortingBy === 'memberCount' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Managers:</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Etat du <br /> projet :{sortingBy === 'projectState' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            {/* <th scope="col" className="px-6 py-3"> */}
            {/* <div className="flex">Repository :</div> */}
            {/* </th> */}
            {/* <th scope="col" className="px-6 py-3"> */}
            {/* <div className="flex">Backlog :</div> */}
            {/* </th> */}
          </tr>
        </thead>

        <tbody className="bg-background-lightest dark:bg-background-darker text-gray-900 dark:text-gray-100 divide-y divide-gray-200 whitespace-nowrap text-sm">
          {data?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-300 dark:hover:bg-gray-600">
              <td className="px-6 py-4"><div className="w-12 whitespace-normal">{item.name}</div></td>
              <td className="px-6 py-4 flex flex-col">
                {item.skills.length > 0 ? (item.skills.map((skill, index) => (<span key={index} className="mb-1 flex flex-col">- {skill.skillName}</span>))) : (<span className="pill-red">- Aucun langage</span>)}
              </td>
              <td className="hidden xl:table-cell px-6 py-4"><div className="">{formattedSmallDate(item.projectStartDate)}</div></td>
              <td className="hidden xl:table-cell px-6 py-4"><div className="">{formattedSmallDate(item.projectEndDate)}</div></td>
              <td className="px-6 py-4"><div className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${item.isWeekEven ? 'pill-primary' : 'pill-secondary'}`}>{item.isWeekEven ? 'Paire' : 'Impaire'}</div></td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap w-24">
                  {renderMembers(item.memberCount)}
                </div>
              </td>
              <td className="px-6 py-4">
                {item.managers.length > 0 ? (item.managers.map((manager, index) => (<span key={index} className="flex flex-col">- {manager.firstName} {manager.lastName}</span>))) : (<span className="pill-red">Aucun</span>)}
              </td>
              <td className="px-6 py-4">
                <div className={`inline-flex text-center rounded-full px-2 text-xs font-semibold leading-5 ${item.projectState.startsWith("j+") ? 'pill-red' : 'pill-green'}`}>
                  {handleFormatState(item.projectState)}
                </div>
              </td>
              {/* <td className="px-6 py-4"><div className="flex flex-row"><a href={item.urlRepository} target="_blank" rel="noopener noreferrer" className="link">Consulter</a><button className="link ml-2" onClick={() => handleCopyToClipboard(item.urlRepository)}><ArrowUpOnSquareStackIcon className="h-5 w-5" /> </button></div></td> */}
              {/* <td className="px-6 py-4"><div className="flex flex-row"><a href={item.urlBacklog} target="_blank" rel="noopener noreferrer" className="link">Consulter</a><button className="link ml-2" onClick={() => handleCopyToClipboard(item.urlBacklog)}><ArrowUpOnSquareStackIcon className="h-5 w-5" /></button></div></td> */}
              <td className=""><div className=""><NavLink to={`${URL_TEAM.replace(':teamId', item.id)}`} className="btn btn-primary">Editer</NavLink></div></td>
              <td className=""><div className=""><button className="btn btn-secondary">Suppr.</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION LOGIC */}
      <nav className="flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-gray-600 border-t border-gray-200 sm:px-6">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700 dark:text-white">
            Affichage de <span className="font-medium">{numberOfElements}</span> sur <span className="font-medium">{totalElements}</span> résultats
          </p>
        </div>
        {/* Début option select */}
        <div className="flex-1 flex justify-between sm:justify-end items-center">
          <div className="flex items-center">
            <label htmlFor="pageSizeSelect" className="mr-2 text-sm text-gray-700 dark:text-white">Résultats par page:</label>
            <select id="pageSizeSelect" className="input-select input-option rounded-md shadow-sm" value={size} onChange={handlePageSizeChange}>
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button key={pageNumber} className={`btn btn-sm rounded-full ${pageNumber - 1 === currentPage ? 'bg-primary-lightest text-primary-darkest' : 'bg-background-lightest dark:bg-background-dark text-gray-800 dark:text-gray-100'}`} onClick={() => handlePageChange(pageNumber - 1)}> {pageNumber}</button>))}</div>
          <button className="btn rounded-full dark:text-white" onClick={handleNextPage}>
            🡪
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TeamListTable;