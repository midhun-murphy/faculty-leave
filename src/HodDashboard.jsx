import React from "react";
import { Heading, Button, Box, Divider } from "@chakra-ui/react";
import LeaveForm from "./LeaveForm.jsx";
import LeaveList from "./LeaveList.jsx";
import LeaveCalendar from "./LeaveCalendar.jsx";
import LeaveAnalytics from "./LeaveAnalytics.jsx";
import NotificationPanel from "./NotificationPanel.jsx";

export default function HodDashboard({
  user, onLogout, leaves, onSubmitLeave, onActLeave, notifications
}) {
  // FIX: Only staff leaves pending with stage "hod" show for HoD action
  const staffLeaves = leaves.filter(
    l => l.dept === user.dept && l.role === "Staff" && l.stage === "hod" && l.status === "Pending"
  );
  const myLeaves = leaves.filter(l => l.username === user.username);

  return (
    <Box maxW="xl" mx="auto" p={6} bg="white" boxShadow="md" borderRadius="md">
      <Heading mb={3}>HoD Dashboard</Heading>
      <Button onClick={onLogout} colorScheme="gray" size="sm" mb={4}>Logout</Button>
      <Heading size="md" mb={3}>Leave Requests from Staff</Heading>
      <LeaveList
        leaves={staffLeaves}
        user={user}
        onActLeave={onActLeave}
        actions={["approve", "reject", "forward"]}
      />
      <Divider my={4} />
      <LeaveCalendar leaves={leaves.filter(l => l.dept === user.dept && l.status === "Approved")} />
      <Divider my={4} />
      <Heading size="md" mb={3}>My Leaves (to Principal)</Heading>
      <LeaveForm
        onSubmit={data => onSubmitLeave({ ...data, username: user.username, name: user.name, dept: user.dept, role: "HoD" })}
        isHod
      />
      <LeaveList leaves={myLeaves} user={user} />
      <Divider my={4} />
      <LeaveAnalytics leaves={leaves.filter(l => l.dept === user.dept && l.role === "Staff")} />
      <Divider my={4} />
      <NotificationPanel notifications={notifications.filter(n =>
        n.message.toLowerCase().includes(user.username.toLowerCase())
      )} />
    </Box>
  );
}