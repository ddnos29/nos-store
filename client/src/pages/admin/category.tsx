import { useState } from 'react';
import { LoginLayout } from '@/layouts';
import { Typography, Button } from '@mui/material';
import useCategoryList from '@/hooks/useCategoryList';
import { CreateModal, DeleteModal } from '@/components/modal/category';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ICategory } from '@/interfaces';

const CategoryAdminPage = () => {
  const { data, error } = useCategoryList();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [categoryInfo, setCategoryInfo] = useState<ICategory>();

  const handleOpenCreateModel = () => {
    setOpenCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenDeleteModel = (row: ICategory) => {
    setOpenDeleteModal(true);
    setCategoryInfo(row);
  };
  const handleCloseDeleteModal = () => {
    setCategoryInfo(undefined);
    setOpenDeleteModal(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Tên danh mục',
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
    <LoginLayout title={'Quản lý danh mục'}>
      <Button onClick={handleOpenCreateModel}>Thêm danh mục</Button>
      <CreateModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        categoryInfo={categoryInfo}
      />
      <div style={{ minHeight: 400, width: '100%', height: '70vh' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </LoginLayout>
  );
};

export default CategoryAdminPage;
