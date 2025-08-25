import React, { useState } from "react";
import { Box, Heading, Button, VStack, Input, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react";

const USERS = [
  { username: "staff1", password: "pass123", role: "Staff", name: "Staff One", dept: "CSE" },
  { username: "hod1", password: "pass123", role: "HoD", name: "HOD One", dept: "CSE" },
  { username: "principal1", password: "pass123", role: "Principal", name: "Principal One", dept: "All" }
];

export default function Login({ onLogin }) {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const u = USERS.find(
      (usr) =>
        usr.username === username &&
        usr.password === password &&
        usr.role === role
    );
    if (u) {
      onLogin(u.role, u);
    } else {
      setError(true);
    }
  }

  if (!role) {
    return (
      <VStack spacing={6} mt={20}>
        <Heading color="teal.600" size="xl">
          Faculty Leave Management
        </Heading>
        <Box fontSize="lg" color="gray.700">
          Choose your role to login:
        </Box>
        <VStack>
          <Button colorScheme="teal" onClick={() => setRole("Staff")}>Staff Login</Button>
          <Button colorScheme="blue" onClick={() => setRole("HoD")}>HoD Login</Button>
          <Button colorScheme="purple" onClick={() => setRole("Principal")}>Principal Login</Button>
        </VStack>
      </VStack>
    );
  }

  return (
    <Box maxW="md" mx="auto" mt={16} p={8} bg="white" boxShadow="md" borderRadius="md">
      <Heading mb={5} color={
        role === "Staff" ? "teal.600" : role === "HoD" ? "blue.600" : "purple.600"
      } size="lg" textAlign="center">
        {role} Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={e => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme={
            role === "Staff" ? "teal" : role === "HoD" ? "blue" : "purple"
          } w="full">Login</Button>
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              Invalid credentials
            </Alert>
          )}
          <Box fontSize="sm" color="gray.500" pt={2} textAlign="center">
            
          </Box>
        </VStack>
      </form>
    </Box>
  );
}