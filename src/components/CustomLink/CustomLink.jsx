import { Link } from "react-router";

function CustomLink({ title, path, color = "primary" }) {
  return (
    <Link
      to={path}
      className={`btn btn-md btn-${color}`}
      role="button"
      aria-pressed="true"
      style={{ marginTop: "15px" }}
    >
      {title}
    </Link>
  );
}

export default CustomLink;
