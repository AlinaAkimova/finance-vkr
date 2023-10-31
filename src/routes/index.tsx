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
import Team from 'routes/Team';
import Clients from 'routes/Clients';
import Projects from 'routes/Projects';
import Reports from './Reports';

const Routes: FC = () => {
  const { isChecking } = authStore;

  if (isChecking) {
    return <Loading />;
  }

  return (
    <CRoutes>
      <Route path="/" element={<LoggedLayout />}>
        <Route index element={<Reports />} />
        <Route path="team" element={<Team />} />
        <Route path="projects" element={<Projects />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </CRoutes>
  )
};

export default observer(Routes);
