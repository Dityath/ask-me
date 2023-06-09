interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <main className="flex justify-center items-center w-screen h-screen px-5 md:px-20">
      <div className={`max-w-lg w-full ${className}`}>{children}</div>
    </main>
  );
};

export default Layout;
