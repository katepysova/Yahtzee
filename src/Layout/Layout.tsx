import "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <main className="main">
      <div className="background-image" />
      {children}
    </main>
  );
}
export default Layout;
