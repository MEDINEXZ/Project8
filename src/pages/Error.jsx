import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Помилка";
  let message = "Щось пішло не так.";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || message;
    if (typeof error.data === "string") message = error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>{title}</h1>
      <p style={{ color: "crimson", fontSize: 16 }}>{message}</p>

      <p style={{ marginTop: 16 }}>
        <Link to="/">← На головну</Link>
      </p>
    </div>
  );
}