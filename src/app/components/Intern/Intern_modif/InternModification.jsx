import {useFormik} from "formik";
import Modal from "../../generic/Modal";
import apiBackEnd from "../../../services/api.backend";
import { URL_BACK_GET_ALL_SKILLS, URL_BACK_INTERN_MODIF } from "../../../constants/url/urlBack";
import Dropdown from "../../generic/Dropdown";


function InternModification(props) {
    const presenceTypes = {
        NOT_SELECTED:"Choisir",
        REMOTE:"DISTANCIEL",
        ON_SITE:"PRESENTIEL",
        HYBRID:"HYBRIDE"
    }
    const presenceOptions = Object.keys(presenceTypes).map((presenceType) => {return presenceTypes[presenceType]})

    const formik = useFormik({
        initialValues: {
            email:"",
            lastName:"",
            firstName:"",
            presenceType:presenceTypes.NOT_SELECTED,
            trainings:"",
            urlCv:"",
            hiredBy:"",
            hiredAt:"",
            phoneNumber:""
        },
        onSubmit: async(values) => {
            const response = await apiBackEnd.patch(`${URL_BACK_INTERN_MODIF}`, {
                // eslint-disable-next-line react/prop-types
                "id": props.internId,
                "email": values.email !== ""? values.email : null,
                "lastName": values.lastName !== ""? values.lastName : null,
                "firstName": values.firstName !== ""? values.firstName : null,
                "presenceType": values.presenceType !== presenceTypes.NOT_SELECTED? values.presenceType : null,
                "trainings": values.trainings !== ""? values.trainings : null,
                "urlCv": values.urlCv !== ""? values.urlCv : null,
                "hiredBy": values.hiredBy !== ""? values.hiredBy : null,
                "hiredAt": values.hiredAt !== ""? values.hiredAt : null,
                "phoneNumber": values.phoneNumber !== ""? values.phoneNumber : null
            });
        },
    });

    return (
        <Modal isOpen={props.isOpen} close={props.close}>
            <form onSubmit={formik.handleSubmit} className={'form'}>
                <div className={'form-container'}>
                    <label htmlFor={'email'}>Email</label>
                    <input id={'email'} name={'email'} type={'text'} onChange={formik.handleChange} value={formik.values.email} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'lastName'}>Nom</label>
                    <input id={'lastName'} name={'lastName'} type={'text'} onChange={formik.handleChange} value={formik.values.lastName} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'firstName'}>Prénom</label>
                    <input id={'firstName'} name={'firstName'} type={'text'} onChange={formik.handleChange} value={formik.values.firstName} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'presenceType'}>Type de présence</label>
                    <Dropdown id={'presenceType'} name={'presenceType'} handle={formik.handleChange} value={formik.values.presenceType} options={presenceOptions} className={'dropdown'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'trainings'}>Formation</label>
                    <input id={'trainings'} name={'trainings'} type={'text'} onChange={formik.handleChange} value={formik.values.trainings} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'hiredBy'}>Recrutement post formation</label>
                    <input id={'hiredBy'} name={'hiredBy'} type={'text'} onChange={formik.handleChange} value={formik.values.hiredBy} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'hiredAt'}>Date de recrutement</label>
                    <input id={'hiredAt'} name={'hiredAt'} type={'date'} onChange={formik.handleChange} value={formik.values.hiredAt} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'phoneNumber'}>Téléphone</label>
                    <input id={'phoneNumber'} name={'phoneNumber'} type={'text'} onChange={formik.handleChange} value={formik.values.phoneNumber} className={'input'}/>
                </div>

                <button type={"submit"} className={'btn-form'}>Modifier</button>
            </form>
        </Modal>
    )
}

export default InternModification;