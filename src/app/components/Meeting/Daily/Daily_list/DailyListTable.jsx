import { useState } from "react";
import { formattedSmallDate } from "../../../../utils/formattedDate";
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { NavLink } from "react-router-dom";
import DailyFilterBox from "./DailyFilterBox";
import SortingIcon from "../../../generic/SortingIcon.jsx";
import { URL_DAILY } from "../../../../constants/url/urlFront";

import { UserIcon } from '@heroicons/react/24/solid';

const DailyListTable = ({
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
    filterDate,
    setFilterDate,
    uniqueDate,
    filterLocation,
    setFilterLocation,
    filterTeamId,
    setFilterTeamId, 
    uniqueTeam,
    filterManager,
    setFilterManager,
    uniqueManager,
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

  // Affichage du nombre de membre logic
  function renderMembers(memberCount) {
    if (memberCount > 5) {
      return <span className="flex flex-row"><UserIcon className="w-4 h-4 text-primary dark:text-primary-darkest" />x{memberCount}</span>;
    } else if (memberCount > 0) {
      return Array.from({ length: Math.min(memberCount, 8) }, (_, index) => (
        <span key={index}><UserIcon className="w-4 h-4 text-primary dark:text-primary-darkest" /></span>
      ));
    } else {
      return <span className="sticker-red">Aucun</span>;
    }
  }

  return (
    <div className="mb-5 shadow overflow-x-auto border-b border-black-400 dark:border-b dark:border-white-400 rounded-lg border bg-gray-200 dark:bg-gray-600">
      {/* FILTER BOX & EXPORT LOGIC */}
      <div className="m-5 flex justify-between">
        <div>
          {filterBox &&
            <DailyFilterBox
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            uniqueDate={uniqueDate}
            filterLocation={filterLocation}
            setFilterLocation={setFilterLocation}
            filterTeamId={filterTeamId}
            setFilterTeamId={setFilterTeamId}
            uniqueTeam={uniqueTeam}
            filterManager={filterManager}
            setFilterManager={setFilterManager}
            uniqueManager={uniqueManager}
            />
          }
          <div className="flex flex-row">
            <button className="btn btn-primary rounded-full px-2 mx-2 my-2" onClick={toggleFilterBox}>
              <ChevronUpIcon className={`h-5 w-5 transition-transform ${filterBox ? 'transform rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {error && <div className="error-red m-2">{error}</div>}
          </div>
        </div>
      </div>

      {/* TABLE LOGIC */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="tracking-wider text-left">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleChangeSortAndSortDirection('teamId')}>
              <div className="flex secondaryTitle">Equipe :{sortingBy === 'teamId' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleChangeSortAndSortDirection('meetingDate')}>
              <div className="flex secondaryTitle">Date :{sortingBy === 'meetingDate' && <SortingIcon sortingDirection={sortingDirection} />}</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Lieu :</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Nombre de<br />membres :</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex secondaryTitle">Managers :</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-background-lightest dark:bg-background-darker text-gray-900 dark:text-gray-100 divide-y divide-gray-200 whitespace-nowrap text-sm">
          {data?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-300 dark:hover:bg-gray-600"> 
                <td className="px-6 py-4">{item.team.name}</td>
                <td className="hidden xl:table-cell px-6 py-4"><div className="">{formattedSmallDate(item.meetingDate)}</div></td>
                <td className="px-6 py-4"><div className=''>{item.location}</div></td>
                <td className="px-6 py-4">
                <div className="flex flex-wrap w-24">
                    {renderMembers(item.memberCount)}
                </div>
                </td>
              <td className="px-6 py-4">
                {item.managersMeeting.length > 0 ? (item.managersMeeting.map((manager, index) => (<span key={index} className="flex flex-col">- {manager.manager.firstName} {manager.manager.lastName}</span>))) : (<span className="sticker-red">Aucun</span>)}
              </td>
              <td className=""><div className=""><NavLink to={`${URL_DAILY.replace(':dailyId', item.id)}`} className="btn btn-primary">Editer</NavLink></div></td>
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

export default DailyListTable;