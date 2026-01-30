import React, { useState } from 'react';
import { mockAircraft } from '@skyline/shared';
import { Search, Filter, Download, Plane } from 'lucide-react';

const AircraftRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAircraft = mockAircraft.filter(a => 
    a.tailNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aircraft Registry</h2>
          <p className="text-sm text-gray-500">Manage and view all aircraft in the Skyline fleet.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tail number or model..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Tail Number</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Hours</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Cycles</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Next Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAircraft.map((aircraft) => (
                <tr key={aircraft.tailNumber} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded text-skyline-blue">
                        <Plane className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-gray-900">{aircraft.tailNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{aircraft.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{aircraft.totalFlightHours.toLocaleString()}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{aircraft.totalCycles.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      aircraft.airworthinessStatus === 'airworthy' ? 'bg-green-100 text-green-700' :
                      aircraft.airworthinessStatus === 'restricted' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {aircraft.airworthinessStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{aircraft.nextInspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AircraftRegistry;
