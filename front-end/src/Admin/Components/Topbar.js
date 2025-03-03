import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'; // Thêm Box vào đây
import { Notifications, AccountCircle } from '@mui/icons-material';

const Topbar = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#0f172a',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" noWrap>
                    Hệ thống học tiếng Anh
                </Typography>
                <Box>
                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
