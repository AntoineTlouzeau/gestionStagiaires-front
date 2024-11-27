import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import apiBackEnd from '../../../services/api.backend';
import { toast } from 'react-toastify';
import StatusCodes from '../../../constants/StatusCodes/statusCodes';
import * as Yup from 'yup';
import yupConfig from '../../../common/yupConfig';
import { URL_BACK_ADD_MEMBER_TO_TEAM, URL_BACK_GET_ALL_INTERNS, URL_BACK_GET_ALL_INTERNS_WITH_NAMES } from '../../../constants/url/urlBack';

function Team_modifAddIntern({ team, close, updateInterns }) {

  const [interns, setInterns] = useState([])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchInterns = async () => {
      try {
        const response = await apiBackEnd.get(URL_BACK_GET_ALL_INTERNS_WITH_NAMES, { signal });
        if (response.data) {
          setInterns(response.data);
        } else {
          toast.error("Aucun stagiaire connu en base de donnée ! Veuillez en ajouter un avant de continuer");
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return console.error('Request was canceled.');
        }
        toast.error("Erreur, retour de l'api:", error);
      }
    };
    fetchInterns();
    return () => { abortController.abort(); };
  }, []);

  const handleSubmit = async (values) => {
    if (!values.internToAdd) { toast.error("Vous n'avez rien selectionné !"); return; }
    const requestData = {
      startDate: values.startDate,
      endDate: values.endDate
    };
    if (!requestData.startDate || !requestData.endDate) {
      toast.warning("Vous n'avez pas renseigné de date de début et/ou de fin !");
      return;
    }
    try {
      const response = await apiBackEnd.post(URL_BACK_ADD_MEMBER_TO_TEAM
        .replace(':teamId', team.id)
        .replace(':memberType', 'addIntern')
        .replace(':memberId', values.internToAdd)
        , requestData);
      if (response.status === StatusCodes.OK) {
        toast.success("Stagiaire ajouté avec succès !");

        // Optimistic Update pour refresh le parent (check les props)
        updateInterns(prevInterns => [...prevInterns, response.data]);

        return;
      }
      toast.error("Aucun stagiaire ajouté ! Veillez réessayer.");
      close();
    } catch (error) {
      if (error.response.status === StatusCodes.CONFLICT) { return toast.error("Ce stagiaire est déjà dans l'équipe !"); }
      return toast.error(`Erreur, retour de l'api: ${error.message}`);
    }
  };

  const validationSchema = Yup.object().shape({
    internToAdd: Yup.string().required(yupConfig.mixed.required),
    startDate: Yup.date().required(yupConfig.mixed.required),
    endDate: Yup.date().required(yupConfig.mixed.required).test(
      'should-be-after-start',
      'Date de fin doit être supérieur à la date de début !',
      function (value) {
        const { startDate } = this.parent;
        if (value < startDate) {
          return false;
        }
        return true;
      }
    ),
  });

  return (
    <>
      <h5 className="text-center pb-8">Ajouter un membre à cette équipe :</h5>
      <Formik initialValues={{ internToAdd: '', startDate: '', endDate: '' }} validationSchema={validationSchema} onSubmit={handleSubmit} >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col p-5 justify-center gap-5">
              <div>
                <label htmlFor="internToAdd" className=''>Liste des stagiaires :</label>
                <Field as="select" name="internToAdd" id="internToAdd" className={"input input-select"}>
                  <option value="" className='input input-select'>Choisir un stagiaire</option>
                  {interns.map((intern) => (
                    <option key={intern.id} value={intern.id} className='input input-option'>
                      {`${intern.firstName} ${intern.lastName}`}
                    </option>
                  ))}
                </Field>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="startDate">Date de début du stagiaire :</label>
                <Field type="date" name="startDate" id="startDate" className={`input ${touched.startDate && errors.startDate ? "input-error" : "input"}`} />
                {errors.startDate && touched.startDate ? <div className='error-red'>{errors.startDate}</div> : null}
                <label htmlFor="endDate">Date de fin du stagiaire :</label>
                <Field type="date" name="endDate" id="endDate" className={`input ${touched.endDate && errors.endDate ? "input-error" : "input"}`} />
                {errors.endDate && touched.endDate ? <div className='error-red'>{errors.endDate}</div> : null}
              </div>
            </div>

            <div className="flex flex-row p-5 justify-center gap-5">
              <button type="submit" className="btn btn-primary">Ajouter</button>
              <button type="button" className="btn btn-secondary" onClick={close}>Annuler</button>
            </div>

          </Form>
        )}
      </Formik>
    </>
  )
}

export default Team_modifAddIntern