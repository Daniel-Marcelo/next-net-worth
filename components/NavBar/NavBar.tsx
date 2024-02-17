import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { x } from "@xstyled/styled-components";
import { useRouter } from "next/router";
import { Route } from "../../const/routes.constants";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useLogout } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

const ToolbarButton = ({
  selected,
  children,
  onClick,
}: React.PropsWithChildren<{ selected?: boolean; onClick: () => void }>) => (
  <x.div display="flex" flexDirection="column">
    <Button sx={{ color: "#fff" }} onClick={onClick}>
      {children}
    </Button>
    {selected && (
      <x.div display="flex" justifyContent="center">
        <x.span h="1px" w="10px" bg="#fff"></x.span>
      </x.div>
    )}
  </x.div>
);
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{ text: "Dashboard", route: Route.Dashboard }];

export function DrawerAppBar(props: Props) {
  const user = useAuthContext();
  const logout = useLogout();
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Next Net Worthss
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ text: item, route }) => (
          <ListItem key={route} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block" } }}
          >
            Next Net Worth
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(({ text, route }) => (
              <ToolbarButton
                selected={router.pathname === route}
                onClick={() => router.push(route)}
              >
                {text}
              </ToolbarButton>
            ))}
          </Box>
          {user ? (
            <ToolbarButton onClick={() => logout.mutate()}>
              Logout
            </ToolbarButton>
          ) : (
            <ToolbarButton
              selected={router.pathname === "/login"}
              onClick={() => router.push("/login")}
            >
              Login
            </ToolbarButton>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  );
}
