import React from "react";
import { Box, Heading, Table, Tbody, Tr, Td } from "@chakra-ui/react";

export default function LeaveCalendar({ leaves, college }) {
  return (
    <Box my={3}>
      <Heading size="sm" mb={2}>{college ? "College" : "Department"} Leave Calendar</Heading>
      <Table size="sm" variant="simple">
        <Tbody>
          {leaves.map((leave, i) => (
            <Tr key={i}>
              <Td>{leave.name} ({leave.role || "Staff"})</Td>
              <Td>{leave.start} to {leave.end}</Td>
              <Td>{leave.leaveType}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {(leaves.length === 0) && <Box color="gray.400" mt={2}>No leaves scheduled.</Box>}
    </Box>
  );
}