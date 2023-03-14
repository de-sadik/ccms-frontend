import { AppBar, Badge, IconButton,Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import { AccountCircle, Dashboard, Menu, NotificationsActive } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import './style.css'
import { userService } from '../../services/userService';
import { useHistory } from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Router } from '@material-ui/icons';
import sound from './alert_high-intensity.mp3'

const useAudio = () => {
  const [audio] = useState(new Audio(sound));
  const [playing, setPlaying] = useState(false);
  console.log(playing)
  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      console.log("rem")
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return setPlaying
};


export default function AppBarComponet() {
  const[ntCount,setNTCount] = useState(0)
  const [data,setData] = useState(null)
  const play = useAudio();
  
  const history = useHistory();
  
  const getNotification = (play,count) =>{
    setNTCount(count.length)
    play(true)
    setData(count)
  }
  // let ntdata = [
  //   {
  //     "Consumer No": "TAN0000013",
  //     Location: "NAGRIK",
  //     Status: "OFF",
  //     "I/P MCB": "\u2714",
  //     "O/P MCB": "\u2714",
  //     "Active Load(Kw)": 0,
  //     "Update Time": "27-12-2021 11:51",
  //   },
  //   {
  //     "Consumer No": "TAN0000014",
  //     Location: "BAZARPETH",
  //     Status: "OFF",
  //     "I/P MCB": "\u2714",
  //     "O/P MCB": "\u2714",
  //     "Active Load(Kw)": 0,
  //     "Update Time": "27-12-2021 11:51",
  //   },
  //   {
  //     "Consumer No": "TAN0000015",
  //     Location: "ANAND SUBWAY",
  //     Status: "OFF",
  //     "I/P MCB": "\u2714",
  //     "O/P MCB": "\u2714",
  //     "Active Load(Kw)": 0,
  //     "Update Time": "27-12-2021 11:46",
  //   },
  //   {
  //     "Consumer No": "TAN0000016",
  //     Location: "BHAKTI MANDIR",
  //     Status: "OFF",
  //     "I/P MCB": "\u2714",
  //     "O/P MCB": "\u2714",
  //     "Active Load(Kw)": 0,
  //     "Update Time": "27-12-2021 11:51",
  //   },
  // ];
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const goToNotification = ()=>{
    setNTCount(0);
    history.push("/notification",{record: data})
  }
  const goToHome = () =>{
    history.push("/vendor-page")
  }
  const goToViewPanel = ()=>{
    history.push("/dashboard")
  }

  useEffect(() => {
    const ws = new WebSocket("ws://4.224.28.64:8000/ws");
    ws.onopen = () => {
    console.log("Connection Established!");};
    ws.onmessage = (event) => {
    const data = JSON.parse(event.data) 
    console.log(data.length);
    getNotification(play,data);
  };
    ws.onclose = () => {
    console.log("Connection Closed!");};
  
    ws.onerror = () => {
    console.log("WS Error");};
    return () => {
    ws.close();
  };
 }, []);

  const list = (anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => ( */}
          <ListItem key={"Home"} disablePadding>
            <ListItemButton onClick={goToHome}>
              <ListItemIcon>
                <Dashboard/>
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Panels"} disablePadding>
            <ListItemButton onClick={goToViewPanel}>
              <ListItemIcon>
                <Router/>
              </ListItemIcon>
              <ListItemText primary={"Panels"} />
            </ListItemButton>
          </ListItem>
        {/* ))} */}
      </List>
    </Box>
  );

  return (
    <React.Fragment key={"left"}>
    <Box sx={{flexGrow:1}}>
      <AppBar  position="static" >
        <Toolbar>
          <IconButton 
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
            sx={{mr: 2}}>
            <Menu/>  
          </IconButton>
          <Typography
           variant="h6"
           noWrap
           component="div"
           sx={{ display: { xs: 'none', sm: 'block'}}}>
             CCMS  Thane
          </Typography>
          <Box sx={{ flexGrow: 1}}/>
          <Box sx={{ display: {xs: 'none', md:'flex'}}}>
            <IconButton
            size="large"
            aria-label="notifications"
            color="inherit"
            onClick={goToNotification}
            >
              <Badge badgeContent={ntCount} color="error">
                <NotificationsActive sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
            <IconButton
            size="large"
            edge='end'
            color='inherit'>
              <AccountCircle  />           
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>

    </Box>
    <Drawer 
          PaperProps={{
            sx: {"width":"250px"}
          }}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
