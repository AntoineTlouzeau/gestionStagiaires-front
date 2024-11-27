import { NavLink } from 'react-router-dom';
import { formattedSmallDate } from '../../../utils/formattedDate';
import { URL_INTERN } from '../../../constants/url/urlFront';


function LearningTeamList({ people, setModalSelector, openModal, team, teamId, setSelectedInternId, handleDeleteIntern }) {

    const handleDelete = (intern) => {
        handleDeleteIntern(intern);
    };
    const handleShowModal = (selector) => {
        setModalSelector(selector);
        openModal();
    };


    const getDaysDifference = (startDate) => {
        const start = new Date(startDate);
        const end = new Date();
        const differenceInTime = end.getTime() - start.getTime();
        return Math.floor(differenceInTime / (1000 * 3600 * 24));
    };


    const handleShowStatus = (days) => {
        if (days > 15) {
            return (<div className='pill-red'>⚠️<br />Déjà {days} jours !</div>);
        } else if (days > 0 && days < 15) {
            return (<div className='pill-green'>👍 <br />Encore {15 - days} jours !</div>);
        } else if (days === 0) {
            return (<div className='pill-green'>👍 <br />Commence today !</div>);
        } else if (days === 15) {
            return (<div className='pill-secondary'>🔥 <br />Dernier jour !</div>);
        } else if (days < 0) {
            return (<div className='pill-green'>👌 <br />Commence dans {-days} jours</div>);
        }
    };


    if (!people) {
        return (
            <div className="flex justify-center items-center">
                Aucun stagiaire en montée en compétence, au boulot !
            </div>
        );
    }

    return (
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
                        <div className="secondaryTitle">Début prévu :</div>
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/5">
                        <div className="secondaryTitle">Fin prévue :</div>
                    </th>
                </tr>
            </thead>

            <tbody className="bg-background-lightest dark:bg-background-dark  text-gray-900 dark:text-gray-100 divide-y divide-gray-200 whitespace-nowrap text-sm">
                {people.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-300 dark:hover:bg-gray-600">
                        <td className="px-6 py-2 w-1/5"><div className="">{item.lastName}</div></td>
                        <td className="px-6 py-2 w-1/5"><div className="">{item.firstName}</div></td>
                        <td className="px-6 py-2 w-1/5">{handleShowStatus(getDaysDifference(item.startDate))}</td>
                        <td className="px-6 py-2 w-1/5"><div className="">{formattedSmallDate(item.startDate)}</div></td>
                        <td className="px-6 py-2 w-1/5"><div className="">{formattedSmallDate(item.endDate)}</div></td>
                        <td className="px-6 py-2">
                            <NavLink to={URL_INTERN.replace('internId', item.id)} className="btn btn-primary w-full">Consulter</NavLink>
                        </td>
                        <td className="px-6 py-2">
                            <button className="btn btn-primary w-full" onClick={() => { handleShowModal('intern'); setSelectedInternId(item.id) }}>Modifier Dates</button>
                        </td>
                        <td className="px-6 py-2">
                            <button className="btn btn-secondary w-full" onClick={() => handleDelete(item)}>Suppr.</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default LearningTeamList