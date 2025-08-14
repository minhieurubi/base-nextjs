"use client";

import { Box, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import CustomButton from "@/components/button/CustomButton";
import { registerValidationSchema } from "@/validate/yupValidatation";
import { TUpdateUserReq } from "@/types/common";
import { userApi } from "@/services/api";
import { toast } from "react-toastify";
import { ROUTERS } from "@/constants/routers";
import { useRouter } from "next/navigation";
import { ROLES } from "@/constants/roles";
import { getAxiosErrorMessage } from "@/helper/common";
import { saveToken } from "@/ultis/cookie";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues: TUpdateUserReq = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: TUpdateUserReq) => {
    try {
      const res = await userApi.register(values);

      if (res.status === 201 && res.data.token) {
        saveToken(res.data.token);
        toast.success(t(`${res.message}`));

        if (res.data.user.role === ROLES.USER) {
          router.push(ROUTERS.USER.HOME);
        }
      }
    } catch (error) {
      toast.error(getAxiosErrorMessage(t(`${error}`)));
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
        {t('register')}
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
              label={t('username')}
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
              label={t('email')}
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
              label={t('password')}
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              margin="dense"
              error={touched.password && Boolean(errors.password)}
              helperText={<ErrorMessage name="password" />}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              {t('register')}
            </CustomButton>
          </Form>
        )}
      </Formik>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push(ROUTERS.AUTH.LOGIN)}
        >
          {t('login')}
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
