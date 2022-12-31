export const getRoutesObject = (urls: string[], root = "/") => {
  const routes: { [key: string]: { url: string; name: string }[] } = {};
  for (const url of urls) {
    const path = url.substring(root.length);
    const parts = path.split("/").filter(Boolean);
    const route = parts.slice(0, parts.length - 1).join("/");
    if (!routes[route]) {
      routes[route] = [];
    }
    routes[route].push({
      url,
      name: parts[parts.length - 1],
    });
  }
  return routes;
};
