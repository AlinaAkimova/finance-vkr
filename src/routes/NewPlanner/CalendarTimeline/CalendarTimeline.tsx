import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';

import moment from 'moment';

import Timeline, {
  SidebarHeader,
  TimelineHeaders,
  DateHeader,
  ReactCalendarItemRendererProps,
  IntervalRenderer,
  Interval
} from 'react-calendar-timeline';

// Stores
import plannerStore from 'stores/PlannerStore';
import projectsStore from 'stores/ProjectsStore';

// Styles
import 'react-calendar-timeline/lib/Timeline.css';
import './CalendarTimeline.scss';

// Types
import { PlanerProjectTimeline } from 'types/planner';
import { User } from 'types/user';
import { IProject } from 'types/project';

// Components
import TabsView from 'components/Tabs/TabsView';
import PlannerAssignment from 'components/modals/PlannerAssignment';
import Loading from 'components/Loading';
import PlannerMember from '../PlannerMember';

const CalendarTimeline: FC = () => {
  const [activeUsersTab, setActiveUsersTab] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const { users, openedUsers } = plannerStore;
  const hasProject = !!users.find((user) => user.projects.length > 0);
  const [items, setItems] = useState<PlanerProjectTimeline[]>([]);

  const formatGroups = useMemo(
    () =>
      users.map((user) => {
        return {
          title: (
            <div
              onClick={() => {
                plannerStore.getPlannerUserProjects(user.id);
              }}
              style={{ cursor: 'pointer' }}
            >
              <PlannerMember user={user} />
            </div>
          ),
          ...user
        };
      }),
    [users]
  );

  const dataFormat = (data: string) => {
    const dataArray = data.split('/');
    return {
      month: dataArray[0],
      week: dataArray[1]
    };
  };

  const getPlannerProjects = () => {
    let projects: PlanerProjectTimeline[] = [];
    let curProject: PlanerProjectTimeline | null = null;
    const usersWithProject = users.filter((user) => user?.projects.length > 0);
    usersWithProject.map((user) => {
      user?.projects.map((project) => {
        curProject = {
          id: project.id,
          group: user.id,
          title: project.name,
          start_time: moment(project.startAt).valueOf() || moment().valueOf(),
          end_time:
            moment(project.endAt).valueOf() || moment().add('month').valueOf(),
          stackItems: true,
          color: project.colour
        };
        projects = [...projects, curProject];
        return null;
      });
      return null;
    });
    setItems(projects);
  };

  useEffect(() => {
    plannerStore.getPlannerUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      getPlannerProjects();
    }
  }, [users?.length]);

  const groups = formatGroups.filter(
    (group) =>
      !group.isProject || openedUsers.some((user) => user.userId !== group.id)
  );

  const updateProjectTime = (
    itemId: string,
    startTime: number,
    endTime: number,
    currentProject: PlanerProjectTimeline
  ) => {
    const currentUser = users.find((user) => user.id === currentProject?.group);
    const foundProject: IProject | undefined = currentUser?.projects.find(
      (project) => project.id === itemId
    );
    if (foundProject) {
      projectsStore.updateProjects(foundProject.id, {
        name: foundProject.name,
        startAt: moment(startTime).format(),
        endAt: moment(endTime).format(),
        manager: foundProject.manager
      });
    }
  };

  const handleItemResize = (itemId: string, time: number, edge: string) => {
    const currentProject = items.find((item) => item.id === itemId);
    if (currentProject) {
      updateProjectTime(
        itemId,
        edge === 'left' ? time : currentProject.start_time,
        edge === 'left' ? currentProject.end_time : time,
        currentProject
      );
    }
    if (items) {
      setItems((prevState) =>
        prevState.map((item) =>
          itemId === item.id
            ? {
                ...item,
                start_time: edge === 'left' ? time : item.start_time,
                end_time: edge === 'left' ? item.end_time : time
              }
            : item
        )
      );
    }
  };

  const handleItemMove = (itemId: string, dragTime: number) => {
    const currentProject = items.find((item) => item.id === itemId);
    if (currentProject) {
      updateProjectTime(
        itemId,
        dragTime,
        dragTime + (currentProject.end_time - currentProject.start_time),
        currentProject
      );
    }
    setItems((prevState) =>
      prevState.map((item) =>
        itemId === item.id
          ? {
              ...item,
              start_time: dragTime,
              end_time: dragTime + (item.end_time - item.start_time)
            }
          : item
      )
    );
  };

  const itemRenderer = (
    data: ReactCalendarItemRendererProps<PlanerProjectTimeline>
  ) => {
    const backgroundColor = data?.itemContext.selected
      ? '#4CAF50'
      : data.item.color || '#f36d25';
    return (
      <div
        {...data.getItemProps({
          style: {
            backgroundColor
          }
        })}
        className="item"
      >
        {data.itemContext.title}
      </div>
    );
  };

  const intervalRenderer = (data: IntervalRenderer<Interval> | undefined) => {
    return (
      <div {...data?.getIntervalProps()}>
        <div>
          {data?.intervalContext.intervalText
            ? dataFormat(data?.intervalContext.intervalText).week
            : null}
        </div>
        <div>
          {data?.intervalContext?.intervalText
            ? dataFormat(data?.intervalContext?.intervalText).month
            : null}
        </div>
      </div>
    );
  };

  const onItemDoubleClick = (itemId: string) => {
    const groupId = items?.find((item) => item.id === itemId)?.group;
    const user = users.find((group) => group.id === groupId);
    if (user) {
      setIsOpen(true);
      setFoundUser(user);
    }
  };

  return (
    <Box className="box">
      {items?.length === 0 && hasProject ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <Timeline
          groups={groups}
          items={items}
          itemRenderer={itemRenderer}
          canMove
          canResize="both"
          onItemDoubleClick={onItemDoubleClick}
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={1}
          lineHeight={64}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          defaultTimeStart={moment().startOf('week').toDate()}
          defaultTimeEnd={moment().startOf('month').add(1, 'month').toDate()}
          minZoom={1000 * 60 * 60 * 24 * 7 * 4}
        >
          <TimelineHeaders
            className="sticky"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div {...getRootProps()}>
                    <TabsView
                      activeTab={activeUsersTab}
                      setActiveTab={setActiveUsersTab}
                      tabs={['All', 'Employee', 'Contractor']}
                    />
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader
              unit="isoWeek"
              labelFormat="MMMM/W"
              height={33}
              intervalRenderer={intervalRenderer}
            />
            <DateHeader unit="day" labelFormat="D" />
          </TimelineHeaders>
        </Timeline>
      )}

      {foundUser ? (
        <PlannerAssignment
          active={isOpen}
          setActive={setIsOpen}
          user={foundUser}
        />
      ) : null}
    </Box>
  );
};

export default observer(CalendarTimeline);
