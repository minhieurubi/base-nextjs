"use client";

import { Box, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import CustomButton from "@/components/button/CustomButton";
import { loginValidationSchema } from "@/validate/yupValidatation";
import { TLogin } from "@/types/common";
import { userApi } from "@/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/constants/routers";
import { ROLES } from "@/constants/roles";
import { getAxiosErrorMessage } from "@/helper/common";
import { saveToken } from "@/ultis/cookie";

const Login = () => {
  const router = useRouter();
  const initialValues: TLogin = {
    email: "user1@gmail.com",
    password: "123456",
  };

  const handleSubmit = async (values: TLogin) => {
    try {
      const res = await userApi.login(values);
      if (res.status === 200 && res.data.token) {
        saveToken(res.data.token);
        toast.success(res.message);

        if (res.data.user.role === ROLES.ADMIN) {
          router.push(ROUTERS.ADMIN.DASHBOARD);
        }
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
        Login
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
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
        onClick={() => router.push(ROUTERS.AUTH.REGISTER)}
      >
        Register
      </CustomButton>
    </Box>
  );
};

export default Login;
