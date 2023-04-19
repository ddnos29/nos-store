import {
  Box,
  Select,
  List,
  FormControl,
  Typography,
  ListItem,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { ICategory, IBrand, IFilter } from '@/interfaces';

interface FilterProps {
  categories?: ICategory[];
  brands?: IBrand[];
  getFilter: (filter: IFilter) => void;
}

const colorList = [
  { name: 'Đỏ', value: 'RED' },
  { name: 'Vàng', value: 'YELLOW' },
  { name: 'Tím', value: 'PURPLE' },
  { name: 'Cam', value: 'ORANGE' },
  { name: 'Xám', value: 'GRAY' },
  { name: 'Trắng', value: 'WHITE' },
  { name: 'Đen', value: 'BLACK' },
  { name: 'Nâu', value: 'BROWN' },
  { name: 'Hồng', value: 'PINK' },
  { name: 'Xanh lá', value: 'GREEN' },
  { name: 'Xanh nước biển', value: 'BLUE' },
  { name: 'Màu khác', value: 'OTHER' },
];

const sizeList = ['S', 'M', 'L', 'XL', 'XXL'];

export const Filter: FC<FilterProps> = ({
  categories = [],
  brands = [],
  getFilter,
}) => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<typeof colorList>([]);
  const [gender, setGender] = useState<string>('Chung');

  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setCategory(typeof value === 'string' ? value.split(',') : value);
  };

  const handleBrandChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setBrand(typeof value === 'string' ? value.split(',') : value);
  };

  const handleColorChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setColor(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSizeChange = (event: any) => {
    const {
      target: { value },
    } = event;

    setSize(typeof value === 'string' ? value.split(',') : value);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    const filter: IFilter = {
      category: category.map((cate) => `${cate._id}`),
      brand: brand.map((brand) => brand._id),
      color: color.map((color) => color.value),
      size,
      gender,
    };

    getFilter(filter);
  }, [category, brand, color, size, gender]);

  

  return (
    <Box sx={{
    }}>
      {/* Category */}
      <ListItem
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="category">Danh mục</InputLabel>
          <Select
            labelId="category"
            id="demo-multiple-checkbox"
            multiple
            value={category}
            onChange={handleCategoryChange}
            renderValue={(selected) => {
              return selected.map((cate: ICategory) => cate.name).join(', ');
            }}
          >
            {categories.map((cate) => (
              <MenuItem key={cate?._id} value={cate}>
                <Checkbox checked={category.indexOf(cate) > -1} />
                <ListItemText primary={cate.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>

      {/* Brand */}
      <ListItem
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="brand">Hãng</InputLabel>
          <Select
            labelId="brand"
            id="demo-multiple-checkbox"
            multiple
            value={brand}
            onChange={handleBrandChange}
            renderValue={(selected) => {
              return selected.map((bra: IBrand) => bra.name).join(', ');
            }}
          >
            {brands.map((bra) => (
              <MenuItem key={bra?._id} value={bra}>
                <Checkbox checked={brand.indexOf(bra) > -1} />
                <ListItemText primary={bra.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      {/* Size */}
      <ListItem
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="size">Kích thước</InputLabel>
          <Select
            labelId="size"
            id="demo-multiple-checkbox"
            multiple
            value={size}
            onChange={handleSizeChange}
            renderValue={(selected) => {
              return selected.join(', ');
            }}
          >
            {sizeList.map((s) => (
              <MenuItem key={s} value={s}>
                <Checkbox checked={size.indexOf(s) > -1} />
                <ListItemText primary={s} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      {/* Color */}
      <ListItem
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="color">Màu</InputLabel>
          <Select
            labelId="color"
            id="demo-multiple-checkbox"
            multiple
            value={color}
            onChange={handleColorChange}
            renderValue={(selected) => {
              return selected.map((c) => c.name).join(', ');
            }}
          >
            {colorList.map((c) => (
              <MenuItem key={c.name} value={c}>
                <Checkbox checked={color.indexOf(c) > -1} />
                <ListItemText primary={c.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
      {/* Giới tính */}
      <ListItem
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
          <InputLabel id="gender">Giới tính</InputLabel>
          <Select
            labelId="gender"
            id="demo-multiple-checkbox"
            value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem value={'Nam'}>Nam</MenuItem>
            <MenuItem value={'Nữ'}>Nữ</MenuItem>
            <MenuItem value={'Chung'}>Chung</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </Box>
  );
};
