import React, { FC } from 'react';
import { Route, Routes as CRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// Components
import Loading from 'components/Loading';

// Layouts
import { LoggedLayout } from 'layouts/LoggedLayout';

// Stores
import authStore from 'stores/AuthStore';

// Routes
import Login from 'routes/Login';
import Team from 'routes/Team';
import Planner from 'routes/Planner';
import Clients from 'routes/Clients';
import Projects from 'routes/Projects';
import Reports from './Reports';
import Registration from './Registration';
import NewPlanner from './NewPlanner';

const Routes: FC = () => {
  const { isChecking, isLogin } = authStore;

  if (isChecking) {
    return <Loading />;
  }

  return (
    <CRoutes>
      {isLogin ? (
        <Route path="/" element={<LoggedLayout />}>
          <Route index element={<NewPlanner />} />
          <Route path="team" element={<Team />} />
          <Route path="projects" element={<Projects />} />
          <Route path="clients" element={<Clients />} />
          <Route path="reports" element={<Reports />} />
          <Route path="planner" element={<Planner />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </>
      )}
    </CRoutes>
  );
};

export default observer(Routes);
