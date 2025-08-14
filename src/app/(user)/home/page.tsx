"use client";

import Box from "@mui/material/Box";
import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomButton from "@/components/button/CustomButton";
import { useState } from "react";
import { updateInfoValidationSchema } from "@/validate/yupValidatation";
import { UserInfo } from "@/types/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { userApi } from "@/services/api";
import { setUserInfo } from "@/lib/slices/userSlice";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "@/helper/common";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserHome = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const userInfo = useSelector((state: RootState) => state.user.info);

  const handleSubmit = async (values: UserInfo) => {
    setIsEditing(false);
    try {
      const res = await userApi.updateUserInfo({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      dispatch(setUserInfo(res.data));
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: '350px' }}>
        <Avatar
          alt="Remy Sharp"
          src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
          sx={{ width: 56, height: 56 }}
        />

        <Formik
          initialValues={userInfo}
          validationSchema={updateInfoValidationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, resetForm }) => (
            <Form>
              {/* Username */}
              <Field
                as={TextField}
                label="Username"
                name="username"
                type="username"
                fullWidth
                variant="outlined"
                margin="dense"
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
                disabled={!isEditing}
              />

              {/* Email */}
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                margin="dense"
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
                disabled={!isEditing}
              />

              {/* Password */}
              <Field
                as={TextField}
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                margin="dense"
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                disabled={!isEditing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        disabled={!isEditing}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit */}
              {isEditing && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </CustomButton>
                  <CustomButton
                    type="button"
                    onClick={() => {
                      resetForm();
                      setIsEditing(false);
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Cancel
                  </CustomButton>
                </Box>
              )}
            </Form>
          )}
        </Formik>
        {!isEditing && (
          <CustomButton
            onClick={() => setIsEditing(true)}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Edit
          </CustomButton>
        )}
      </Box>
    </Box>
  );
};

export default UserHome;