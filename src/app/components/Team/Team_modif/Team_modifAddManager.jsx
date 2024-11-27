import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import apiBackEnd from '../../../services/api.backend';
import { URL_BACK_ADD_MEMBER_TO_TEAM, URL_BACK_GET_ALL_MANAGERS } from '../../../constants/url/urlBack';
import { toast } from 'react-toastify';
import StatusCodes from '../../../constants/StatusCodes/statusCodes';

function Team_modifAddManager({ team, close }) {

  const [managers, setManagers] = useState([])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchManagers = async () => {
      try {
        const response = await apiBackEnd.get(URL_BACK_GET_ALL_MANAGERS, { signal });
        if (response.data.length !== 0) {
          setManagers(response.data);
        } else {
          toast.warning("Aucun manager connu en base de donnée ! Veuillez en ajouter un avant de continuer");
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Request was canceled.');
        } else {
          toast.error("Erreur, retour de l'api:", error);
        }
      }
    };
    fetchManagers();
    return () => { abortController.abort(); };
  }, []);

  const handleSubmit = async (values) => {
    if (!values.managerToAdd) { toast.warning("Vous n'avez rien selectionné !"); return; }
    try {
      const response = await apiBackEnd.post(URL_BACK_ADD_MEMBER_TO_TEAM
        .replace(':teamId', team.id)
        .replace(':memberType', 'addManager')
        .replace(':memberId', values.managerToAdd));
      if (response.status === StatusCodes.OK) { toast.success(`Manager ajouté avec succès !`); close(); return; }
      toast.error("Aucun manager ajouté ! Veuillez réessayer");
      close();
    } catch (error) {
      if (error.response.status === StatusCodes.CONFLICT) { return toast.error("Ce manager est déjà dans l'équipe !"); }
      return toast.error(`Erreur, retour de l'api: ${error.message}`);
    }
  };

  return (
    <>
      <h5 className="text-center pb-8">Ajouter un membre à cette équipe :</h5>

      <Formik initialValues={{ managerToAdd: '' }} onSubmit={handleSubmit} >
        <Form>
          <div className="flex flex-col p-5 justify-center gap-5">
            <div>
              <label htmlFor="managerToAdd">Liste des managers:</label>
              <Field as="select" name="managerToAdd" id="managerToAdd" className={"input input-select"}>
                <option value="" className='input input-select'>Choisir un manager</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id} className='input input-option'>
                    {`${manager.firstName} ${manager.lastName}`}
                  </option>
                ))}
              </Field>
            </div>
          </div>
          <div className="flex flex-row p-5 justify-center gap-5">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
            <button type="button" className="btn btn-secondary" onClick={close}>
              Annuler
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default Team_modifAddManager