import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { URL_LOGIN } from '../../constants/url/urlFront';
import { toast } from 'react-toastify';
import { UserIcon } from '@heroicons/react/24/solid';

import apiBackEnd from '../../services/api.backend';
import { URL_BACK_GET_MANAGER_BY_EMAIL } from '../../constants/url/urlBack';
import { formatPhoneNumber } from '../../utils/formattedPhoneNumber';
import Loader from '../../components/utils/Loader';
import { renderSkillLevelAndStars } from '../../components/generic/renderSkillLevelAndStars';


//TODO DEAL WITH ERROR if no data

function MyProfile() {
    // On va chercher le state d'authentification dans redux
    const user = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchProfileData() {
            try {
                const response = await apiBackEnd.post(URL_BACK_GET_MANAGER_BY_EMAIL, {
                    email: user.email,
                }, {
                    signal: abortController.signal,
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error('Erreur lors de la récupération des données.');
                    setLoading(false);
                }
            }
        }
        fetchProfileData();
        return () => {
            abortController.abort();
        };
    }, [user.email]);

    if (!user.isAuthenticated) {
        toast.warning("Il faut s'identifier pour accéder à cette page!");
        return <Navigate to={URL_LOGIN} />;
    }
    if (loading) {
        return <div><Loader /></div>;
    }

    return (
        <div className="container mx-auto m-5 max-w-4xl">
            <div className="shadow overflow-hidden border-b border-black-400 dark:border-b dark:border-white-400 rounded-lg border bg-background-lightest dark:bg-background-dark text-center ">
                <div className='m-5'>
                    <UserIcon className="w-32 h-32 mx-auto text-primary dark:text-primary-darkest" />
                </div>
                <div className="justify-center flex flex-col">
                    <table className="table-auto">
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 font-bold text-center" colSpan="2">
                                    <h3>{profileData.firstName} {profileData.lastName}</h3>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-right">E-mail 📧 :</td>
                                <td className="px-4 py-2 font-semibold text-left">{profileData.email}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-right">Téléphone ☎️ :</td>
                                <td className="px-4 py-2 font-semibold text-left">{formatPhoneNumber(profileData.phoneNumber)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-right">Rôle 🔧 :</td>
                                <td className="px-4 py-2 text-left"><span className="pill-primary text-left">{profileData.roleName}</span></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-semibold text-right">Etat du compte :</td>
                                <td className="px-4 py-2 text-left">
                                    {profileData.isValidated ? (
                                        <span className="pill-green text-left">✅Compte validé</span>
                                    ) : (
                                        <span className="pill-red text-left">❎Compte non validé</span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='rounded-lg flex flex-col bg-gray-200 m-5 dark:bg-gray-300'>
                    <table className="table-auto m-5 bg-background dark:bg-background-dark rounded-xl ">
                        <tbody>
                            {profileData.skillsWithLevel.map((skill, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-2xl dark:text-background">{skill.skillName}</td>
                                    <td className="px-4 py-2">{renderSkillLevelAndStars(skill.level)}</td>
                                    <td className="px-4 py-2">
                                        <button className="btn btn-primary m-2">Modifier</button>
                                        <button className="btn btn-secondary m-2">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button className="btn btn-primary mb-5">Ajouter une nouvelle compétence</button>
                    </div>
                </div>

                <div className='justify-center flex flex-row gap-5 m-5 flex-wrap'>
                    <button className="btn btn-primary">Demander un nouveau mot de passe</button>
                    <button className="btn btn-primary">Modifier mes informations</button>
                    <button className="btn btn-secondary">Archiver mon compte</button>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;


