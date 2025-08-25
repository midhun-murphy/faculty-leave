import React, { useState } from "react";
import { Heading, Button, Box, Divider } from "@chakra-ui/react";
import LeaveForm from "./LeaveForm.jsx";
import LeaveList from "./LeaveList.jsx";
import NotificationPanel from "./NotificationPanel.jsx";

export default function StaffDashboard({ user, onLogout, leaves, onSubmitLeave, notifications }) {
  const [filter, setFilter] = useState("All");
  const myLeaves = leaves.filter(l => l.username === user.username);

  const filteredLeaves =
    filter === "All" ? myLeaves : myLeaves.filter(l => l.status === filter);

  // FIX: When staff applies leave, set role, stage, and status
  function handleSubmit(data) {
    onSubmitLeave({
      ...data,
      username: user.username,
      name: user.name,
      dept: user.dept,
      role: "Staff",
      stage: "hod",
      status: "Pending"
    });
  }

  return (
    <Box maxW="xl" mx="auto" p={6} bg="white" boxShadow="md" borderRadius="md">
      <Heading mb={3}>Staff Dashboard</Heading>
      <Button onClick={onLogout} colorScheme="gray" size="sm" mb={4}>Logout</Button>
      <LeaveForm onSubmit={handleSubmit} />
      <Divider my={4} />
      <Heading size="md" mb={3}>My Leave Applications</Heading>
      <Box mb={2}>
        <Button size="xs" onClick={() => setFilter("All")}>All</Button>
        <Button size="xs" ml={2} colorScheme="yellow" onClick={() => setFilter("Pending")}>Pending</Button>
        <Button size="xs" ml={2} colorScheme="green" onClick={() => setFilter("Approved")}>Approved</Button>
        <Button size="xs" ml={2} colorScheme="red" onClick={() => setFilter("Rejected")}>Rejected</Button>
      </Box>
      <LeaveList leaves={filteredLeaves} user={user} />
      <Divider my={4} />
      <NotificationPanel notifications={notifications.filter(n =>
        n.message.toLowerCase().includes(user.username.toLowerCase())
      )} />
    </Box>
  );
}