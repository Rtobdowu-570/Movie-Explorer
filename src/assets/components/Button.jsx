import { Link } from "react-router";

export default function Button({
  to,
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}) {
  const classes = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
