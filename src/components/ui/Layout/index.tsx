import {
  AppShell,
  Navbar,
  MediaQuery,
  Aside,
  Footer,
  Header,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import ColorSchemeToggle from "./ColorSchemeToggle";
import UserLayout from "./_Layout";

export default function Layout({
  visible,
  children,
}: {
  visible: {
    isVisible: boolean;
    // TODO: use setIsVisible to hide appbar on .admin and focus mode
    setIsVisible: React.Dispatch<React.SetStateAction<any>>;
  };
  children: React.ReactNode;
}): React.ReactElement {
  const theme = useMantineTheme();

  if (visible.isVisible) {
    return <UserLayout>{children}</UserLayout>;
  }
  return <>{children}</>;
}
