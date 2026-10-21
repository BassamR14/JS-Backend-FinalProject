import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <h1>The Crooked Raven</h1>
    </header>
  );
}
