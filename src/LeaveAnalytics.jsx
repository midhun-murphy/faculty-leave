import React from "react";
import { Box, Heading, Table, Tbody, Tr, Td } from "@chakra-ui/react";

function getSummaryByType(leaves) {
  const summary = {};
  leaves.forEach(l => {
    summary[l.leaveType] = (summary[l.leaveType] || 0) + 1;
  });
  return summary;
}

export default function LeaveAnalytics({ leaves, principal }) {
  const summary = getSummaryByType(leaves);
  return (
    <Box my={3}>
      <Heading size="sm" mb={2}>
        {principal ? "Reports & Analytics (College)" : "Department Leave Analytics"}
      </Heading>
      <Table size="sm" variant="simple">
        <Tbody>
          {Object.keys(summary).length === 0 && (
            <Tr><Td colSpan={2}>No leave data</Td></Tr>
          )}
          {Object.entries(summary).map(([type, count]) => (
            <Tr key={type}>
              <Td>{type}</Td>
              <Td>{count} leaves</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {principal && (
        <Box fontSize="sm" color="gray.500" mt={2}>
          Monthly & yearly summary coming soon!
        </Box>
      )}
    </Box>
  );
}