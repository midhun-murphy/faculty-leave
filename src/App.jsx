import React, { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [leaves, setLeaves] = useState([]); // Staff & HoD leave requests
  const [notifications, setNotifications] = useState([]);

  function handleLogin(role, userInfo) {
    setUser({ ...userInfo, role });
  }

  function handleLogout() {
    setUser(null);
  }

  // staff or hod can submit a leave
  function submitLeave(data) {
    setLeaves([
      ...leaves,
      {
        ...data,
        id: Date.now(),
        status: "Pending",
        history: [
          { action: "submitted", by: user.name, role: user.role, time: new Date().toLocaleString() }
        ]
      }
    ]);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `Leave application submitted (${data.leaveType})`,
        time: new Date().toLocaleString()
      }
    ]);
  }

  // HOD/Principal acts on leave
  function actOnLeave(id, action, forward = false) {
    setLeaves(leaves =>
      leaves.map(leave => {
        if (leave.id !== id) return leave;
        let status = action === "approve" ? "Approved" : "Rejected";
        if (action === "forward") status = "Forwarded";
        return {
          ...leave,
          status,
          history: [
            ...leave.history,
            {
              action: action === "forward" ? "forwarded" : action,
              by: user.name,
              role: user.role,
              time: new Date().toLocaleString()
            }
          ]
        };
      })
    );
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: `Leave ${action === "approve" ? "approved" : action === "reject" ? "rejected" : "forwarded"} by ${user.role}`,
        time: new Date().toLocaleString()
      }
    ]);
  }

  function addNotification(message) {
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message,
        time: new Date().toLocaleString()
      }
    ]);
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={10} px={4}>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard
            user={user}
            onLogout={handleLogout}
            leaves={leaves}
            onSubmitLeave={submitLeave}
            onActLeave={actOnLeave}
            notifications={notifications}
            addNotification={addNotification}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}