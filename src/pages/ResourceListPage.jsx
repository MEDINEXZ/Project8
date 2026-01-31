import { useLoaderData } from "react-router-dom";

const mockMakes = [
  { make_id: "1", make_display: "BMW", make_country: "Germany" },
  { make_id: "2", make_display: "Toyota", make_country: "Japan" },
  { make_id: "3", make_display: "Ford", make_country: "USA" },
  { make_id: "4", make_display: "Honda", make_country: "Japan" },
  { make_id: "5", make_display: "Mercedes-Benz", make_country: "Germany" },
  { make_id: "6", make_display: "Audi", make_country: "Germany" },
  { make_id: "7", make_display: "Volkswagen", make_country: "Germany" },
  { make_id: "8", make_display: "Nissan", make_country: "Japan" },
  { make_id: "9", make_display: "Chevrolet", make_country: "USA" },
  { make_id: "10", make_display: "Hyundai", make_country: "South Korea" },
];

export async function listLoader() {
  const url = "http://www.carqueryapi.com/api/0.3/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn("API returned error, using mock data");
      return mockMakes;
    }

    const data = await response.json();

    // CarQuery возвращает объект вида { Makes: [...] }
    if (!data?.Makes) {
      console.warn("Unexpected API response, using mock data");
      return mockMakes;
    }

    return data.Makes;
  } catch (error) {
    console.warn("Failed to fetch from API, using mock data:", error);
    return mockMakes;
  }
}

export default function ResourceListPage() {
  const makes = useLoaderData();

  return (
    <div>
      <h1>Car Makes</h1>
      <ul>
        {makes.slice(0, 20).map((m) => (
          <li key={m.make_id}>
            <h3>{m.make_display}</h3>
            <p>Country: {m.make_country || "—"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
