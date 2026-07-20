export type OverviewBar = { label: string; count: number };

export type Overview = {
  totals: {
    visitors: number;
    sessions: number;
    pageViews: number;
    events: number;
    conversions: number;
    avgSessionSeconds: number;
    bounceRate: number;
    avgScrollDepth: number;
  };
  byCountry: OverviewBar[];
  bySource: OverviewBar[];
  byDevice: OverviewBar[];
  topPages: OverviewBar[];
  byEvent: OverviewBar[];
  chat: { conversations: number; messages: number; unanswered: number };
  contact: { total: number; unread: number };
};

export const EMPTY_OVERVIEW: Overview = {
  totals: {
    visitors: 0,
    sessions: 0,
    pageViews: 0,
    events: 0,
    conversions: 0,
    avgSessionSeconds: 0,
    bounceRate: 0,
    avgScrollDepth: 0,
  },
  byCountry: [],
  bySource: [],
  byDevice: [],
  topPages: [],
  byEvent: [],
  chat: { conversations: 0, messages: 0, unanswered: 0 },
  contact: { total: 0, unread: 0 },
};

export function periodRange(period: string): { from: string; to: string } {
  const to = new Date();
  const from = new Date();
  switch (period) {
    case "7d":
      from.setDate(from.getDate() - 7);
      break;
    case "90d":
      from.setDate(from.getDate() - 90);
      break;
    case "year":
      from.setMonth(0, 1);
      from.setHours(0, 0, 0, 0);
      break;
    case "all":
      from.setFullYear(2020, 0, 1);
      break;
    default:
      from.setDate(from.getDate() - 30);
  }
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}
