import React from "react";
import StaffDashboard from "./StaffDashboard.jsx";
import HodDashboard from "./HodDashboard.jsx";
import PrincipalDashboard from "./PrincipalDashboard.jsx";

export default function Dashboard(props) {
  const { user } = props;
  if (user.role === "Staff") return <StaffDashboard {...props} />;
  if (user.role === "HoD") return <HodDashboard {...props} />;
  if (user.role === "Principal") return <PrincipalDashboard {...props} />;
  return null;
}