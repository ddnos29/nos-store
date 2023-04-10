import { useState, useMemo } from 'react';
import { Typography, Button } from '@mui/material';
import { LoginLayout } from '@/layouts';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { IProduct } from '@/interfaces/product';
import useProductList from '@/hooks/useProductList';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CreateModal, DeleteModal } from '@/components/modal/product';

import useCategoryList from '@/hooks/useCategoryList';
import useBrandList from '@/hooks/useBrandList';
import { toast } from 'react-toastify';

const ProductAdminPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [productInfo, setProductInfo] =
    useState<Pick<IProduct, '_id' | 'name'>>();

  const { data, error } = useProductList();
  const { data: categoryData } = useCategoryList();
  const { data: brandData } = useBrandList();

  if (error) return <div>failed to load</div>;

  const handleOpenCreateModel = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenDeleteModel = (row: IProduct) => {
    setOpenDeleteModal(true);
    setProductInfo({ _id: row._id, name: row.name });
  };
  const handleCloseDeleteModal = () => {
    setProductInfo(undefined);
    setOpenDeleteModal(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      flex: 1,
      maxWidth: 300,
    },
    {
      field: 'images',
      headerName: 'Hình ảnh',
      flex: 1,
      maxWidth: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return <img src={row?.images[0]?.image_url} width={100} />;
      },
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
    },
    {
      field: 'brand',
      headerName: 'Thương hiệu',
    },
    {
      field: 'price',
      headerName: 'Giá',
    },
    {
      field: 'category',
      headerName: 'Danh mục',
      flex: 1,
    },
    {
      field: '',
      headerName: 'Tùy chọn',
      flex: 1,
      renderCell: ({ row }: GridRenderCellParams) => (
        <>
          <Button variant="outlined">
            <a href={`/admin/product/${row._id}`}>Chi tiết</a>
          </Button>
          <Button
            sx={{ ml: 1 }}
            variant="outlined"
            color="error"
            onClick={() => handleOpenDeleteModel(row)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const rows =
    data?.map((product, index) => ({
      id: index,
      _id: product._id,
      name: product.name,
      brand: product.brand?.name,
      price: product.price,
      category: product.category?.name,
      images: product.images,
      gender: product.gender,
      options: product.options,
    })) || [];

  return (
    <LoginLayout title={'Quản lý sản phẩm'}>
      <Button onClick={handleOpenCreateModel}>Thêm sản phẩm</Button>
      <CreateModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        categoryLst={categoryData || []}
        brandLst={brandData || []}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        productInfo={productInfo}
      />
      <div style={{ minHeight: 400, width: '100%', height: '70vh' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </LoginLayout>
  );
};

export default ProductAdminPage;
