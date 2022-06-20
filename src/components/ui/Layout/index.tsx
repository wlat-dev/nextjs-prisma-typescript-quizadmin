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
import _Layout from "./_Layout";
import { LayoutContext } from "../../../../pages/_app";
import { Button } from "@mantine/core";
import { ViewportNarrow, ViewportWide } from "tabler-icons-react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const theme = useMantineTheme();

  const layoutContext = React.useContext(LayoutContext);
  const isVisible = layoutContext?.isVisible;
  const setIsVisible = layoutContext?.setIsVisible;

  const LayoutToggle = (): React.ReactElement => {
    return (
      <>
        <Button size="xs" px="0" onClick={() => setIsVisible!(!isVisible)}>
          {isVisible ? <ViewportNarrow /> : <ViewportWide />}
        </Button>
      </>
    );
  };

  if (layoutContext?.isVisible) {
    return (
      <_Layout>
        {/* <LayoutToggle /> */}
        {children}
      </_Layout>
    );
  }
  return (
    <>
      {/* <LayoutToggle /> */}
      {children}
    </>
  );
}
