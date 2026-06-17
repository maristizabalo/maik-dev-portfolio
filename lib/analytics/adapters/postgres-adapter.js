// Placeholder intentionally not wired yet.
//
// Production note:
// Replace the memory adapter with a persistent adapter backed by Postgres,
// Redis, Supabase, or another managed store. Keep the same public methods:
// trackVisit(visit), getVisits({ limit, page }) and getAllVisits().
//
// This file exists so the storage boundary is already clear and pages/API
// routes do not need to change when persistence is added.

export const postgresAdapter = {
  async trackVisit() {
    throw new Error("Postgres analytics adapter is not implemented yet.");
  },

  async getVisits() {
    throw new Error("Postgres analytics adapter is not implemented yet.");
  },

  async getAllVisits() {
    throw new Error("Postgres analytics adapter is not implemented yet.");
  },
};
