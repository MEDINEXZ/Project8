import { useLoaderData, Link } from "react-router-dom";
import SearchForm from "./SearchForm.jsx";

export async function listLoader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const apiUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Failed to fetch car makes" }),
      { status: response.status }
    );
  }

  const data = await response.json();
  const makes = data.Results || [];

  if (query) {
    return makes.filter((make) =>
      make.Make_Name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return makes;
}

export default function ResourceListPage() {
  const makes = useLoaderData();

  return (
    <div>
      <h1>Car Makes</h1>
      
      <SearchForm />

      <ul>
        {makes.slice(0, 20).map((m) => (
          <li key={m.Make_ID}>
            <Link to={`/resources/${m.Make_ID}`}>
              <h3>{m.Make_Name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
