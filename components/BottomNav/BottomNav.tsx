import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import {
  NavIndexToRoute,
  Route,
  RouteToNavIndex,
} from "../../const/routes.constants";
import { useSession } from "next-auth/react";

export function FixedBottomNavigation() {
  const { data: session } = useSession();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (ref?.current) {
      ref.current.ownerDocument.body.scrollTop = 0;
    }
  }, [value]);

  if (!session) return <></>;

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={RouteToNavIndex.get(pathname as Route)}
          onChange={(event, newValue) =>
            router.replace(NavIndexToRoute.get(newValue))
          }
        >
          <BottomNavigationAction
            label="Dashboard"
            icon={<AccountCircleIcon />}
          />
          <BottomNavigationAction
            label="Account"
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
