// API utilities for dashboard
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export interface DashboardStats {
  totalReports: number;
  planType: "free" | "pro" | "enterprise";
  usedQueries: number;
  queryLimit: number;
  remainingUsage: number;
  userName: string;
}

export interface Report {
  _id: string;
  userId: string;
  inputData: Record<string, any>;
  result: Record<string, any>;
  type: string;
  createdAt: string;
}

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  plan: string;
  used_queries: number;
  query_limit: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch stats");
    const data = await response.json();
    return data.data;
  },

  getHistory: async (page = 1, limit = 10): Promise<{ reports: Report[]; total: number; pages: number }> => {
    const response = await fetch(`${API_URL}/dashboard/history?page=${page}&limit=${limit}`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch history");
    const data = await response.json();
    return {
      reports: data.data,
      total: data.pagination.total,
      pages: data.pagination.pages,
    };
  },

  deleteReport: async (reportId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/dashboard/history/${reportId}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to delete report");
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await fetch(`${API_URL}/dashboard/profile`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) throw new Error("Failed to fetch profile");
    const data = await response.json();
    return data.data;
  },

  updateProfile: async (name: string): Promise<UserProfile> => {
    const response = await fetch(`${API_URL}/dashboard/profile`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Failed to update profile");
    const data = await response.json();
    return data.data;
  },

  generateReport: async (inputData: Record<string, any>, type: string = "numerology"): Promise<Report> => {
    const response = await fetch(`${API_URL}/tool/generate`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ inputData, type }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate report");
    }
    const data = await response.json();
    return data.data;
  },
};

export default dashboardAPI;
