import { FC } from 'react';
import { Box, Modal, Button, Grid, TextField } from '@mui/material';
import { style } from '../style';
import { useForm } from 'react-hook-form';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import { toast } from 'react-toastify';

import { IProduct } from '@/interfaces';

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  productInfo?: Pick<IProduct, '_id' | 'name'>;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  open,
  handleClose,
  productInfo,
}) => {
  const axiosAuth = useAxiosAuth();

  // Show image when choose file

  const deleteBrand = () => {
    axiosAuth
      .delete(`${process.env.HOST_URL}/api/product/${productInfo?._id}`)
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
        <h2 id="child-modal-title">Xóa sản phẩm</h2>
        <p>Bạn có chắc chắn muốn xóa sản phẩm {productInfo?.name}?</p>
        <Button onClick={deleteBrand}>Xóa</Button>
        <Button onClick={handleClose}>Đóng</Button>
      </Box>
    </Modal>
  );
};
