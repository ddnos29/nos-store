import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Link,
  Alert,
  AlertTitle,
} from '@mui/material';
import { NextPageContext } from 'next';

import { AuthLayout } from '@/layouts';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { signIn, getSession, useSession } from 'next-auth/react';

interface IFormInput {
  email: string;
  password: string;
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

const LoginPage = () => {
  const router = useRouter();
  /*   const session = useSession();
  useEffect(() => {
    if (session.?user) {
      console.log(session);
      router.push('/');
    }
  }, [session]); */

  const [error, setError] = useState<String | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async ({ email, password }: IFormInput) => {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    }).then((res) => {
      console.log(res);
      if (res?.error) {
        setError(res?.error);
      } else {
        router.push('/');
      }
    });
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
              <Typography variant="h4">Đăng nhập</Typography>
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
                type={'password'}
                variant="outlined"
                sx={{
                  width: '300px',
                }}
                {...register('password', {
                  required: 'Mật khẩu không được để trống',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            {error && (
              <Grid item>
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{
                    width: '300px',
                  }}
                >
                  {error}
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
                Đăng nhập
              </Button>
            </Grid>
            <Grid item>
              Bạn chưa có tài khoản? <Link href="register">Đăng ký ngay</Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
