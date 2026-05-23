export const buildUrl3 = (url: string, params: Record<string, any>) => {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    )
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.map((v) => encodeURIComponent(v)).join(",")}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return query ? `${url}?${query}` : url;
};
