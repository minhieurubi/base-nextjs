"use client";

import { Box, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
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
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/lib/slices/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues: TLogin = {
    email: "user1@gmail.com",
    password: "123456",
  };

  const handleSubmit = async (values: TLogin) => {
    try {
      const res = await userApi.login(values);
      if (res.status === 200 && res.data.token) {
        saveToken(res.data.token);
        dispatch(setUserInfo(res.data.user));
        toast.success(t(`${res.message}`));

        if (res.data.user.role === ROLES.ADMIN) {
          router.push(ROUTERS.ADMIN.DASHBOARD);
        }
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
        {t('login')}
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
              {t('login')}
            </CustomButton>
          </Form>
        )}
      </Formik>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push(ROUTERS.AUTH.REGISTER)}
        >
          {t('register')}
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
