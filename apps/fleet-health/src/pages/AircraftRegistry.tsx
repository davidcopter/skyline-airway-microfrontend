import React, { useState, useMemo } from "react";
import { mockAircraft, AirworthinessStatus } from "@skyline/shared";
import {
  Search,
  Filter,
  Download,
  Plane,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type SortConfig = {
  key: keyof (typeof mockAircraft)[0];
  direction: "asc" | "desc";
} | null;

const AircraftRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSort = (key: keyof (typeof mockAircraft)[0]) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAircraft = useMemo(() => {
    const items = [...mockAircraft].filter(
      (a) =>
        a.tailNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.model.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig !== null) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  }, [searchTerm, sortConfig]);

  const SortIcon = ({
    columnKey,
  }: {
    columnKey: keyof (typeof mockAircraft)[0];
  }) => {
    if (sortConfig?.key !== columnKey)
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Aircraft Registry
          </h2>
          <p className="text-sm text-gray-500">
            Manage and view all aircraft in the Skyline fleet.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <label htmlFor="aircraft-search" className="sr-only">
              Search aircraft by tail number or model
            </label>
            <input
              id="aircraft-search"
              type="text"
              placeholder="Search by tail number or model..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <Table>
            <caption className="sr-only">Fleet Aircraft Registry Table</caption>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead
                  className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("tailNumber")}
                >
                  <div className="flex items-center">
                    Tail Number <SortIcon columnKey="tailNumber" />
                  </div>
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("model")}
                >
                  <div className="flex items-center">
                    Model <SortIcon columnKey="model" />
                  </div>
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("totalFlightHours")}
                >
                  <div className="flex items-center">
                    Total Hours <SortIcon columnKey="totalFlightHours" />
                  </div>
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("totalCycles")}
                >
                  <div className="flex items-center">
                    Total Cycles <SortIcon columnKey="totalCycles" />
                  </div>
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("airworthinessStatus")}
                >
                  <div className="flex items-center">
                    Status <SortIcon columnKey="airworthinessStatus" />
                  </div>
                </TableHead>
                <TableHead
                  className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("nextInspection")}
                >
                  <div className="flex items-center">
                    Next Inspection <SortIcon columnKey="nextInspection" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAircraft.map((aircraft) => (
                <TableRow
                  key={aircraft.tailNumber}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded text-skyline-blue">
                        <Plane className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-gray-900">
                        {aircraft.tailNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {aircraft.model}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {aircraft.totalFlightHours.toLocaleString()}h
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {aircraft.totalCycles.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        aircraft.airworthinessStatus === "airworthy"
                          ? "bg-green-100 text-green-700"
                          : aircraft.airworthinessStatus === "restricted"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {aircraft.airworthinessStatus}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {aircraft.nextInspection}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden divide-y divide-gray-100">
          {sortedAircraft.map((aircraft) => (
            <Card
              key={aircraft.tailNumber}
              className="border-0 shadow-none rounded-none"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded text-skyline-blue">
                      <Plane className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {aircraft.tailNumber}
                      </h3>
                      <p className="text-sm text-gray-500">{aircraft.model}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      aircraft.airworthinessStatus === "airworthy"
                        ? "bg-green-100 text-green-700"
                        : aircraft.airworthinessStatus === "restricted"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {aircraft.airworthinessStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">
                      Flight Hours
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {aircraft.totalFlightHours.toLocaleString()}h
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">
                      Total Cycles
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {aircraft.totalCycles.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">
                      Next Inspection
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {aircraft.nextInspection}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftRegistry;
