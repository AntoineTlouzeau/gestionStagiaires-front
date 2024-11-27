import React, { useState } from 'react';
import { URL_INTERN, URL_MANAGER } from '../../../constants/url/urlFront';
import { formattedSmallDate } from "../../../utils/formattedDate";
import { NavLink } from 'react-router-dom';
import apiBackEnd from '../../../services/api.backend.js';
import { URL_BACK_DELETE_INTERN_FROM_TEAM_INTERN, URL_BACK_DELETE_INTERN_FROM_TEAM_TEAM, URL_BACK_DELETE_MANAGER_FROM_TEAM_MANAGER, URL_BACK_DELETE_MANAGER_FROM_TEAM_TEAM} from '../../../constants/url/urlBack';
import { toast } from 'react-toastify';
import StatusCodes from '../../../constants/StatusCodes/statusCodes';

function TeamDetailsList({ people, setModalSelector, openModal, team, teamId, setSelectedInternId }) {

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
  
  const handleShowModal = (selector) => {
    setModalSelector(selector);
    openModal();
};
return(
    <table className="min-w-full divide-y divide-gray-200 mb-2 text-center">
        <thead className="">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/5">
              <div className="secondaryTitle">Nom :</div>
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              <div className="secondaryTitle">Prénom :</div>
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              <div className="secondaryTitle">Statut:</div>
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              <div className="secondaryTitle">Date d'entrée :</div>
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              <div className="secondaryTitle">Date de sortie :</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-background-lightest dark:bg-background-dark  text-gray-900 dark:text-gray-100 divide-y divide-gray-200 whitespace-nowrap text-sm">
          {people?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-300 dark:hover:bg-gray-600">
              <td className="px-6 py-2 w-1/5"><div className="">{item.lastName}</div></td>
              <td className="px-6 py-2 w-1/5"><div className="">{item.firstName}</div></td>
              <td className="px-6 py-2 w-1/5"><div className={item.status == "Responsable" ? "pill-primary" : "pill-secondary"}>{item.status}</div></td>
              {item.status == "Responsable" && (<><td className="px-6 py-2 w-1/5"><div className="">-</div></td>
              <td className="px-6 py-2 w-1/5"><div className="">-</div></td></>)}
              {item.status == "Stagiaire" && (<><td className="px-6 py-2 w-1/5"><div className="">{formattedSmallDate(item.startDate)}</div></td>
              <td className="px-6 py-2 w-1/5"><div className="">{formattedSmallDate(item.endDate)}</div></td></>)}
              
              <td className="px-6 py-2">
                {item.status == "Responsable" && <NavLink to={`${URL_MANAGER.replace(':managerId', item.id)}`} className="btn btn-primary w-full">Editer</NavLink>}
                {item.status == "Stagiaire" && <button className="btn btn-primary w-full" onClick={() => {handleShowModal('intern'); setSelectedInternId(item.id)}}>Modifier Dates</button>}
                </td>
              <td className="px-6 py-2">
              {item.status == "Responsable" && <button className="btn btn-secondary w-full" onClick={()=> handleDeleteManager(item)}>Suppr.</button>}
              {item.status == "Stagiaire" && <button className="btn btn-secondary w-full" onClick={()=> handleDeleteIntern(item)}>Suppr.</button>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
)
}

export default TeamDetailsList;
