import { Box, Container, Grid, Typography, Link } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MapIcon from '@mui/icons-material/Map';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
export const Footer = () => {
  const center = {
    display: 'flex',
    alignItems: { xs: 'center', sm: 'start', md: 'start' },
    justifyContent: 'center',
    noWrap: 'true',
    padding: '1rem',
    gap: '10px',
  };
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      sx={{
        width: '100%',
        margin: '0 auto',
        padding: '0 1rem',
        height: 'auto',
        bgcolor: '#030303',
        color: '#fff',
      }}
    >
      <Container maxWidth={'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ ...center }}>
              <CheckroomIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                NOS-STORE
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ ...center, flexDirection: 'column' }}>
              <Box>
                <Typography variant="h6">Hỗ trợ</Typography>
              </Box>
              <Box>
                <Typography color={'#e4e4e4'}>Tài khoản</Typography>
              </Box>
              <Box>
                <Typography color={'#e4e4e4'}>Sản phẩm</Typography>
              </Box>
              <Box>
                <Typography color={'#e4e4e4'}>Thanh toán</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                ...center,
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography variant="h6">Thông tin liên hệ</Typography>
              </Box>
              <Link
                sx={{
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
                href={'https://github.com/ddnos29/nos-store'}
              >
                <GitHubIcon sx={{ mr: 1 }} />
                <Typography>github.com/ddnos29/nos-store</Typography>
              </Link>

              <Link
                sx={{
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  textAlign: 'start',
                }}
                href={'https://www.facebook.com/daudamnson'}
              >
                <FacebookIcon sx={{ mr: 1 }} />
                <Typography>facebook.com/daudamnson</Typography>
              </Link>
              <Link
                sx={{
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  (window.location.href = 'mailto:daudangson@gmail.com')
                }
              >
                <EmailIcon sx={{ mr: 1 }} />

                <Typography>daudangson@gmail.com</Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                ...center,
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6">Địa chỉ</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MapIcon sx={{ mr: 1 }} />

                <Typography color={'#e4e4e4'}>
                  19 Đ. Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
