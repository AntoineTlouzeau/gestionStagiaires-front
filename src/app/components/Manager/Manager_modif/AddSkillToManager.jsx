import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import apiBackEnd from "../../../services/api.backend";
import { URL_BACK_MANAGER_ADD_SKILL } from "../../../constants/url/urlBack";
import Modal from '../../generic/Modal';
import Dropdown from '../../generic/Dropdown';

const DEFAULT_OPTION = "Choisir";

function AddSkillToManager(props) {
    const [technologies, setTechnologies] = useState([]);
    const [level, setLevel] = useState(0);

    useEffect( () => {
        getSkillInfo().then(r => console.log(r));
    }, [])

    const getSkillInfo = async () => {
        await apiBackEnd.get(`/skills/all`)
            .then(response => {
                let tech = [DEFAULT_OPTION]
                response.data.forEach(skill => tech.push(skill.skillName))
                setTechnologies(tech)
            })
    }

    const handleStar = (starValue) => {level !== starValue? setLevel(starValue) : setLevel(0)}

    const formik = useFormik({
        initialValues: {
            skill:"",
        },
        onSubmit: values => {
            if(values.skill === "" || values.skill === DEFAULT_OPTION){
                alert("Merci de choisir une technologie")
            }else{
                apiBackEnd.post(`${URL_BACK_MANAGER_ADD_SKILL}`, {
                    // eslint-disable-next-line react/prop-types
                    "managerId": props.managerId,
                    "skill": values.skill !== "Choisir"? values.skill : null,
                    "level": level
                })
            }
        },
    });

    return(
        <Modal>
            <form onSubmit={formik.handleSubmit} className={'form'}>
                <div className={'form-container'}>
                    <label htmlFor={'skill'}>Technologie</label>
                    <Dropdown id={'skill'} name={'skill'} handle={formik.handleChange} value={formik.values.skill} options={technologies} className={'dropdown'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'level'}>Niveau</label>
                    <div id={'level'}>
                        <button id={'1'} type={'button'} onClick={() => handleStar(1)} className={level >= 1?"text-5xl text-yellow-400":"text-5xl text-gray-400 dark:text-background-darker"}>&#9733;</button>
                        <button id={'2'} type={'button'} onClick={() => handleStar(2)} className={level >= 2?"text-5xl text-yellow-400":"text-5xl text-gray-400 dark:text-background-darker"}>&#9733;</button>
                        <button id={'3'} type={'button'} onClick={() => handleStar(3)} className={level >= 3?"text-5xl text-yellow-400":"text-5xl text-gray-400 dark:text-background-darker"}>&#9733;</button>
                    </div>
                </div>

                <button type={"submit"} className={'btn-form'}>Ajouter</button>
            </form>
        </Modal>
    )
}

export default AddSkillToManager;