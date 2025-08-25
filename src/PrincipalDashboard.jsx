import React from "react";
import { Heading, Button, Box, Divider } from "@chakra-ui/react";
import LeaveList from "./LeaveList.jsx";
import LeaveCalendar from "./LeaveCalendar.jsx";
import LeaveAnalytics from "./LeaveAnalytics.jsx";
import NotificationPanel from "./NotificationPanel.jsx";

export default function PrincipalDashboard({
  user, onLogout, leaves, onActLeave, notifications
}) {
  const pendingLeaves = leaves.filter(l =>
    (l.role === "HoD" || l.status === "Forwarded") && l.status !== "Approved" && l.status !== "Rejected"
  );
  return (
    <Box maxW="xl" mx="auto" p={6} bg="white" boxShadow="md" borderRadius="md">
      <Heading mb={3}>Principal Dashboard</Heading>
      <Button onClick={onLogout} colorScheme="gray" size="sm" mb={4}>Logout</Button>
      <Heading size="md" mb={3}>Pending Leave Requests</Heading>
      <LeaveList
        leaves={pendingLeaves}
        user={user}
        onActLeave={onActLeave}
        actions={["approve", "reject"]}
      />
      <Divider my={4} />
      <LeaveCalendar leaves={leaves.filter(l => l.status === "Approved")} college />
      <Divider my={4} />
      <LeaveAnalytics leaves={leaves} principal />
      <Divider my={4} />
      <NotificationPanel notifications={notifications.filter(n =>
        n.message.toLowerCase().includes(user.username.toLowerCase())
      )} />
    </Box>
  );
}