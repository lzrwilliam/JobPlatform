import React, { useState } from "react";
import { Badge, IconButton, Box, Typography, Drawer, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsBar = ({ notifications, deleteNotification, clearAllNotifications }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ position: "fixed", top: 0, right: 0, backgroundColor: "#fff", padding: "10px", zIndex: 1000 }}>
      <IconButton onClick={toggleDrawer}>
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 350, padding: "10px" }}>
          <Typography variant="h6">Notifications</Typography>
          <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <Typography>No notifications.</Typography>
            ) : (
              notifications.map(({ message, hash }, index) => (
                <Box key={index} sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Typography>{message}</Typography>
                  <Button color="error" onClick={() => deleteNotification(hash)}>
                    Delete
                  </Button>
                </Box>
              ))
            )}
          </Box>
          {notifications.length > 0 && (
            <Box textAlign="center" mt={2}>
              <Button variant="contained" color="error" onClick={clearAllNotifications}>
                Clear All
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default NotificationsBar;
