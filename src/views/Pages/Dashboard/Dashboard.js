import React from "react";
import { Row } from "reactstrap";
import CalendarWidget from "./../../Widgets/Calendar/Widget";
import PayslipWidget from "./../../Widgets/Payslip/Widget";
import InformationWidget from "./../../Widgets/Information/Widget";
import AnnouncementWidget from "./../../Widgets/Announcement/Widget";
import InformationPanel from "./../../Information/DashboardPanel";
import AnnouncementPanel from "./../../Announcement/DashboardPanel";

const Dashboard = () => {
  return (
    <div className="animated fadeIn">
      <Row>
        <CalendarWidget />
        <PayslipWidget />
        <InformationWidget />
        <AnnouncementWidget />
      </Row>
      <Row>
        <InformationPanel />
        <AnnouncementPanel />
      </Row>
    </div>
  );
};

export default Dashboard;
