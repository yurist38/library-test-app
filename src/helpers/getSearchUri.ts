export default function(query: string): string {
  const params = new URLSearchParams({
    title: query,
  });

  return `/search.json?${params.toString()}`;
}
