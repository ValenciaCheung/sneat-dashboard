import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Specific hooks for different data types
export function useAnalyticsStats() {
  return useApi(() => apiService.getAnalyticsStats());
}

export function useChartData(type?: string) {
  return useApi(() => apiService.getChartData(type), [type]);
}

export function useProductData() {
  return useApi(() => apiService.getProductData());
}

export function useCRMStats() {
  return useApi(() => apiService.getCRMStats());
}

export function useSalesFunnel() {
  return useApi(() => apiService.getSalesFunnel());
}

export function useCustomers() {
  return useApi(() => apiService.getCustomers());
}

export function useActivities() {
  return useApi(() => apiService.getActivities());
}

export function useECommerceStats() {
  return useApi(() => apiService.getECommerceStats());
}

export function useProducts() {
  return useApi(() => apiService.getProducts());
}

export function useOrders() {
  return useApi(() => apiService.getOrders());
}

export function useEmails() {
  return useApi(() => apiService.getEmails());
}

export function useEmailFolders() {
  return useApi(() => apiService.getEmailFolders());
}

export function useContacts() {
  return useApi(() => apiService.getContacts());
}

export function useMessages(contactId?: string) {
  return useApi(() => apiService.getMessages(contactId), [contactId]);
}

export function useEvents(date?: string, type?: string) {
  return useApi(() => apiService.getEvents(date, type), [date, type]);
}

// New hooks for enhanced Analytics data
export function useRecentActivities(limit?: number) {
  return useApi(() => apiService.getRecentActivities(limit), [limit]);
}

export function useDeviceStats() {
  return useApi(() => apiService.getDeviceStats());
}

export function useGeographicData() {
  return useApi(() => apiService.getGeographicData());
}

export function useNotifications(userId?: string, isRead?: boolean) {
  return useApi(() => apiService.getNotifications(userId, isRead), [userId, isRead]);
}

export function useQuickActions() {
  return useApi(() => apiService.getQuickActions());
}

export function useDashboardSummary() {
  return useApi(() => apiService.getDashboardSummary());
}