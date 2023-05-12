export async function exhibitLoader({ params }) {
  const url = `${import.meta.env.VITE_BACKEND_URL}/piece/${params.id}`;
  return await fetch(url).then((res) => res.json());
}
