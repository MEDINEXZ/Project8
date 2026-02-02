import { useLoaderData, Link } from "react-router-dom";

export async function detailsLoader({ params }) {
  const { resourceId } = params;
  
  const allMakesUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
  const response = await fetch(allMakesUrl);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Failed to fetch resource details" }),
      { status: response.status }
    );
  }

  const data = await response.json();
  const make = data.Results.find(m => m.Make_ID === parseInt(resourceId));
  
  if (!make) {
    throw new Response(
      JSON.stringify({ message: "Resource not found" }),
      { status: 404 }
    );
  }
  
  return make;
}

export default function ResourceDetailsPage() {
  const resource = useLoaderData();

  return (
    <div>
      <h1>{resource.Make_Name}</h1>
      <p>ID: {resource.Make_ID}</p>
      <Link to="/resources">← Back to list</Link>
    </div>
  );
}
