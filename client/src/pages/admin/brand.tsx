import { useState } from 'react';

import { LoginLayout } from '@/layouts';
import { Typography, Button } from '@mui/material';
import useBrandList from '@/hooks/useBrandList';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CreateModal, DeleteModal } from '@/components/modal/brand';
import { IBrand } from '../../interfaces/brand';

const BrandAdminPage = () => {
  const { data, error } = useBrandList();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [brandInfo, setBrandInfo] = useState<IBrand>();

  const handleOpenCreateModel = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenDeleteModel = (row: IBrand) => {
    setOpenDeleteModal(true);
    setBrandInfo(row);
  };
  const handleCloseDeleteModal = () => {
    setBrandInfo(undefined);
    setOpenDeleteModal(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Tên thương hiệu',
      flex: 1,
    },
    {
      field: '',
      headerName: 'Tùy chọn',
      flex: 1,
      maxWidth: 300,
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

  if (error) return <div>failed to load</div>;
  const rows =
    data?.map((brand, index) => ({
      id: index,
      _id: brand._id,
      name: brand.name,
    })) || [];

  return (
    <LoginLayout title={'Quản lý thương hiệu'}>
      <Button onClick={handleOpenCreateModel}>Thêm thương hiệu</Button>
      <CreateModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        brandInfo={brandInfo}
      />
      <div style={{ minHeight: 400, width: '100%', height: '70vh' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </LoginLayout>
  );
};

export default BrandAdminPage;
