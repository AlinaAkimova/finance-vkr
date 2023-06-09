import { ReactComponent as Team } from 'assets/icons/team.svg';
import { ReactComponent as ActiveTeam } from 'assets/icons/activeTeam.svg';
import { ReactComponent as Planner } from 'assets/icons/planner.svg';
import { ReactComponent as ActivePlanner } from 'assets/icons/activePlanner.svg';
import { ReactComponent as Clients } from 'assets/icons/clients.svg';
import { ReactComponent as ActiveClients } from 'assets/icons/activeClients.svg';
import { ReactComponent as Reports } from 'assets/icons/reports.svg';
import { ReactComponent as ActiveReports } from 'assets/icons/activeReports.svg';
import { ReactComponent as Settings } from 'assets/icons/tools.svg';
import { ReactComponent as Projects } from 'assets/icons/projects.svg';
import { ReactComponent as ActiveProjects } from 'assets/icons/activeProjects.svg';

export const sidebarList = [
  {
    icon: Planner,
    activeIcon: ActivePlanner,
    desc: 'Planner',
    page: 'new-planner',
    id: 12,
    badge: 0
  },
  {
    icon: Reports,
    activeIcon: ActiveReports,
    desc: 'Reports',
    page: 'reports',
    id: 13,
    badge: 2
  }
];
export const subListManagement = [
  {
    icon: Projects,
    activeIcon: ActiveProjects,
    desc: 'Projects',
    page: 'projects',
    id: 21,
    badge: 0
  },
  {
    icon: Team,
    activeIcon: ActiveTeam,
    desc: 'Team',
    page: 'team',
    id: 22,
    badge: 0
  },
  {
    icon: Clients,
    activeIcon: ActiveClients,
    desc: 'Clients',
    page: 'clients',
    id: 23,
    badge: 0
  },
  {
    icon: Settings,
    activeIcon: ActivePlanner,
    desc: 'Settings',
    page: 'settings',
    id: 3,
    badge: 0
  }
];
