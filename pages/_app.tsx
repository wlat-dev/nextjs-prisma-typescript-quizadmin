import * as React from "react";
import type { GetServerSidePropsContext, NextComponentType } from "next";
import { GetServerSideProps } from "next";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "katex/dist/katex.min.css";

import { useSession } from "../src/utils/useSession";
import { getSession, SessionProvider } from "next-auth/react";

// import { SessionProvider, useSession } from "next-auth/react";

import Layout from "../src/components/ui/Layout";
import { useLocalStorage } from "@mantine/hooks";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function App(
  props: CustomAppProps & { colorScheme: ColorScheme }
) {
  const [queryClient] = React.useState(() => new QueryClient());

  const { Component, pageProps } = props;

  /* Toggle Color Scheme */
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      <Head>
        <title>Latshaw Prep</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Hydrate state={pageProps.dehydratedState}>
                <SessionProvider>
                  <Auth>
                    <Layout visible={{ isVisible, setIsVisible }}>
                      <Component {...pageProps} />
                    </Layout>
                  </Auth>
                </SessionProvider>
              </Hydrate>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

const Auth = ({ children }: React.PropsWithChildren<{}>) => {
  const [session, loading] = useSession({
    required: true,
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  });
  if (session) {
    return <>{children}</>;
  } else if (!session && !loading) {
    return <div>unauthenticated!</div>;
  }
  return (
    <div>
      <>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    </div>
  );
};

// Theme from cookies instead of local storage
// -------------------------------------------
// import { getCookie, setCookies } from "cookies-next";
// const [colorScheme, setColorScheme] = React.useState<ColorScheme>(
//   props.colorScheme
// );
// const toggleColorScheme = (value?: ColorScheme) => {
//   const nextColorScheme =
//     value || (colorScheme === "dark" ? "light" : "dark");
//   setColorScheme(nextColorScheme);
//   setCookies("mantine-color-scheme", nextColorScheme, {
//     maxAge: 60 * 60 * 24 * 30,
//   });
// };
// App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
//   colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
// });
