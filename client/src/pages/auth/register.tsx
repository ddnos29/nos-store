import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Link,
  Alert,
} from '@mui/material';

import { NextPageContext } from 'next';
import { useState, useEffect } from 'react';
import { AuthLayout } from '@/layouts';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
//import axios from '@/lib/axios';
import axios from 'axios';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  confirm_password?: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

const RegisterPage = () => {
  const [error, setError] = useState<String | null>(null);
  const [success, setSuccess] = useState<String | null>(null);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
    // when the component is unmounted, the timer is cleared
    return () => clearTimeout(timer);
  }, [error, success]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onBlur',
  });
  const onSubmit = async ({
    name,
    email,
    password,
    address,
    phone,
  }: IFormInput) => {
    console.log({ name, email, password, address, phone });
    try {
      const { data } = await axios.post(
        `${process.env.HOST_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          address,
          phone,
        }
      );
      setError(null);
      setSuccess(data.message);
    } catch (error) {
      setSuccess(null);
      setError(error?.response?.data?.error?.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            marginTop: '-100px',
            width: '400px',
            padding: '30px 20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
            bgcolor: '#fff',
            border: '1px solid #fff',
          }}
        >
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h4">Đăng ký tài khoản</Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Họ à tên"
                variant="outlined"
                sx={{
                  width: '300px',
                }}
                {...register('name', {
                  required: 'Họ và tên không được để trống',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                sx={{
                  width: '300px',
                }}
                {...register('email', {
                  required: 'Email không được để trống',
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Mật khẩu"
                variant="outlined"
                type="password"
                sx={{
                  width: '300px',
                }}
                {...register('password', {
                  required: 'Vui lòng nhập lại mật khẩu',
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Nhập lại mật khẩu"
                variant="outlined"
                type="password"
                sx={{
                  width: '300px',
                }}
                {...register('confirm_password', {
                  required: 'Mật khẩu không được để trống',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                  validate: (value) => {
                    if (value !== watch('password')) {
                      return 'Mật khẩu không khớp';
                    }
                  },
                })}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Địa chỉ"
                variant="outlined"
                sx={{
                  width: '300px',
                }}
                {...register('address', {
                  required: 'Địa chỉ không được để trống',
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Số điện thoại"
                variant="outlined"
                sx={{
                  width: '300px',
                }}
                {...register('phone', {
                  required: 'Số điện thoại không được để trống',
                  minLength: {
                    value: 10,
                    message: 'Số điện thoại phải có ít nhất 10 số',
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            {error && (
              <Grid item>
                <Alert
                  severity="error"
                  sx={{
                    width: '300px',
                  }}
                >
                  {error}
                </Alert>
              </Grid>
            )}
            {success && (
              <Grid item>
                <Alert
                  severity="success"
                  sx={{
                    width: '300px',
                  }}
                >
                  {success}
                </Alert>
              </Grid>
            )}
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '300px',
                  padding: '10px',
                }}
              >
                Đăng ký
              </Button>
            </Grid>
            <Grid item>
              Bạn đã có tài khoản? <Link href="login">Đăng nhập</Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
