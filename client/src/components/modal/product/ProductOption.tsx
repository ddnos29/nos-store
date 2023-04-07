import { FC, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import { IProductOption } from '@/interfaces';
import { Controller, useForm, useFieldArray } from 'react-hook-form';

interface ProductOptionProps extends Partial<IProductOption> {
  colorRegister?: Pick<ReturnType<typeof useForm>, 'register'>;
  sizeRegister?: any /* Pick<ReturnType<typeof useForm>, 'register'>; */;
  quantityRegister?: Pick<ReturnType<typeof useForm>, 'register'>;
  register?: Pick<ReturnType<typeof useForm>, 'register'> | any;
  control?: any;
  index?: number;
  remove: any;
}

export const ProductOption: FC<ProductOptionProps> = ({
  _id,
  product_id,
  size,
  color,
  quantity,
  colorRegister,
  sizeRegister,
  register,
  control,
  index,
  remove,
}) => {
  const [oSize, setOSize] = useState<string | undefined>(size);
  const [oColor, setOColor] = useState<string | undefined>(color);
  const [oQuantity, setOQuantity] = useState<number | undefined>(quantity);

  /* const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      options: [
        {
          size: '',
          color: '',
          quantity: 10,
        },
      ],
    },
  }); */

  /* const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });
 */
  const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOColor(event.target.value as any);
  };

  const handleSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOSize(event.target.value as any);
  };
  const handleQuantityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOQuantity(event.target.value as any);
  };
  return (
    <Grid item>
      {/*  {fields.map((field, index) => {
      return ( */}
      <Box
        /* key={index} */
        sx={{
          width: { md: '600px', xs: '400px' },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="size-1">Kích thước</InputLabel>
          <Controller
            name={`options[${index}].size`}
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
                value={oSize || ''}
                onChange={handleSizeChange}
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
              <Select
                {...field}
                label="Màu sắc"
                sx={{ flex: 1 }}
                value={oColor || ''}
                onChange={handleColorChange}
              >
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
            value={oQuantity || ''}
            {...register(`options.${index}.quantity`, {
              required: 'Quantity Required',
              min: 1,
            })}
            onChange={handleQuantityChange}
            sx={{ flex: 1 }}
          />
        </FormControl>
        <FormControl fullWidth>
          <button type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </FormControl>
      </Box>
      {/*  );
      })} */}
      {/* <button
        type="button"
        onClick={() => {
          append({ name: 'append' });
        }}
      >
        append
      </button> */}
    </Grid>
  );
};
{
  /* <ProductOption
                  key={index}
                  index={index}
                  register={register}
                  control={control}
                  remove={remove}
                /> */
}
