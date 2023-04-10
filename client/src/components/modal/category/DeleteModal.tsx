import { FC } from 'react';
import { Box, Modal, Button, Grid, TextField } from '@mui/material';
import { style } from '../style';
import { useForm } from 'react-hook-form';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import { toast } from 'react-toastify';

import { ICategory } from '@/interfaces';

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  categoryInfo?: ICategory;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  open,
  handleClose,
  categoryInfo,
}) => {
  const axiosAuth = useAxiosAuth();

  // Show image when choose file

  const deleteBrand = () => {
    axiosAuth
      .delete(`${process.env.HOST_URL}/api/category/${categoryInfo?._id}`)
      .then((res) => {
        handleClose();
        toast.success(res.data.message);
      })
      .catch((err) => {
        handleClose();
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
      <Box sx={{ ...style, width: { md: '600px', xs: '400px' } }}>
        <h2 id="child-modal-title">Xóa danh mục </h2>
        <p>Bạn có chắc chắn muốn xóa danh mục {categoryInfo?.name}?</p>
        <Button onClick={deleteBrand}>Xóa</Button>
        <Button onClick={handleClose}>Đóng</Button>
      </Box>
    </Modal>
  );
};
