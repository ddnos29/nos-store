import { LoginLayout } from '@/layouts';
import { Typography, Button } from '@mui/material';
import useCategoryList from '@/hooks/useCategoryList';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

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
      <Button variant="outlined">
        <a href={`/admin/product/${row._id}`}>Chi tiết</a>
      </Button>
    ),
  },
];

const CategoryAdminPage = () => {
  const { data, error } = useCategoryList();
  if (error) return <div>failed to load</div>;
  const rows =
    data?.map((brand, index) => ({
      id: index,
      _id: brand._id,
      name: brand.name,
    })) || [];

  return (
    <LoginLayout title={'Quản lý danh mục'}>
      <div style={{ minHeight: 400, width: '100%', height: '70vh' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </LoginLayout>
  );
};

export default CategoryAdminPage;
