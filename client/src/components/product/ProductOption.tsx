import { FC, useEffect, useState, useRef } from 'react';

import {
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';

import { IProductOption } from '@/interfaces';

interface ProductOptionProps {
  options: IProductOption[];
}

const defaultSize = [
  {
    _id: 'S',
    size: 'S',
    product_id: '',
  },
  {
    _id: 'M',
    size: 'M',
    product_id: '',
    quantity: 0,
  },
  {
    _id: 'L',
    size: 'L',
    product_id: '',
    quantity: 0,
  },
  {
    _id: 'XL',
    size: 'XL',
    product_id: '',
    quantity: 0,
  },
  {
    _id: 'XXL',
    size: 'XXL',
    product_id: '',
    quantity: 0,
  },
];

const input = {
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
};

export const ProductOption: FC<ProductOptionProps> = ({ options }) => {
  const inputRef = useRef<any>(1);

  const [colorList, setColorList] = useState<string[]>([]);
  const [toggleButtonColor, setToggleButtonColor] = useState<string>('');
  const [toggleButtonSize, setToggleButtonSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [inputQuantity, setInputQuantity] = useState<number>(1);

  const [optionSize, setOptionSize] =
    useState<
      Pick<IProductOption, '_id' | 'size' | 'product_id' | 'quantity'>[]
    >(defaultSize);

  useEffect(() => {
    setColorList([...new Set<string>(options.map((option) => option.color))]);
  }, []);

  const handleColorChange = (event: any) => {
    const color = event.target.value;
    const newOptionSize = options.filter((option) => option.color === color);
    setOptionSize(newOptionSize);
    setToggleButtonColor(color);
    setToggleButtonSize('');
  };

  const handleSizeChange = (event: any) => {
    const id = event.target.value;
    setToggleButtonSize(id);
    setQuantity(optionSize.find((option) => option._id === id)?.quantity);
  };

  const colorControl = {
    value: toggleButtonColor,
    onChange: handleColorChange,
    exclusive: true,
  };

  const sizeControl = {
    value: toggleButtonSize,
    onChange: handleSizeChange,
    exclusive: true,
  };

  const handleQuantityChange = (event: any) => {
    const value = event.target.value;
    if (inputRef.current.value <= 0) return;

    switch (value) {
      case '-':
        if (inputRef.current.value > 1) inputRef.current.value -= 1;
        break;
      case '+':
        inputRef.current.value = Number(inputRef.current.value) + Number(1);
        break;
      default:
        inputRef.current.value = value;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Box>
        {/* Color */}
        <Typography>Màu</Typography>
        <ToggleButtonGroup {...colorControl}>
          {colorList.map((color) => (
            <ToggleButton key={color} value={color}>
              {color}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        {/* Size */}
        <Typography>Size</Typography>
        <ToggleButtonGroup {...sizeControl}>
          {optionSize.map((option) => (
            <ToggleButton
              key={option._id}
              value={option._id}
              sx={{
                minWidth: '50px',
              }}
            >
              {option.size}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      {/* Quantity */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',

          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box>
          <Typography>Số lượng</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              height: '50px',
            }}
          >
            <ToggleButtonGroup
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
              exclusive
            >
              <ToggleButton
                value={'-'}
                onClick={handleQuantityChange}
                sx={{
                  minWidth: '50px',
                  fontSize: '20px',
                }}
              >
                -
              </ToggleButton>
              <ToggleButton value={inputRef.current.value}>
                <TextField
                  id="outlined-number"
                  type="number"
                  value={inputRef.current.value || 1}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputRef={inputRef}
                  sx={{
                    ...input,
                    width: '25px',
                    border: 'none',
                    height: '100%',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '10px',
                  }}
                />
              </ToggleButton>

              <ToggleButton
                value={'+'}
                onClick={handleQuantityChange}
                sx={{
                  minWidth: '50px',
                  fontSize: '20px',
                }}
              >
                +
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
        {quantity > 0 && (
          <Typography
            sx={{ fontSize: '14px', marginTop: '20px', color: 'gray' }}
          >
            {quantity} sản phẩm có sẵn
          </Typography>
        )}
      </Box>
      {/* Add to cart */}
      <Box>
        <Button
          variant="outlined"
          sx={{
            width: '100%',
            height: '50px',
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#fff',
              border: '1px solid #000',
              color: '#000',
            },
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </Box>
  );
};
