// Create a case insensitive regex
export const caseInsensitiveRegex = (value: string) => {
  return { $regex: new RegExp(value, "i") };
};

// Parse a year or year range
export const parseYears = (
  year: any
): number | { $gte?: number; $lte?: number } => {
  if (typeof year === "string" || typeof year === "number") {
    return Number(year);
  }
  const parsedRange: { $gte?: number; $lte?: number } = {};
  if (year?.gte) parsedRange.$gte = Number(year.gte);
  if (year?.lte) parsedRange.$lte = Number(year.lte);
  return parsedRange;
};

// Parse tastes
export const parseTastes = (taste: string): RegExp[] => {
  return taste.split(",").map((t) => new RegExp(t, "i"));
};

// Numeric range query for count in cellar
export const buildRangeQuery = (
  min?: string,
  max?: string
): { $gte?: number; $lte?: number } => {
  const rangeQuery: { $gte?: number; $lte?: number } = {};
  if (min) rangeQuery.$gte = Number(min);
  if (max) rangeQuery.$lte = Number(max);
  return rangeQuery;
};
