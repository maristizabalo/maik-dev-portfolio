const MAX_VISITS = 1000;

const getState = () => {
  if (!globalThis.__maicolAnalyticsMemoryStore) {
    globalThis.__maicolAnalyticsMemoryStore = {
      visits: [],
    };
  }

  return globalThis.__maicolAnalyticsMemoryStore;
};

export const memoryAdapter = {
  async trackVisit(visit) {
    const state = getState();
    state.visits.unshift(visit);

    if (state.visits.length > MAX_VISITS) {
      state.visits = state.visits.slice(0, MAX_VISITS);
    }

    return visit;
  },

  async getVisits({ limit = 50, page = 1 } = {}) {
    const state = getState();
    const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const start = (safePage - 1) * safeLimit;
    const end = start + safeLimit;

    return {
      visits: state.visits.slice(start, end),
      total: state.visits.length,
      limit: safeLimit,
      page: safePage,
    };
  },

  async getAllVisits() {
    const state = getState();
    return [...state.visits];
  },
};
