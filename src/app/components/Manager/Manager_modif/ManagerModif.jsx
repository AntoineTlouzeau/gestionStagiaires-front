import React, {useEffect, useState} from 'react'
import {useFormik} from "formik";
import apiBackEnd from '../../../services/api.backend';
import { URL_BACK_MANAGER_MODIF } from '../../../constants/url/urlBack';
import Modal from '../../generic/Modal';
import Dropdown from '../../generic/Dropdown';


const DEFAULT_OPTION = "Choisir";

function ManagerModification(props) {
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect( () => {
        getRoleInfo().then(r => console.log(r));
    }, [])

    const getRoleInfo = async () => {
        await apiBackEnd.get(`/roles/all`)
            .then(response => {
                let options = [DEFAULT_OPTION]
                response.data.forEach(role => options.push(role.roleName))
                setRoleOptions(options)
            })
    }

    const formik = useFormik({
        initialValues: {
            email:"",
            lastName:"",
            firstName:"",
            phoneNumber:"",
            roleName:""
        },
        onSubmit: values => {
            apiBackEnd.post(`${URL_BACK_MANAGER_MODIF}`, {
                // eslint-disable-next-line react/prop-types
                "id": props.managerId,
                "email": values.email !== ""? values.email : null,
                "lastName": values.lastName !== ""? values.lastName : null,
                "firstName": values.firstName !== ""? values.firstName : null,
                "phoneNumber": values.phoneNumber !== ""? values.phoneNumber : null,
                "roleName": values.roleName !==""? values.roleName : null
            })
        },
    });

    return (
        <Modal>
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
                    <label htmlFor={'phoneNumber'}>Téléphone</label>
                    <input id={'phoneNumber'} name={'phoneNumber'} type={'text'} onChange={formik.handleChange} value={formik.values.phoneNumber} className={'input'}/>
                </div>
                <div className={'form-container'}>
                    <label htmlFor={'roleName'}>Role</label>
                    <Dropdown id={'roleName'} name={'roleName'} handle={formik.handleChange} value={formik.values.roleName} options={roleOptions} className={'dropdown'}/>
                </div>

                <button type={"submit"} className={'btn-form'}>Modifier</button>
            </form>
        </Modal>
    )
}

export default ManagerModification;