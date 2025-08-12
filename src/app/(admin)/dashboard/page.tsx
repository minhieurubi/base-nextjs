"use client";

import Box from "@mui/material/Box";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import ModalEditUser from "@/components/modal/modalEditUser";
import { TProfile } from "@/types/common";

const LIST_USER: TProfile[] = [
  {
    username: "1",
    email: "123@123",
    password: "ccccc",
    urlAvatar: "",
  },
  {
    username: "2",
    email: "234@123",
    password: "ccccc",
    urlAvatar: "",
  },
  {
    username: "3",
    email: "213@123",
    password: "ccccc",
    urlAvatar: "",
  },
];

const DEFAULT_USER: TProfile = {
  username: "",
  email: "",
  password: "",
  urlAvatar: "",
};

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TProfile>(DEFAULT_USER);

  const handleEdit = (user: TProfile) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(DEFAULT_USER);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: '350px'}}>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LIST_USER.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell sx={{display: 'flex', gap: 1}}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ModalEditUser open={open} handleClose={handleClose} userInfo={selectedUser} />
    </Box>
  );
};

export default Dashboard;