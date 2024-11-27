import { lazy, Suspense } from 'react';
import { Route, Routes as RouteContainer } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';


import * as URL from '../constants/url/urlFront';
import Loader from '../components/utils/Loader';

const Home = lazy(() => import('../pages/no-auth/Home'));
const Login = lazy(() => import('../pages/no-auth/Login'));
const Managers = lazy(() => import   ('../pages/auth/Managers'));
const Interns = lazy(() => import ('../pages/auth/Interns'));
const Teams = lazy(() => import ('../pages/auth/Teams'));
const TeamDetails = lazy(() => import ('../components/Team/Team_details/TeamDetails'));
const Reviews = lazy(() => import ('../pages/auth/Reviews'));
const ReviewDetails = lazy(() => import ('../components/Meeting/Review/Review_details/ReviewDetails'));
const Dailies = lazy(() => import ('../pages/auth/Dailies'));
const DailyDetails = lazy(() => import ('../components/Meeting/Daily/Daily_details/DailyDetails'));
const Testor = lazy(() => import ('../pages/tests/testor'));

const MyProfile = lazy(() => import ('../pages/auth/MyProfile'));

const LearningTeam = lazy( () => import ('../pages/auth/LearningTeam'));

const TeamDetailsTest = lazy(() => import ('../components/Team/Team_details/TeamDetailsMax'));
const InternDetails = lazy(() => import ('../components/Intern/Intern_details/InternDetails'));
const ManagerDetails = lazy(() => import ('../components/Manager/Manager_details/Manager_details'));

const ErrorPage = lazy(() => import('../pages/no-auth/ErrorPage'));
const NotFoundPage = lazy(() => import('../pages/no-auth/NotFoundPage'));

const Routes = () => {
    return (
        <RouteContainer>

            <Route path= {URL.URL_HOME} element={<MainLayout />} errorElement={<ErrorPage />}>
                <Route index element={<SuspenseComponent component={Home} />} />
                <Route path={URL.URL_LOGIN} element={<SuspenseComponent component={Login} />} />
                <Route path={URL.URL_MANAGERS} element={<SuspenseComponent component={Managers} />} />
                <Route path={URL.URL_INTERNS} element={<SuspenseComponent component={Interns} />} />
                <Route path={URL.URL_TEAMS} element={<SuspenseComponent component={Teams} />} />
                <Route path={URL.URL_REVIEWS} element={<SuspenseComponent component={Reviews} />} />
                <Route path={URL.URL_DAILIES} element={<SuspenseComponent component={Dailies} />} />
                <Route path={URL.URL_TEST} element={<SuspenseComponent component={Testor} />} />

                <Route path={URL.URL_MANAGER_PROFIL} element={<SuspenseComponent component={MyProfile} />} />

                <Route path={URL.URL_LEARNING_TEAM} element={<SuspenseComponent component={LearningTeam} />} />

                <Route path={URL.URL_TEAM} element={<SuspenseComponent component={TeamDetails} />} />
                <Route path={URL.URL_INTERN} element={<SuspenseComponent component={InternDetails} />} />
                <Route path={URL.URL_MANAGER} element={<SuspenseComponent component={ManagerDetails} />} />
                <Route path={URL.URL_REVIEW} element={<SuspenseComponent component={ReviewDetails} />} />
                <Route path={URL.URL_DAILY} element={<SuspenseComponent component={DailyDetails} />} />
            </Route>

            <Route path="*" element={<SuspenseComponent component={NotFoundPage} />} />

        </RouteContainer>
    );
};

export default Routes;

const SuspenseComponent = ({ component: Component, ...rest }) => (
    <Suspense fallback={<Loader />}>
        <Component {...rest} />
    </Suspense>
);