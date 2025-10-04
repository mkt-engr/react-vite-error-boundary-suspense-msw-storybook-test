import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <header>
        <nav>
          <Link to="/">Shop</Link>
          {" | "}
          <Link to="/cheap">CheapShop</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  ),
});
