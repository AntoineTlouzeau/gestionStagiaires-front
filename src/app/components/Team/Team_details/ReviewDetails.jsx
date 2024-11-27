import React from 'react';
import { formattedSmallDate } from "../../../utils/formattedDate";
import DetailsComment from '../../generic/DetailsComment.jsx';
import { NavLink } from 'react-router-dom';
import { URL_REVIEW } from '../../../constants/url/urlFront';

const ReviewDetails = ({review}) => {
  
    return (
        <>
        <div className='reviewList mb-2'>
            <NavLink to={`${URL_REVIEW.replace(':reviewId', review.id)}`}>
            <div className="secondaryTitle mb-2 text-center">Review du {formattedSmallDate(review.meetingDate)}</div>
            <div className='bg-white rounded-xl p-2 reviewList-block'>
                <div className="flex">
                    <div className='w-2/5 mb-2'>
                        <div className="secondaryTitle">Lieu :</div>
                        <div className="textDefault">{review.location}</div>
                    </div>
                    <div className='w-3/5'>
                        <div className="secondaryTitle">Présences :</div>
                        <div className='presenceType'>
                            {review.managersMeeting && review.managersMeeting.map((item, index) => (
                                <p key={index} className="textDefault">
                                    - {item.manager.lastName} {item.manager.firstName} <span className='pill pill-primary'>Responsable</span>
                                </p>
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
                                    <p key={index} className="textDefault">- {item.intern.lastName} {item.intern.firstName} <span className={`pill ${presenceClass}`}>{presenceText}</span>
                                    </p>
                                );
                            })}

                        </div>
                    </div>

                </div>
                <div className='w-full'>
                    <div className="secondaryTitle">Commentaire :</div>
                    <div className="textDefault"><DetailsComment text={review.comment} /></div>
                </div>
            </div>
            </NavLink>
        </div>
        </>
    );
};

export default ReviewDetails;