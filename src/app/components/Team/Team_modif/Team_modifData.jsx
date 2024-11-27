import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import yupConfig from "../../../common/yupConfig";
import StatusCodes from "../../../constants/StatusCodes/statusCodes";
import { URL_BACK_UPDATE_TEAM } from "../../../constants/url/urlBack";
import apiBackEnd from "../../../services/api.backend";
import { toJavaDateFormat } from "../../../utils/formattedDate";
import { toast } from "react-toastify";

function Team_modifData({ team, close }) {

  const initialValues = {
    name: team.name || "",
    projectStartDate: new Date(team.projectStartDate).toISOString().slice(0, 10) || "",
    projectEndDate: new Date(team.projectEndDate).toISOString().slice(0, 10) || "",
    isWeekEven: team.isWeekEven !== null ? team.isWeekEven : true,
    url_repository: team.urlRepository || "",
    url_backlog: team.urlBacklog || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(yupConfig.mixed.required),
    projectStartDate: Yup.date().required(yupConfig.mixed.required),
    projectEndDate: Yup.date().required(yupConfig.mixed.required).test(
      'should-be-after-start',
      'Date de fin doit être supérieur à la date de début !',
      function (value) {
        const { projectStartDate } = this.parent;
        if (value < projectStartDate) {
          return false;
        }
        return true;
      }
    ),
    isWeekEven: Yup.boolean().required(yupConfig.mixed.required),
    url_repository: Yup.string().url(yupConfig.string.url).required(yupConfig.mixed.required),
    url_backlog: Yup.string().url(yupConfig.string.url).required(yupConfig.mixed.required),
  });

  const handleSubmit = async (values) => {

    const teamToUpdate = {
      id: team.id,
      name: values.name,
      startDate: values.projectStartDate,
      endDate: values.projectEndDate, 
      isWeekEven: values.isWeekEven,
      urlRepository: values.url_repository,
      urlBacklog: values.url_backlog,
    };

    const response = await apiBackEnd.put(URL_BACK_UPDATE_TEAM.replace(':teamId', team.id), teamToUpdate);
    if (response.status === StatusCodes.OK) {
      toast.success("L'équipe a été modifiée avec succès.");
      close();
    } else {
      toast.error("Erreur lors de la modification de l'équipe.");
    }
  };

  return (
    <>
      <h5 className="text-center pb-8">Modification de l'équipe :</h5>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
        {({ errors, touched, values, setFieldValue }) => (
          <Form >
            <div className="flex flex-row">
              <label className="">Nom de l'équipe :</label>
              <Field type="text" name="name" className={`input ${touched.name && errors.name ? "input-error" : "input"}`} />
              <ErrorMessage name="name" component="div" className="error-red" />
            </div>
            <div className="flex flex-col">
              <label className="">Début du projet :</label>
              <Field type="date" name="projectStartDate" className={`input ${touched.projectStartDate && errors.projectStartDate ? "input-error" : "input"}`} />
              <ErrorMessage name="projectStartDate" component="div" className="error-red" />
            </div>
            <div className="flex flex-col">
              <label>Fin du projet :</label>
              <Field type="date" name="projectEndDate" className={`input ${touched.projectEndDate && errors.projectEndDate ? "input-error" : "input"}`} />
              <ErrorMessage name="projectEndDate" component="div" className="error-red" />
            </div>
            <div>
              <div className="flex flex-row gap-5 my-3">
                <label>Review en semaine :</label>
                <label><Field type="radio" name="isWeekEven" value={true} checked={values.isWeekEven === true} onChange={() => setFieldValue('isWeekEven', true)} className={"radio mx-2"} />Paire</label>
                <label><Field type="radio" name="isWeekEven" value={false} checked={values.isWeekEven === false} onChange={() => setFieldValue('isWeekEven', false)} className={"radio mx-2"} />Impaire</label>
              </div>
              <ErrorMessage name="isWeekEven" component="div" className="error-red" />
            </div>
            <div className="flex flex-col">
              <label>Repository URL:</label>
              <Field type="url" name="url_repository" className={`input ${touched.url_repository && errors.url_repository ? "input-error" : "input"}`} />
              <ErrorMessage name="url_repository" component="div" className="error-red" />
            </div>

            <div className={`flex flex-col`}>
              <label>Backlog URL:</label>
              <Field type="url" name="url_backlog" className={`input ${touched.url_backlog && errors.url_backlog ? "input-error" : "input"}`} />
              <ErrorMessage name="url_backlog" component="div" className="error-red" />
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
    </>
  );
}

export default Team_modifData;
