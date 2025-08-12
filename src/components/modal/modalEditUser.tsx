import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TProfile } from "@/types/common";
import { Avatar, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { updateInfoValidationSchema } from "@/validate/yupValidatation";
import CustomButton from "@/components/button/CustomButton";

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
}: {
  open: boolean;
  handleClose: () => void;
  userInfo: TProfile;
}) {
  const handleSubmit = (values: TProfile) => {
    console.log("Dữ liệu login:", values);
    // TODO: Gọi API login ở đây
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
          <Avatar
            alt="Remy Sharp"
            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
            sx={{ width: 56, height: 56 }}
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
                >
                  Submit
                </CustomButton>

              </Form>
            )}
          </Formik>
        </Box>

      </Modal>
    </div>
  );
}