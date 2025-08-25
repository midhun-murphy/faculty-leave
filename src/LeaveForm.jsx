import React, { useState } from "react";
import { Box, FormControl, FormLabel, Button, Textarea, Select, Input } from "@chakra-ui/react";
import FileUpload from "./FileUpload.jsx";

const leaveTypes = [
  "Casual Leave", "Medical Leave", "On Duty Leave",
  "Compensatory Leave", "Maternity Leave", "Paternity Leave", "Earned Leave"
];

export default function LeaveForm({ onSubmit, isHod }) {
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!leaveType || !reason || !start || !end) return;
    onSubmit({ leaveType, reason, start, end, file });
    setLeaveType(""); setReason(""); setStart(""); setEnd(""); setFile(null);
  }

  return (
    <Box p={4} bg="gray.50" borderRadius="md" mb={3}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={2}>
          <FormLabel>Leave Type</FormLabel>
          <Select value={leaveType} onChange={e => setLeaveType(e.target.value)} required>
            <option value="">Select Leave Type</option>
            {leaveTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </Select>
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" value={start} onChange={e => setStart(e.target.value)} required />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>End Date</FormLabel>
          <Input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Reason</FormLabel>
          <Textarea value={reason} onChange={e => setReason(e.target.value)} required />
        </FormControl>
        <FileUpload file={file} setFile={setFile} leaveType={leaveType} />
        <Button type="submit" colorScheme={isHod ? "blue" : "teal"} mt={3}>
          Apply for Leave
        </Button>
      </form>
    </Box>
  );
}