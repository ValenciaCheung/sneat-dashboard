const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Analytics API
  async getAnalyticsStats() {
    return this.request('/analytics/stats');
  }

  async getChartData(type?: string) {
    const endpoint = type ? `/analytics/charts/${type}` : '/analytics/charts';
    return this.request(endpoint);
  }

  async getProductData() {
    return this.request('/analytics/products');
  }

  async createAnalyticsStat(data: any) {
    return this.request('/analytics/stats', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAnalyticsStat(id: string, data: any) {
    return this.request(`/analytics/stats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAnalyticsStat(id: string) {
    return this.request(`/analytics/stats/${id}`, {
      method: 'DELETE',
    });
  }

  // CRM API
  async getCRMStats() {
    return this.request('/crm/stats');
  }

  async getSalesFunnel() {
    return this.request('/crm/funnel');
  }

  async getCustomers() {
    return this.request('/crm/customers');
  }

  async getCustomer(id: string) {
    return this.request(`/crm/customers/${id}`);
  }

  async getActivities() {
    return this.request('/crm/activities');
  }

  async createCustomer(data: any) {
    return this.request('/crm/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCustomer(id: string, data: any) {
    return this.request(`/crm/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCustomer(id: string) {
    return this.request(`/crm/customers/${id}`, {
      method: 'DELETE',
    });
  }

  // eCommerce API
  async getECommerceStats() {
    return this.request('/ecommerce/stats');
  }

  async getProducts() {
    return this.request('/ecommerce/products');
  }

  async getProduct(id: string) {
    return this.request(`/ecommerce/products/${id}`);
  }

  async getOrders() {
    return this.request('/ecommerce/orders');
  }

  async getOrder(id: string) {
    return this.request(`/ecommerce/orders/${id}`);
  }

  async createProduct(data: any) {
    return this.request('/ecommerce/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/ecommerce/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/ecommerce/products/${id}`, {
      method: 'DELETE',
    });
  }

  async createOrder(data: any) {
    return this.request('/ecommerce/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrder(id: string, data: any) {
    return this.request(`/ecommerce/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteOrder(id: string) {
    return this.request(`/ecommerce/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Email API
  async getEmails() {
    return this.request('/email/emails');
  }

  async getEmail(id: string) {
    return this.request(`/email/emails/${id}`);
  }

  async getEmailFolders() {
    return this.request('/email/folders');
  }

  async createEmail(data: any) {
    return this.request('/email/emails', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEmail(id: string, data: any) {
    return this.request(`/email/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEmail(id: string) {
    return this.request(`/email/emails/${id}`, {
      method: 'DELETE',
    });
  }

  async markEmailAsRead(id: string, isRead: boolean) {
    return this.request(`/email/emails/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead }),
    });
  }

  async markEmailAsStarred(id: string, isStarred: boolean) {
    return this.request(`/email/emails/${id}/star`, {
      method: 'PATCH',
      body: JSON.stringify({ isStarred }),
    });
  }

  // Chat API
  async getContacts() {
    return this.request('/chat/contacts');
  }

  async getContact(id: string) {
    return this.request(`/chat/contacts/${id}`);
  }

  async getMessages(contactId?: string) {
    const endpoint = contactId ? `/chat/messages?contactId=${contactId}` : '/chat/messages';
    return this.request(endpoint);
  }

  async getContactMessages(contactId: string) {
    return this.request(`/chat/contacts/${contactId}/messages`);
  }

  async createContact(data: any) {
    return this.request('/chat/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContact(id: string, data: any) {
    return this.request(`/chat/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateContactStatus(id: string, status: string) {
    return this.request(`/chat/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async sendMessage(data: any) {
    return this.request('/chat/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteMessage(id: string) {
    return this.request(`/chat/messages/${id}`, {
      method: 'DELETE',
    });
  }

  // Calendar API
  async getEvents(date?: string, type?: string) {
    let endpoint = '/calendar/events';
    const params = new URLSearchParams();
    
    if (date) params.append('date', date);
    if (type) params.append('type', type);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return this.request(endpoint);
  }

  async getEvent(id: string) {
    return this.request(`/calendar/events/${id}`);
  }

  async getEventsByDateRange(start: string, end: string) {
    return this.request(`/calendar/events/range/${start}/${end}`);
  }

  async getEventsByType(type: string) {
    return this.request(`/calendar/events/type/${type}`);
  }

  async createEvent(data: any) {
    return this.request('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: string, data: any) {
    return this.request(`/calendar/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string) {
    return this.request(`/calendar/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Enhanced Analytics API methods
  async getRecentActivities(limit?: number) {
    const endpoint = limit ? `/analytics/activities?limit=${limit}` : '/analytics/activities';
    return this.request(endpoint);
  }

  async getDeviceStats() {
    return this.request('/analytics/devices');
  }

  async getGeographicData() {
    return this.request('/analytics/geographic');
  }

  async getNotifications(userId?: string, isRead?: boolean) {
    let endpoint = '/analytics/notifications';
    const params = new URLSearchParams();
    
    if (userId) params.append('userId', userId);
    if (isRead !== undefined) params.append('isRead', isRead.toString());
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return this.request(endpoint);
  }

  async getQuickActions() {
    return this.request('/analytics/quick-actions');
  }

  async getDashboardSummary() {
    return this.request('/analytics/dashboard-summary');
  }

  async createActivity(data: any) {
    return this.request('/analytics/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createNotification(data: any) {
    return this.request('/analytics/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/analytics/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;