import { useEffect, useState } from 'react'
import { URL_BACK_NEW_TEAM } from "../../../constants/url/urlBack.js";
import { useFormik } from "formik";
import Dropdown from "../../generic/Dropdown.jsx";
import Modal from "../../generic/Modal.jsx";
import apiBackEnd from '../../../services/api.backend.js';

const DEFAULT_OPTION = "Choisir";

function NewTeam(props) {
    const [newSkill, setNewSkill] = useState('');
    const [skillList, setSkillList] = useState([]);
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
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

    const handleNewSkillChange = (event) => {
        setNewSkill(event.target.value);
    }

    const handleSkillAdding = () => {
        if (!skillList.some(skill => skill.skillName === newSkill) && newSkill !== DEFAULT_OPTION) {
            setSkillList([...skillList, { skillName: newSkill }]);
        }
    }

    const handleSkillRemoving = (skillName, event) => {
        event.preventDefault();

        setSkillList(skillList.filter(skill => skill.skillName !== skillName))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            projectStartDate: '',
            projectEndDate: '',
            isWeekEven: false,
            urlRepository: '',
            urlBacklog: ''
        },
        onSubmit: values => {
            apiBackEnd.post(`${URL_BACK_NEW_TEAM}`, {
                "name": values.name,
                "projectStartDate": values.projectStartDate,
                "projectEndDate": values.projectEndDate,
                "isWeekEven": values.isWeekEven,
                "urlRepository": values.urlRepository,
                "urlBacklog": values.urlBacklog,
                "skills": skillList
            })
        },
    });

    return (
        <Modal title={'Nouvelle équipe'} isOpen={props.isOpen} close={props.close}>
            <form onSubmit={formik.handleSubmit} className={'form'}>
                <div className={'form-container'}>
                    <label htmlFor={'name'}>Nom</label>
                    <input id={'name'} name={'name'} type={'text'} onChange={formik.handleChange} value={formik.values.name} className={'input'} />
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'projectStartDate'}>Date de début</label>
                    <input id={'projectStartDate'} name={'projectStartDate'} type={'date'} onChange={formik.handleChange} value={formik.values.projectStartDate} className={'input'} />
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'projectEndDate'}>Date de fin</label>
                    <input id={'projectEndDate'} name={'projectEndDate'} type={'date'} onChange={formik.handleChange} value={formik.values.projectEndDate} className={'input'} />
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'isWeekEven'}>Semaine impair</label>
                    <input id={'isWeekEven'} name={'isWeekEven'} type={'checkbox'} onChange={formik.handleChange} value={formik.values.isWeekEven} className={'checkbox'} />
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'urlRepository'}>URL repository</label>
                    <input id={'urlRepository'} name={'urlRepository'} type={'text'} onChange={formik.handleChange} value={formik.values.urlRepository} className={'input'} />
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'urlBacklog'}>URL backlog</label>
                    <input id={'urlBacklog'} name={'urlBacklog'} type={'text'} onChange={formik.handleChange} value={formik.values.urlBacklog} className={'input'} />
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'skills'}>Technologies</label>
                    <div id={'skills'}>
                        <Dropdown name={'skills'} handle={handleNewSkillChange} options={technologies} className={'dropdown'} />
                        <button name={'skills'} type={'button'} onClick={handleSkillAdding} className={'btn-form'}>Ajouter</button>
                    </div>
                    {skillList.map((skill) => (<button key={skill.skillName} type={'button'} onClick={(event) => handleSkillRemoving(skill.skillName, event)} className={'btn-card'}>{skill.skillName}</button>))}
                </div>

                <button type={"submit"} className={'btn-form'}>Créer</button>
            </form>
        </Modal>
    )
}

export default NewTeam;