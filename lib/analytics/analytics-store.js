import { memoryAdapter } from "./adapters/memory-adapter";

const getAdapter = () => {
  // ANALYTICS_STORAGE_ADAPTER is optional and reserved for the next phase.
  // For now memory is the only active adapter because Vercel/serverless file
  // writes are not reliable for durable analytics storage.
  return memoryAdapter;
};

const startOfBogotaDay = (date = new Date()) => {
  const bogotaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return bogotaDate;
};

const countBy = (visits, key) => {
  return visits.reduce((acc, visit) => {
    const value = visit[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

const topEntries = (map, limit = 5) => {
  return Object.entries(map)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const trackVisit = async (payload) => {
  return getAdapter().trackVisit(payload);
};

export const getVisits = async ({ limit = 50, page = 1 } = {}) => {
  return getAdapter().getVisits({ limit, page });
};

export const getVisitStats = async () => {
  const visits = await getAdapter().getAllVisits();
  const today = startOfBogotaDay();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const visitsToday = visits.filter((visit) => visit.date === today).length;
  const visitsLast7Days = visits.filter((visit) => {
    const createdAt = new Date(visit.createdAt).getTime();
    return Number.isFinite(createdAt) && createdAt >= sevenDaysAgo;
  }).length;

  return {
    total: visits.length,
    today: visitsToday,
    last7Days: visitsLast7Days,
    topRoutes: topEntries(countBy(visits, "path"), 8),
    devices: topEntries(countBy(visits, "device"), 5),
  };
};
