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
import { useEffect, useState } from "react";
import ModalEditUser from "@/components/modal/modalEditUser";
import { UserInfo } from "@/types/common";
import { userApi } from "@/services/api";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "@/helper/common";

const DEFAULT_USER: UserInfo = {
  _id: "",
  username: "",
  email: "",
  password: "",
  urlAvatar: "",
  role: "user",
};

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo>(DEFAULT_USER);
  const [users, setUsers] = useState<UserInfo[]>([]);

  const handleEdit = (user: UserInfo) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(DEFAULT_USER);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getUsers();
        setUsers(res.data);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      }
    })()
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: '350px'}}>Username</TableCell>
                <TableCell sx={{width: '350px'}}>Email</TableCell>
                <TableCell sx={{width: '200px'}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
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