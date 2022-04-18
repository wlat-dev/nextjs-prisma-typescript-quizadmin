import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main style={{ marginTop: "5vh", marginBottom: "5vh" }}>{children}</main>
      <Footer />
    </>
  );
}
