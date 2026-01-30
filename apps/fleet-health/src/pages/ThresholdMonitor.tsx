import React from 'react';
import { mockThresholds } from '@skyline/shared';
import { Clock, AlertCircle, Calendar } from 'lucide-react';

const ThresholdMonitor: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Threshold Monitor</h2>
        <p className="text-sm text-gray-500">Track time-life components and upcoming maintenance alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockThresholds.map((alert) => (
          <div key={alert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 ${
              alert.urgency === 'critical' ? 'bg-red-600' :
              alert.urgency === 'high' ? 'bg-orange-500' :
              alert.urgency === 'medium' ? 'bg-amber-400' : 'bg-green-500'
            }`} />
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{alert.tailNumber}</h3>
                  <p className="text-sm text-gray-500">{alert.component}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  alert.urgency === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {alert.urgency}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> Usage
                  </span>
                  <span className="font-medium text-gray-900">{alert.currentHours} / {alert.thresholdHours} hrs</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      alert.urgency === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(alert.currentHours / alert.thresholdHours) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-50">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> Due Date
                  </span>
                  <span className="font-medium text-gray-900">{alert.dueDate}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-200">
                Schedule Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThresholdMonitor;
