import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logoImage from '../assets/Logo.svg';

const drawerWidth = 400;

function getTypography(text) {
    return <Typography style={{
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '24px',
        lineHeight: '36px'
    }}> {text} </Typography>;
}

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "black",
            color: "white",
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{marginBottom: '130px'}}>
          <img src={logoImage} style={{width: "124px", height: "48px", marginTop: '40px', marginLeft: '35px'}}/>
        </Box>
        <Divider sx={{ backgroundColor: 'white', marginBottom: '40px' }}/>
        <List>
          <ListItem key={'Routes'} sx={{
            '&:hover': {
              backgroundColor: '#1976D2'
            }
          }}>
            <ListItemButton>
              <ListItemIcon>
                <DirectionsOutlinedIcon sx={{ color: 'white', fontSize: '30px' }}/>
              </ListItemIcon>
              <ListItemText primary={getTypography('Routes')} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Requests'} sx={{
            '&:hover': {
              backgroundColor: '#1976D2'
            }
          }}>
            <ListItemButton>
              <ListItemIcon>
                <BackHandOutlinedIcon sx={{ color: 'white', fontSize: '30px' }}/>
              </ListItemIcon>
              <ListItemText primary={getTypography('Requests')} />
            </ListItemButton>
          </ListItem>
        </List>
          <List style={{ position: "absolute", bottom: "0", left: "0", right: "0", padding: "8px" }}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutOutlinedIcon sx={{ color: 'white', fontSize: '30px' }}/>
                    </ListItemIcon>
                    <ListItemText primary={getTypography('Logout')} />
                </ListItemButton>
            </ListItem>
          </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet.
        </Typography>
      </Box>
    </Box>
  );
}
