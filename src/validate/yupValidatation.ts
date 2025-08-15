import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_]{3,20}$/, 'Username chỉ được chứa chữ, số và dấu gạch dưới, 3-20 ký tự')
    .required('Vui lòng nhập username'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

export const updateInfoValidationSchema = Yup.object({
  username: Yup.string().matches(
    /^[a-zA-Z0-9_]{3,20}$/,
    'Username chỉ được chứa chữ, số và dấu gạch dưới, 3-20 ký tự'
  ),
  // .required("Vui lòng nhập username"),
  email: Yup.string().email('Email không hợp lệ'),
  // .required("Vui lòng nhập email"),
  password: Yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự'),
  // .required("Vui lòng nhập mật khẩu"),
});
