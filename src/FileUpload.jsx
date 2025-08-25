import React from "react";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function FileUpload({ file, setFile, leaveType }) {
  // Only required for Medical/OD
  const isRequired = leaveType === "Medical Leave" || leaveType === "On Duty Leave";
  return (
    <FormControl mb={2} isRequired={isRequired}>
      <FormLabel>Upload Proof {isRequired && "(Required for Medical/OD)"}</FormLabel>
      <Input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        accept="image/*,.pdf"
      />
      {file && <Text fontSize="sm" color="gray.600">{file.name}</Text>}
    </FormControl>
  );
}