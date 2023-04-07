import { FC, useState } from 'react';
import {
  Box,
  Modal,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ImageList,
  ImageListItem,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { style } from '../style';
import { useForm, useFieldArray, Control, Controller } from 'react-hook-form';
import { IProduct, IBrand, ICategory } from '@/interfaces';

import { ProductOption } from './ProductOption';

interface CreateModalProps {
  open: boolean;
  handleClose: () => void;
  category: ICategory[];
  brand: IBrand[];
}

export const CreateModalTest: FC<CreateModalProps> = ({
  open,
  handleClose,
  category,
  brand,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [option, setOption] = useState<any[]>([]);

  const handleAddOption = () => {};

  // Show image when choose file
  const handleImages = (e: any) => {
    setImagesUrl([]);
    e.preventDefault();
    const urlArray = Array.from(e.target.files).map((file: File) =>
      URL.createObjectURL(file)
    );
    setImagesUrl((imagesUrl) => [...imagesUrl, ...urlArray]);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: {
      options: [
        {
          size: '',
          color: '',
          quantity: 10,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = (data: IProduct) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: { md: '700px', xs: '500px' } }}>
        <h2 id="child-modal-title">Thêm sản phẩm</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12}>
              {fields.map((field, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: { md: '600px', xs: '400px' },
                      display: 'flex',
                      marginBottom: '10px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="size-1">Kích thước</InputLabel>
                      <Controller
                        name={`options.${index}.size`}
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Size Required' }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Kích thước"
                            sx={{
                              flex: 1,
                            }}
                          >
                            <MenuItem value={'S'}>S</MenuItem>
                            <MenuItem value={'M'}>M</MenuItem>
                            <MenuItem value={'L'}>L</MenuItem>
                            <MenuItem value={'XL'}>XL</MenuItem>
                            <MenuItem value={'XXL'}>XXL</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="color-1">Màu sắc</InputLabel>
                      <Controller
                        name={`options.${index}.color`}
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Size Required' }}
                        render={({ field }) => (
                          <Select {...field} label="Màu sắc" sx={{ flex: 1 }}>
                            <MenuItem value={'BLACK'}>Đen</MenuItem>
                            <MenuItem value={'WHITE'}>Trắng</MenuItem>
                            <MenuItem value={'GREEN'}>Xanh lá</MenuItem>
                            <MenuItem value={'BLUE'}>Xanh nước biển</MenuItem>
                            <MenuItem value={'RED'}>Đỏ</MenuItem>
                            <MenuItem value={'YELLOW'}>Vàng</MenuItem>
                            <MenuItem value={'PINK'}>Hồng</MenuItem>
                            <MenuItem value={'GRAY'}>Xám</MenuItem>
                            <MenuItem value={'BROWN'}>Nâu</MenuItem>
                            <MenuItem value={'ORANGE'}>Cam</MenuItem>
                            <MenuItem value={'PURPLE'}>Tím</MenuItem>
                            <MenuItem value={'OTHER'}>Khác</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        label="Số lượng"
                        type="number"
                        defaultValue={10}
                        variant="outlined"
                        {...register(`options.${index}.quantity`, {
                          required: 'Quantity Required',
                          min: 1,
                        })}
                        sx={{ flex: 1 }}
                      />
                    </FormControl>
                    <IconButton
                      type="button"
                      onClick={() => remove(index)}
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                );
              })}
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  append({ name: 'append' });
                }}
              >
                Thêm option
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit">Thêm</Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={handleClose}>Đóng</Button>
      </Box>
    </Modal>
  );
};
