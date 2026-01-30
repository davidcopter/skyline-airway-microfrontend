type EventCallback = (data: any) => void;

class EventBus {
  private events: { [key: string]: EventCallback[] } = {};

  subscribe(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  publish(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
    
    // Also dispatch as CustomEvent for non-subscribers/other frameworks
    const customEvent = new CustomEvent(`skyline:${event}`, { detail: data });
    window.dispatchEvent(customEvent);
  }
}

export const eventBus = new EventBus();

// Event names constants
export const EVENTS = {
  DEFECT_REPORTED: 'defect:reported',
  AIRCRAFT_STATUS_CHANGED: 'aircraft:status_changed',
  WORK_ORDER_UPDATED: 'work_order:updated',
  USER_LOGGED_IN: 'user:logged_in',
  USER_LOGGED_OUT: 'user:logged_out'
};
