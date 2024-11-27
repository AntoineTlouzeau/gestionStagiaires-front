import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

function AddManagerModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber,
            password: password
        };

        axios.post('http://localhost:8080/managers/new-manager', data)
            .then(response => {
                setEmail('');
                setLastName('');
                setFirstName('');
                setPhoneNumber('');
                setPassword('');

                closeModal();
                alert(response.data); // Afficher le message retourné par l'API
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <div>
                <button className="btn btn-primary" onClick={openModal}>Ajouter</button>
                <Modal isOpen={modalOpen} close={closeModal} title="Ajouter un responsable">
                    <form onSubmit={handleSubmit} className="p-4" method='POST'>
                        <div className="mb-2">
                            <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full border p-2 rounded" />
                        </div>
                        <div className="mb-2">
                            <input type="text" id="lastName" placeholder='Lastname' value={lastName} onChange={(e) => setLastName(e.target.value)} required className="block w-full border p-2 rounded" />
                        </div>
                        <div className="mb-2">
                            <input type="text" id="firstName" placeholder='Firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="block w-full border p-2 rounded" />
                        </div>
                        <div className="mb-2">
                            <input type="tel" id="phoneNumber" placeholder='Phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="block w-full border p-2 rounded" />
                        </div>
                        <div className="mb-2">
                            <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full border p-2 rounded" />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary">Soumettre</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default AddManagerModal;