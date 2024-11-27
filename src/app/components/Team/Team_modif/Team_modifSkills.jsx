import React, { useEffect, useState } from 'react'
import apiBackEnd from '../../../services/api.backend';
import { URL_BACK_ADD_SKILL_TO_TEAM_SKILL, URL_BACK_ADD_SKILL_TO_TEAM_TEAM, URL_BACK_GET_ALL_SKILLS } from '../../../constants/url/urlBack';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import StatusCodes from '../../../constants/StatusCodes/statusCodes';

function Team_modifSkills({ team, close }) {

  const [skills, setSkills] = useState([]);
  const teamSkills = team.skills.map(skill => skill.skillName);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchSkills = async () => {
      try {
        const response = await apiBackEnd.get(URL_BACK_GET_ALL_SKILLS, { signal });
        if (response.status === StatusCodes.OK) {
          setSkills(response.data);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Request was canceled.');
        } else {
          console.error('Error fetching skills:', error);
        }
      }
    };
    fetchSkills();
    return () => { abortController.abort(); };
  }, []);

  useEffect(() => {
    const teamSkills = team.skills.map(skill => skill.skillName);
    setSelectedSkills(teamSkills);
  }, [team]);

  const handleSubmit = async (values) => {
    const initialSkills = team.skills.map(skill => skill.skillName);
    const newSkills = selectedSkills.filter(skill => !initialSkills.includes(skill));

    for (const skillName of newSkills) {
      try {
        const encodedSkillName = encodeURIComponent(skillName);
        const response = await apiBackEnd.put(`${URL_BACK_ADD_SKILL_TO_TEAM_TEAM}/${team.id}/${URL_BACK_ADD_SKILL_TO_TEAM_SKILL}/${encodedSkillName}`);
        if (response.status === StatusCodes.OK) {
          toast.success(`Le langage ${skillName} a bien été ajouté à l'équipe ${team.name} !`);
        } else {
          toast.error(`Une erreur est survenue lors de l'ajout du langage ${skillName} à l'équipe ${team.name} !`);
        }
      } catch (error) {
        toast.error(`Une erreur est survenue lors de l'ajout du langage ${skillName} à l'équipe ${team.name} !`);
      }
    }
    setSelectedSkills([]);
    close();
  };

  const handleCheckboxChange = (value) => {
    setSelectedSkills(prevSkills => {
      if (prevSkills.includes(value)) {
        return prevSkills.filter(skill => skill !== value);
      } else {
        return [...prevSkills, value];
      }
    });
  };

  return (
    <>
      <h5 className="text-center pb-8">Ajouter un langage à cette équipe :</h5>
      <Formik initialValues={{ skillsToAdd: [] }} onSubmit={handleSubmit}>
        <Form>
          <div className="flex flex-col p-5 justify-center gap-5">
            <div>
              <label className='mb-4'>Liste des langages :</label>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.skillName} className="flex items-center gap-2">
                    <input
                      className='checkbox'
                      type="checkbox"
                      id={skill.skillName}
                      value={skill.skillName}
                      checked={selectedSkills.includes(skill.skillName)}
                      onChange={(e) => handleCheckboxChange(e.target.value)}
                      disabled={teamSkills.includes(skill.skillName)}
                    />
                    <label htmlFor={skill.skillName}>{skill.skillName}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row p-5 justify-center gap-5">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
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

export default Team_modifSkills