import { FC } from 'react';
import { Box, Modal, Button, Grid, TextField } from '@mui/material';
import { style } from '../style';
import { useForm } from 'react-hook-form';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import { toast } from 'react-toastify';

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  name: string;
}

export const CreateModal: FC<CreateModalProps> = ({ open, handleClose }) => {
  const axiosAuth = useAxiosAuth();

  // Show image when choose file

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({});

  const onSubmit = (data: FormValues) => {
    axiosAuth
      .post(`${process.env.HOST_URL}/api/category`, data)
      .then((res) => {
        reset();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: { md: '700px', xs: '500px' } }}>
        <h2 id="child-modal-title">Thêm danh mục mới</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} direction="column" alignItems="center">
            {/* Name product */}
            <Grid item>
              <TextField
                label="Tên danh mục"
                variant="outlined"
                sx={{
                  width: { md: '600px', xs: '400px' },
                }}
                {...register('name', {
                  required: 'Tên danh mục không được để trống',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item>
              <Button variant="contained" type="submit">
                Thêm danh mục
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={handleClose}>Đóng</Button>
      </Box>
    </Modal>
  );
};
