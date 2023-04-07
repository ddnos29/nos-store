import { LoginLayout } from '@/layouts';
import { Typography, Button } from '@mui/material';
import useBrandList from '@/hooks/useBrandList';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

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
      <Button variant="outlined">
        <a href={`/admin/product/${row._id}`}>Chi tiết</a>
      </Button>
    ),
  },
];

const BrandAdminPage = () => {
  const { data, error } = useBrandList();
  if (error) return <div>failed to load</div>;
  const rows =
    data?.map((brand, index) => ({
      id: index,
      _id: brand._id,
      name: brand.name,
    })) || [];

  return (
    <LoginLayout title={'Quản lý thương hiệu'}>
      <div style={{ minHeight: 400, width: '100%', height: '70vh' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </LoginLayout>
  );
};

export default BrandAdminPage;
