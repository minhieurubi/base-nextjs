"use client";

import Box from "@mui/material/Box";
import { Avatar, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomButton from "@/components/button/CustomButton";
import { useState } from "react";
import { updateInfoValidationSchema } from "@/validate/yupValidatation";
import { TProfile } from "@/types/common";

const UserHome = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const initialValues: TProfile = {
    username: "1111",
    email: "123@123",
    password: "ccccc",
    urlAvatar: "",
  };

  const handleSubmit = (values: TProfile) => {
    console.log("Dữ liệu login:", values);
    // TODO: Gọi API login ở đây
    setIsEditing(false);
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
          initialValues={initialValues}
          validationSchema={updateInfoValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Username */}
              <Field
                as={TextField}
                label="username"
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
                type="password"
                fullWidth
                variant="outlined"
                margin="dense"
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                disabled={!isEditing}
              />

              {/* Submit */}
              {isEditing && (
                <CustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit
                </CustomButton>
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