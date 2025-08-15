import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { UserInfo } from "@/types/common";
import { TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { updateInfoValidationSchema } from "@/validate/yupValidatation";
import CustomButton from "@/components/button/CustomButton";
import { userApi } from "@/services/api";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "@/helper/common";
import { useTranslation } from "react-i18next";
import AvatarWithModal from "@/components/avatar/avatar";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalEditUser({
  open,
  handleClose,
  userInfo,
  setSelectedUser,
}: {
  open: boolean;
  handleClose: () => void;
  userInfo: UserInfo;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserInfo>>
}) {
  const { t } = useTranslation('common');

  const handleSubmit = async (values: UserInfo) => {
    try {
      const res = await userApi.updateUserInfo({
        id: values._id,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      setSelectedUser(res.data);
    } catch (error) {
      toast.error(getAxiosErrorMessage(t(`${error}`)));
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AvatarWithModal
            initialAvatar={userInfo.urlAvatar}
            userId={userInfo._id}
            setSelectedUser={setSelectedUser}
          />

          <Formik
            initialValues={userInfo}
            validationSchema={updateInfoValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
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
                >
                  {t('save')}
                </CustomButton>

              </Form>
            )}
          </Formik>
        </Box>

      </Modal>
    </div>
  );
}