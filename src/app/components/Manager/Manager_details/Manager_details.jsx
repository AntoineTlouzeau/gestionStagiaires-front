import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../../generic/Modal';
import ManagerModification from '../Manager_modif/ManagerModif';

function Manager_details() {

    // STATES POUR TESTER
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => { setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); };
    const [manager, setManager] = useState({});
    const { managerId } = useParams();
    return (<>
        <div>ManagerDetails:</div>
        <div>managerId: {managerId}</div>
        <button onClick={openModal} className='btn'>Open Modal</button>
        <Modal isOpen={modalOpen} close={closeModal}>
            {managerId 
            ? (<ManagerModification managerId={managerId} close={closeModal}/>) 
            : (<div>Chargement...</div>)
            }
        </Modal>
    </>)
}

export default Manager_details