import React from "react";
import {
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Text,
} from "@mantine/core";
import AvatarMenu from "./AvatarMenu";
import ColorSchemeToggle from "./ColorSchemeToggle";
import Link from "next/link";

export default function _Header({ ...props }) {
  const theme = useMantineTheme();
  return (
    <Header height={props.height} p={props.p}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={props.open}
            onClick={() => props.setOpen((o: boolean) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ColorSchemeToggle />
          <Link href="/" passHref>
            <Text
              ml={"xs"}
              sx={{ textDecoration: "none" }}
              styles={() => ({
                root: {
                  "&:hover": { textDecoration: "none", cursor: "pointer" },
                },
              })}
            >
              Latshaw Prep
            </Text>
          </Link>
        </div>
        <AvatarMenu />
      </div>
    </Header>
  );
}
