'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Home, ListAlt, Add, BarChart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { 
  Box, 
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const drawerWidth = 240;

const menu = [
    {title: 'ホーム', icon: <Home />, path: '/'},
    {title: '明細一覧', icon: <ListAlt />, path: '/detail/listing'},
    {title: '新規登録', icon: <Add />, path: '/register/add'},
    {title: '月次集計', icon: <BarChart />, path: '/summary/monthly'},
];

export default function RootLayout({ children }: { children: ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        handleDrawerClose();
    };

    const drawer = (
        <Box sx={{ height: '100vh' }}>
            <List>
                {menu.map(menu => (
                    <ListItem key={menu.title} disablePadding>
                        <ListItemButton 
                            onClick={() => handleNavigation(menu.path)}
                            selected={pathname === menu.path}
                        >
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <html lang="ja">
          <body>
            <Box sx={{ display: 'flex', minHeight: "100vh"}}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            家計簿アプリ
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        mt: 8
                    }}
                >
                    {children}
                </Box>
            </Box>
          </body>
        </html>
    );
}