import { Center, Footer, FooterProps } from "@mantine/core";

export default function _Footer(props: FooterProps) {
  return (
    <Footer {...props}>
      <Center>© Copyright {new Date().getFullYear()} William Latshaw</Center>
    </Footer>
  );
}
