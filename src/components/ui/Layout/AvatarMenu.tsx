import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "../../../utils/useSession";
import { Avatar, Menu, Text } from "@mantine/core";
import { Logout, Settings, UserCircle } from "tabler-icons-react";

export default function AvatarMenu() {
  const [session, loading] = useSession();

  return (
    <>
      {session?.user && (
        <>
          {session?.user?.image ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Menu
                trigger="hover"
                delay={500}
                control={<Avatar src={`${session.user.image}`} radius="xl" />}
              >
                <Menu.Item icon={<UserCircle size={20} />}>
                  <Text size="sm" color="gray">
                    Learning Dashboard
                  </Text>
                </Menu.Item>
                <Menu.Item icon={<Settings size={20} />}>
                  <Text size="sm" color="gray">
                    Account Settings
                  </Text>
                </Menu.Item>
                <Menu.Item icon={<Logout size={20} />}>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Text size="sm" color="gray">
                      Sign out
                    </Text>
                  </a>
                </Menu.Item>
              </Menu>
              <Text size="xs" color="gray">
                {`Hello, ${session.user.name}!`}
              </Text>
            </div>
          ) : (
            <Avatar radius="xl" />
          )}
        </>
      )}
    </>
  );
}
