import React from 'react';
import { formattedSmallDate } from "../../../utils/formattedDate";
import { formatDistanceToNow } from 'date-fns'

const CommentDetails = ({comment}) => {
    const timeAgo = formatDistanceToNow(new Date(comment.date), { addSuffix: true, locale: fr });

    return (
        <>
        <div className='commentList'>
            <div className='flex'>
                <div className='commentInfos'>
                    <div className="secondaryTitle">{comment.lastName} {comment.firstName}</div>
                    <p className="textDefault">{formattedSmallDate(item.projectStartDate)}</p>
                    <p className="textDefault">({timeAgo})</p>
                </div>
                <div className='comment'>
                    <p className="textDefault">{comment.text}</p>
                </div>
            </div>
            <div className="flex mt-2 justify-end">
                <button className='btn btn-primary mr-2'>Editer</button>  
                <button className='btn btn-secondary'>Supprimer</button> 
            </div> 
        </div>
            
        </>
    );
};

export default CommentDetails;