import React, { useEffect, useState } from 'react';
import { URL_BACK_GET_ONE_MEETING } from '../../../../constants/url/urlBack';
import Loader from '../../../utils/Loader';
import apiBackEnd from '../../../../services/api.backend';
import StatusCodes from '../../../../constants/StatusCodes/statusCodes';
import { formattedSmallDate } from '../../../../utils/formattedDate';
import DetailsComment from '../../../generic/DetailsComment.jsx';

const ReviewDetails = () => {
    const [review,setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const pathname = window.location.pathname.substring(1);
    const meetingId = Number(pathname.split("/")[1]); 

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchDataReview = async () => {
            try {   
                const dataReview = await apiBackEnd.get(URL_BACK_GET_ONE_MEETING.replace(':meetingId', meetingId), { signal });
                if (dataReview.status === StatusCodes.OK) {
                    setReview(dataReview.data);
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
        fetchDataReview();
        return () => { abortController.abort(); };
    }, []);  
    if (loading) {
        return (
            <div>
                <h3 className="principalTitle">Détails d'une review</h3>
                <Loader />
            </div>
        );
    }
    return (
        <>
            <h3 className="principalTitle">Détails de la review du {formattedSmallDate(review.meetingDate)}</h3>
            <div className='px-4 container mx-auto lg:w-2/3 xl:w-1/2'>
                <div className='reviewDetails bg-white dark:bg-background-dark rounded-xl p-5 w-full mb-4'>
                    <div className="flex flex-col-reverse md:flex-row">
                        <div className='w-full md:w-2/3 mb-4 lg:mr-6'>
                            <div className="secondaryTitle">Lieu :</div>
                            <div className="textDefault">{review.location}</div>
                            <table className='w-full mt-6 text-left'>
                                <thead className='w-full'>
                                    <tr>
                                        <th className='w-1/3 secondaryTitle'>Nom :</th>
                                        <th className='w-1/3 secondaryTitle'>Présence :</th>
                                        <th className='w-1/3 secondaryTitle'>Commentaire :</th>
                                    </tr>
                                </thead>
                                <tbody className='w-full my-2'>
                                {review.managersMeeting && review.managersMeeting.map((item, index) => (
                                    <tr key={index} className='border-t h-9'>
                                        <td className='w-1/3'><p className="textDefault">{item.manager.lastName} {item.manager.firstName}</p>
                                        </td>
                                        <td className='w-1/3'><span className='pill pill-primary'>Responsable</span></td>
                                        <td className='w-1/3'></td>
                                    </tr>
                                    
                                ))}
                                {review.internsMeeting && review.internsMeeting.map((item, index) => {
                                    let presenceText = "";
                                    let presenceClass="";
                                    if (item.meetingPresenceType === "PRESENT") {
                                        presenceText = "Présent";
                                        presenceClass = "pill-green";
                                    } else if (item.meetingPresenceType === "ABSENT_JUSTIFIE") {
                                        presenceText = "Absent justifié";
                                        presenceClass = "pill-secondary";
                                    } else if (item.meetingPresenceType === "ABSENT_NON_JUSTIFIE") {
                                        presenceText = "Absent non justifié";
                                        presenceClass = "pill-red";
                                    }

                                    return (
                                        <tr key={index} className='border-t h-9'>
                                            <td className='w-1/3'><p className="textDefault">{item.intern.lastName} {item.intern.firstName}</p>
                                            </td>
                                            <td className='w-1/3'><span className={`pill ${presenceClass}`}>{presenceText}</span></td>
                                            <td className='w-1/3 text-xs'>{item.comment}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className='w-full md:w-1/3 flex flex-col mb-4'>
                            <button className='btn btn-primary mb-3'>Modif. présences</button>
                            <button className='btn btn-primary mb-3'>Modif. commentaire</button>
                            <div className='flex flex-row'>
                                <button className='btn btn-primary mr-3 w-1/2'>Modif. lieu</button>
                                <button className='btn btn-secondary w-1/2'>Supprimer</button>
                            </div>
                        </div>
                    </div>
                    <div>                        
                        <div className="secondaryTitle mt-4">Commentaire de la review :</div>                        
                        <div className="textDefault"><DetailsComment text={review.comment} /></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewDetails;