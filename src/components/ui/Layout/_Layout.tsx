import Footer from "./_Footer";
import React, { SetStateAction } from "react";
import {
  AppShell,
  Navbar,
  MediaQuery,
  Aside,
  Burger,
  useMantineTheme,
  Text,
} from "@mantine/core";
import Header from "./_Header";
import ColorSchemeToggle from "./ColorSchemeToggle";

export default function _Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  /* Navbar State */
  const [open, setOpen] = React.useState(false);

  const theme = useMantineTheme();

  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!open}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={<Header height={70} p="md" open={open} setOpen={setOpen} />}
      >
        {children}
      </AppShell>
    </>
  );
}
