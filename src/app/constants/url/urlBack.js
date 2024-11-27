//ACCOUNT:
export const URL_BACK_AUTHENTICATE = '/auth/authenticate';
export const URL_BACK_REGISTER = '/auth/register';
export const URL_BACK_MANAGER_MODIF = '/managers/update';
export const URL_BACK_MANAGER_ADD_SKILL = '/managers/add-skill';

export const URL_BACK_GET_ALL_INTERNS = '/interns';
export const URL_BACK_GET_ALL_INTERNS_WITH_NAMES = '/interns/all-lite';
export const URL_BACK_GET_ALL_MANAGERS = '/managers';
export const URL_BACK_GET_ALL_SKILLS = '/skills/all';
export const URL_BACK_GET_ONE_INTERN = '/interns/';
export const URL_BACK_GET_ALL_REVIEWS = '/meetings/reviews';
export const URL_BACK_GET_ALL_DAILIES = '/meetings/dailies';

export const URL_BACK_GET_ONE_TEAM = '/teams/:teamId';

// daily ou review sont tous des meeting avec un id propre (seul le typeMeeting change)
export const URL_BACK_GET_ONE_MEETING = '/meetings/:meetingId';

export const URL_BACK_GET_ALL_REVIEWS_FROM_TEAM = '/meetings/reviews/:teamId';
export const URL_BACK_GET_ALL_DAILIES_FROM_TEAM = '/meetings/dailies/:teamId';

// Add SKILL to a team:
export const URL_BACK_ADD_SKILL_TO_TEAM_TEAM = '/teams';
export const URL_BACK_ADD_SKILL_TO_TEAM_SKILL = 'skills';
// Delete SKILL from a team:
export const URL_BACK_DELETE_SKILL_FROM_TEAM_TEAM = '/teams';
export const URL_BACK_DELETE_SKILL_FROM_TEAM_SKILL = 'skills';
// Delete intern from a team:
export const URL_BACK_DELETE_INTERN_FROM_TEAM_TEAM = '/teams';
export const URL_BACK_DELETE_INTERN_FROM_TEAM_INTERN = 'removeIntern';
// Delete manager from a team:
export const URL_BACK_DELETE_MANAGER_FROM_TEAM_TEAM = '/teams';
export const URL_BACK_DELETE_MANAGER_FROM_TEAM_MANAGER = 'removeManager';
// Update a team :
export const URL_BACK_UPDATE_TEAM = '/teams/modifyTeam/:teamId';
// Update an intern's dates:
export const URL_BACK_UPDATE_INTERN_DATES = "/interns/modifyInternDates/:internId/:teamId";

// Add MEMBER to a team:(intern or manager)
export const URL_BACK_ADD_MEMBER_TO_TEAM = '/teams/:teamId/:memberType/:memberId';

// Get all interns from a teamid:
export const URL_BACK_GET_ALL_INTERNS_FROM_TEAM = '/teams/interns/:teamId';

// Get intern's dates with teamId:
export const URL_BACK_GET_INTERN_DATES = '/interns/:internId/:teamId';

//MANAGER:
export const URL_BACK_GET_MANAGER_BY_EMAIL = '/managers/profil';

//TEAM:
export const URL_BACK_GET_ALL_TEAMS = '/teams';

// INTERS:
export const URL_BACK_INTERN_MODIF = '/interns/update';
export const URL_BACK_INTERN_ADD_SKILL = '/interns/add-skill';
// NEW TEAM:
export const URL_BACK_NEW_TEAM = '/teams/new'; 