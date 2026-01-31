import React from "react";
import { Link } from "react-router-dom";
import { mockAircraft, mockDefects, mockWorkOrders } from "@skyline/shared";
import {
  Plane,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  PlusCircle,
  LayoutGrid,
  Activity,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const Dashboard: React.FC = () => {
  const totalAircraft = mockAircraft.length;
  const airworthyAircraft = mockAircraft.filter(
    (a) => a.airworthinessStatus === "airworthy",
  ).length;
  const pendingDefects = mockDefects.filter(
    (d) => d.status !== "closed",
  ).length;
  const activeWorkOrders = mockWorkOrders.filter(
    (w) => w.status !== "completed",
  ).length;

  const stats = [
    {
      label: "Total Fleet",
      value: totalAircraft,
      icon: Plane,
      color: "bg-blue-50 text-blue-600",
      description: "Active aircraft in registry",
    },
    {
      label: "Airworthiness",
      value: `${Math.round((airworthyAircraft / totalAircraft) * 100)}%`,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
      description: `${airworthyAircraft} of ${totalAircraft} ready for flight`,
    },
    {
      label: "Pending Defects",
      value: pendingDefects,
      icon: AlertTriangle,
      color: "bg-amber-50 text-amber-600",
      description: "Snags requiring engineering attention",
    },
    {
      label: "Active Work Orders",
      value: activeWorkOrders,
      icon: ClipboardList,
      color: "bg-indigo-50 text-indigo-600",
      description: "Job cards currently in progress",
    },
  ];

  const quickActions = [
    {
      label: "Report New Snag",
      path: "/reporting",
      icon: PlusCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "View Fleet Status",
      path: "/fleet",
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Manage Work Orders",
      path: "/defects",
      icon: LayoutGrid,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Overview</h1>
          <p className="text-gray-500 mt-1">
            Real-time status of Skyline Airlines maintenance operations.
          </p>
        </div>
        <div className="flex gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.path}>
              <Button variant="outline" className="flex items-center gap-2">
                <action.icon className={`h-4 w-4 ${action.color}`} />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {stat.label}
                </div>
                <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Plane className="h-5 w-5 text-skyline-blue" />
              Aircraft Status Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAircraft.map((aircraft) => (
                <div
                  key={aircraft.tailNumber}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-gray-900 w-16">
                      {aircraft.tailNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {aircraft.model}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      aircraft.airworthinessStatus === "airworthy"
                        ? "bg-green-100 text-green-700"
                        : aircraft.airworthinessStatus === "restricted"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {aircraft.airworthinessStatus}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-skyline-orange" />
              Recent Critical Defects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDefects
                .filter((d) => d.severity === "aog")
                .map((defect) => (
                  <div
                    key={defect.id}
                    className="p-4 rounded-lg border-l-4 border-skyline-red bg-red-50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-red-900">
                        {defect.tailNumber} - AOG
                      </span>
                      <span className="text-xs text-red-600 font-medium">
                        {defect.reportedDate}
                      </span>
                    </div>
                    <p className="text-sm text-red-800 line-clamp-2">
                      {defect.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          defect.status === "in-progress"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {defect.status}
                      </span>
                    </div>
                  </div>
                ))}
              {mockDefects.filter((d) => d.severity === "aog").length === 0 && (
                <div className="text-center py-8 text-gray-400 italic">
                  No critical AOG defects reported.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
