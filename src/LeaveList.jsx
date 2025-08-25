import React from "react";
import { Box, Text, Badge, VStack, Button } from "@chakra-ui/react";

export default function LeaveList({ leaves, user, onActLeave, actions }) {
  if (!leaves.length) return <Text>No leave applications found.</Text>;
  return (
    <VStack align="stretch" spacing={4}>
      {leaves.map(leave => (
        <Box key={leave.id} p={4} bg="gray.100" borderRadius="md">
          <Text><b>{leave.role || "Staff"}:</b> {leave.name}</Text>
          <Text><b>Type:</b> {leave.leaveType}</Text>
          <Text><b>Duration:</b> {leave.start} to {leave.end}</Text>
          <Text><b>Reason:</b> {leave.reason}</Text>
          {leave.file && <Text fontSize="sm" color="gray.600">Proof: {leave.file.name}</Text>}
          <Text>
            <b>Status:</b> <Badge colorScheme={
              leave.status === "Approved" ? "green" :
              leave.status === "Rejected" ? "red" :
              leave.status === "Forwarded" ? "purple" : "yellow"
            }>
              {leave.status}
            </Badge>
          </Text>
          <Text fontSize="sm" color="gray.600" mt={2}>
            History:
            <ul>
              {leave.history.map((h, i) =>
                <li key={i}>{h.action} by {h.by} ({h.role}) [{h.time}]</li>
              )}
            </ul>
          </Text>
          {actions && actions.length > 0 && onActLeave && leave.status === "Pending" && (
            <Box mt={3}>
              {actions.includes("approve") &&
                <Button colorScheme="blue" size="sm" mr={2}
                  onClick={() => onActLeave(leave.id, "approve")}>Approve</Button>
              }
              {actions.includes("reject") &&
                <Button colorScheme="red" size="sm"
                  onClick={() => onActLeave(leave.id, "reject")}>Reject</Button>
              }
              {actions.includes("forward") &&
                <Button colorScheme="purple" size="sm"
                  onClick={() => onActLeave(leave.id, "forward")}>Forward to Principal</Button>
              }
            </Box>
          )}
        </Box>
      ))}
    </VStack>
  );
}