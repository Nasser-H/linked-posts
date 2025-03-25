"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { State, storeDispach } from '../redux/store';
import { removeToken } from '../redux/authSlice';
import { useRouter } from 'next/navigation';
import { getUserData } from '../redux/authUserSlice';
import Image from 'next/image';

const pages : {link:string;text:string}[] = [{link:"create-post",text:"Add Post"}];


function Navbar() {
const dispatch = useDispatch<storeDispach>();
const {user} = useSelector((state: State)=>state.authUserReducer);
const router = useRouter();
 const token = useSelector((state : State)=> state.authReducer.token);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logout(){
    dispatch(removeToken());
    router.push('/login');
    handleCloseUserMenu();
  }
  React.useEffect(()=>{
    if(localStorage.getItem("userToken")){
      dispatch(getUserData())
    }
  },[user, dispatch, localStorage.getItem("userToken")]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform:'uppercase'
            }}
          >
             <Link href={'/'} >circle</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}>
              {pages.map((page , Index) => (
                <MenuItem key={Index} onClick={()=>{router.push(page.link);handleCloseNavMenu();}}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform:'uppercase'
            }}
          >
            {token? <Link href={'/'} >circle</Link>: "circle"}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,Index) => (
              <Button
                key={Index}
                onClick={()=>{router.push(page.link);handleCloseNavMenu();}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{width: 50, height: 50, border: '4px solid #fff',}}> 
                  {user && token &&
                  <Image width={50} height={50} alt={user?.name} src={user?.photo} />
                  }
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >


                {token ? 
                <Box>
                  <MenuItem onClick={()=>{router.push('/profile');handleCloseUserMenu();}}>
                    <Typography sx={{ textAlign: 'center' }}>
                       {user?.name}
                    </Typography>
                  </MenuItem>                      
                  <MenuItem onClick={logout}>
                    <Typography sx={{ textAlign: 'center' }}>
                      logout
                    </Typography>
                  </MenuItem>                                
                </Box>: 
                <Box>
                  <MenuItem onClick={()=>{router.push('/login');handleCloseUserMenu();}}>
                    <Typography sx={{ textAlign: 'center' }}>
                      login
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>{router.push('/register');handleCloseUserMenu();}}>
                    <Typography sx={{ textAlign: 'center' }}>
                      register
                    </Typography>
                  </MenuItem>                  
                </Box>
                }
     
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
