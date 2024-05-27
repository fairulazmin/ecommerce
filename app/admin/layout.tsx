import { Nav, NavLink } from "@/components/nav";

// Force NextJS to not cache any admin page
export const dynamic = "force-dynamic";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav>
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Users</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default AdminLayout;
