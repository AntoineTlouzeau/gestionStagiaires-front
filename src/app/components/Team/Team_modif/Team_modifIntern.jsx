import { useEffect, useState } from "react";
import { URL_BACK_GET_INTERN_DATES, URL_BACK_GET_ONE_INTERN, URL_BACK_UPDATE_INTERN_DATES } from "../../../constants/url/urlBack";
import * as Yup from "yup";
import yupConfig from "../../../common/yupConfig";
import { ErrorMessage, Field, Form, Formik } from "formik";
import apiBackEnd from "../../../services/api.backend";
import Spinner from "../../utils/Spinner";
import { toast } from "react-toastify";
import StatusCodes from "../../../constants/StatusCodes/statusCodes";

function Team_modifIntern({ internId, team, close, updatedDates }) {

    const teamId = team.id;

    const [intern, setIntern] = useState([]);
    const [initialValues, setInitialValues] = useState(null);
    const validationSchema = Yup.object({
        startDate: Yup.date().required(yupConfig.mixed.required),
        endDate: Yup.date()
            .when("startDate", (startDate, schema) => startDate && schema.min(startDate, yupConfig.date.min))
            .required(yupConfig.mixed.required),
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const fetchIntern = async () => {
            try {
                const response = await apiBackEnd.get(URL_BACK_GET_INTERN_DATES.replace(':internId', internId).replace(':teamId', teamId), { signal });
                if (response.data) {
                    setIntern(response.data);
                    setInitialValues({
                        startDate: new Date(response.data?.startDate).toISOString().slice(0, 10) || "",
                        endDate: new Date(response.data?.endDate).toISOString().slice(0, 10) || "",
                    });
                } else {
                    toast.error("Erreur lors de la récupération du stagiaire.");
                }
            } catch (error) {
                if (error.name === 'AbortError') {
                    toast.error('Request was canceled.');
                } else {
                    toast.error('Error fetching intern:', error);
                }
            }
        };
        fetchIntern();
        return () => { abortController.abort(); };
    }, [internId]);

    const handleSubmit = async (values) => {

        const internDatesToUpdate = {
            startDate: values.startDate,
            endDate: values.endDate,
        };
        const response = await apiBackEnd.put(URL_BACK_UPDATE_INTERN_DATES.replace(':internId', intern.id).replace(':teamId', teamId), internDatesToUpdate);
        if (response.status === StatusCodes.OK) {
            toast.success("Les dates ont été modifiées avec succès.");

            // Optimistic Update pour refresh le parent (check les props)
            updatedDates((prevInterns) => {
                // Find the updated intern in the list and replace it with the new data
                return prevInterns.map((internItem) => {
                    if (internItem.id === intern.id) {
                        return { ...internItem, ...response.data };
                    }
                    return internItem;
                });
            });

            close();
        } else {
            toast.error("Erreur lors de la modification des dates.");
        }
    };

    if (!initialValues) { return (<Spinner />) }

    return (
        <>
            <h5 className="text-center pb-8">Modification du stagiaire :</h5>
            <div className="flex flex-row justify-center gap-5">
                <p className="flex flex-col p-5">
                    <label className="">Nom : {intern.lastName}</label>
                    <label className="">Prénom : {intern.firstName}</label>
                </p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <div className="flex flex-col p-5">
                            <label className="">Date d'entrée :</label>
                            <Field type="date" name="startDate" className={`input ${touched.startDate && errors.startDate ? "input-error" : "input"}`} />
                            <ErrorMessage name="startDate" component="div" className="error-red" />
                        </div>
                        <div className="flex flex-col p-5">
                            <label>Date de sortie :</label>
                            <Field type="date" name="endDate" className={`input ${touched.endDate && errors.endDate ? "input-error" : "input"}`} />
                            <ErrorMessage name="endDate" component="div" className="error-red" />
                        </div>
                        <div className="flex flex-row p-5 justify-center gap-5">
                            <button type="submit" className="btn btn-primary">
                                Valider
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={close}>
                                Annuler
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>)
}

export default Team_modifIntern