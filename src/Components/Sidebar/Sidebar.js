import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../Assets/Images/Logo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper, Grid, MenuList, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100vh",
  boxShadow: "none",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Sidebar({ children, location }) {
  const navigate = useNavigate();
  const activeStyle = {
    background: "skyblue",
    color: "white",
    padding: "7px",
    borderRadius: 2,
  };
  const inActiveStyle = {
    background: "white",
    color: "black",
    padding: "7px",
    borderRadius: 2,
  };

  const [open, setOpen] = React.useState(true);
  const [Routes, setRoutes] = React.useState([
    "Dashboard",
    "Explore",
    "Calender",
    "Settings",
  ]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const isActive = (route) => {
    if (route?.toLowerCase()?.includes(location?.pathname?.toLowerCase())) {
      return activeStyle;
    } else {
      return inActiveStyle;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <img src={logo} />
      <Divider />
      <List>
        {Routes.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton  onClick={() => {
                      navigate(`/${text}`);
                    }}>
              <ListItemIcon>
                <InboxIcon/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <div>
       <Box sx={{display:"flex", justifyContent:"left"}}>
         <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
       </Box>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Box>
          <Item>{children}</Item>
        </Box>
      </div>
    );
  } else {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid size={2}  sm={4} md={2}height={`100vh`}>
            <Item>
              <MenuList>
                <img src={logo} />
              </MenuList>
              <MenuList>
                <MenuItem>
                  <ListItemText
                    sx={isActive("/Dashboard")}
                    onClick={() => {
                      navigate(`/Dashboard`);
                    }}
                  >
                    Dashboard
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    sx={isActive("/Explore")}
                    onClick={() => {
                      navigate(`/Explore`);
                    }}
                  >
                    Explore
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    sx={isActive("/Calender")}
                    onClick={() => {
                      navigate(`/Calender`);
                    }}
                  >
                    Calender
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    sx={isActive("/Settings")}
                    onClick={() => {
                      navigate(`/Settings`);
                    }}
                  >
                    Settings
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Item>
          </Grid>
          <Grid size={10} sm={8} md={12}>
            <Item>{children}</Item>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
