import React from "react";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";

export default function NotificationPanel({ notifications }) {
  if (!notifications || notifications.length === 0) return null;
  return (
    <Box my={3}>
      <Heading size="sm" mb={2}>Notifications</Heading>
      <List spacing={2}>
        {notifications.map(n => (
          <ListItem key={n.id}>
            {n.message} <span style={{ color: "#888", fontSize: "0.85em" }}>({n.time})</span>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}