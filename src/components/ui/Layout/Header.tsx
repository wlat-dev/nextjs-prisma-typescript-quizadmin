import * as React from "react";
import Link from "next/link";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ColorModeToggler from "./ColorModeToggler";
import axios from "axios";
import { useQuery } from "react-query";
import { Stack } from "@mui/material";

const settings = ["Profile", "Account", "Dashboard"];

const Header = () => {
  const { data: session, status } = useSession();
  const loading: boolean = status === "loading";
  const authenticated: boolean = status === "authenticated";

  const { isLoading, error, data, isFetching } = useQuery("enrollments", () =>
    axios.get("/api/getenrollments").then((res) => res.data)
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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

  return (
    <header>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                noWrap
                minWidth="20%"
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                LATSHAW PREP
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link href="/" passHref>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                </Link>
                <Link href="/about" passHref>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                </Link>
                <Link href="/enroll" passHref>
                  <MenuItem onClick={handleCloseNavMenu} key={"enroll"}>
                    <Typography textAlign="center">Enroll</Typography>
                  </MenuItem>
                </Link>
                {!isLoading &&
                  !error &&
                  data.enrolledCourses.map((course: string, index: number) => (
                    <Link
                      key={index}
                      href={`${course.split(" ").join("_")}`}
                      passHref
                    >
                      <MenuItem onClick={handleCloseNavMenu}>{course}</MenuItem>
                    </Link>
                  ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Link href="/about" passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "gray", display: "block" }}
                >
                  About
                </Button>
              </Link>
              <Link href="/enroll" passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "gray", display: "block" }}
                >
                  Enroll
                </Button>
              </Link>
              {authenticated && (
                <Stack sx={{ mx: 4 }} spacing={2} direction="row">
                  {!isLoading &&
                    !error &&
                    data.enrolledCourses.map(
                      (course: string, index: number) => (
                        <Link
                          key={index}
                          href={`${course.split(" ").join("_")}`}
                        >
                          <Button
                            sx={{
                              display: "block",
                              whiteSpace: "nowrap",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                            variant="outlined"
                            color="primary"
                          >
                            {course}
                          </Button>
                        </Link>
                      )
                    )}
                </Stack>
              )}
            </Box>
            <ColorModeToggler />
            {authenticated ? (
              <>
                <Box
                  sx={{
                    flexGrow: 0,
                    opacity: !session && loading ? 0 : 1,
                  }}
                >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={`${session?.user?.name ? session.user.name : "?"}`}
                        src={`${
                          session?.user?.image ? session.user.image : null
                        }`}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                    <MenuItem key={"signout"} onClick={() => signOut()}>
                      <Typography textAlign="center">Sign out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => signIn()}
                  sx={{ opacity: !session && loading ? 0 : 1 }}
                >
                  Sign in
                </MenuItem>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
