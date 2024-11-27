import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import InternModification from '../Intern_modif/InternModification';
import AddSkillToIntern from '../Intern_modif/AddSkillToIntern';
import Modal from '../../generic/Modal';

function InternDetails() {

    const [intern, setIntern] = useState({});
    const { internId } = useParams();

    // MODIF INTERNS MODAL
    const [modalOpenModif, setModalOpenModif] = useState(false);
    const openModalModif = () => { setModalOpenModif(true); };
    const closeModalModif = () => { setModalOpenModif(false); };
    // ADD SKILL
    const [modalOpenSkill, setModalOpenSkill] = useState(false);
    const openModalSkill = () => { setModalOpenSkill(true); };
    const closeModalSkill = () => { setModalOpenSkill(false); };

    return (<>
        <div>InternDetails:</div>
        <div>internId: {internId}</div>


        <button onClick={openModalModif} className='btn'>Open Modal Intern modification</button>
        <button onClick={openModalSkill} className='btn'>Open Modal Addskill </button>


        <InternModification isOpen={modalOpenModif} close={closeModalModif} internId={internId} />

        <AddSkillToIntern isOpen={modalOpenSkill} close={closeModalSkill} internId={internId} />



    </>)
}

export default InternDetails