"use client";

import { Box, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import CustomButton from "@/components/button/CustomButton";
import { registerValidationSchema } from "@/validate/yupValidatation";
import { TRegister } from "@/types/common";
import { userApi } from "@/services/api";
import { toast } from "react-toastify";
import { ROUTERS } from "@/constants/routers";
import { useRouter } from "next/navigation";
import { ROLES } from "@/constants/roles";
import { getAxiosErrorMessage } from "@/helper/common";
import { saveToken } from "@/ultis/cookie";

const Register = () => {
  const router = useRouter();
  const initialValues: TRegister = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: TRegister) => {
    try {
      const res = await userApi.register(values);

      if (res.status === 201 && res.data.token) {
        saveToken(res.data.token);
        toast.success(res.message);

        if (res.data.user.role === ROLES.USER) {
          router.push(ROUTERS.USER.HOME);
        }
      }
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  return (
    <Box
      sx={{
        width: 350,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
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
            />

            {/* Submit */}
            <CustomButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              Submit
            </CustomButton>
          </Form>
        )}
      </Formik>
      <CustomButton
        type="button"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => router.push(ROUTERS.AUTH.LOGIN)}
      >
        Login
      </CustomButton>
    </Box>
  );
};

export default Register;
