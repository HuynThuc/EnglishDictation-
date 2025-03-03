import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard, MenuBook, BarChart, Settings, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { text: 'Quản lý bài học', icon: <MenuBook />, path: '/admin/lessons' },
        { text: 'Challenges', icon: <BarChart />, path: '/admin/statistics' },
        { text: 'Cài đặt', icon: <Settings />, path: '/admin/settings' },
        { text: 'Đăng xuất', icon: <Logout />, path: '/' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 260,
                '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box', backgroundColor: '#1e293b', color: '#fff' },
            }}
        >
            <Toolbar />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => navigate(item.path)}
                        sx={{
                            '&:hover': { backgroundColor: '#334155' },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
