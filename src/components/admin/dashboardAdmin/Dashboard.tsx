'use client';
import React, {
  Fragment,
  createContext,
  useReducer,
  Dispatch,
  ReactNode,
} from 'react';
import AdminLayout from '../layout/AdminLayout';
import DashboardCard from './DashboardCard';
import Customize from './Customize';
import TodaySell from './TodaySell';
import {
  DashboardContext,
  dashboardReducer,
  dashboardstate,
} from './dashboardContext';

const DashboardComponent: React.FC = () => {
  return (
    <Fragment>
      <DashboardCard />
      <Customize />
      <TodaySell />
    </Fragment>
  );
};

const DashboardAdmin: React.FC = (props) => {
  const [data, dispatch] = useReducer(dashboardReducer, dashboardstate);
  return (
    <Fragment>
      <DashboardContext.Provider value={{ data, dispatch }}>
        <AdminLayout>{<DashboardComponent />}</AdminLayout>
      </DashboardContext.Provider>
    </Fragment>
  );
};

export default DashboardAdmin;
