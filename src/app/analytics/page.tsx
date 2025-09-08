"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useShopStore } from "@/store/useShopStore";

const Line = dynamic(() => import("react-chartjs-2").then((m) => m.Line), { ssr: false });
const Bar = dynamic(() => import("react-chartjs-2").then((m) => m.Bar), { ssr: false });
const Pie = dynamic(() => import("react-chartjs-2").then((m) => m.Pie), { ssr: false });
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
  const { orders, getMixedCatalog } = useShopStore();
  const mixedCatalog = getMixedCatalog();

  // Sales Per Month (Line Chart)
  const salesByMonth = useMemo(() => {
    if (orders.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Orders",
            data: [],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
          },
        ],
      };
    }

    const map = new Map<string, { orders: number, revenue: number }>();
    for (const o of orders) {
      const month = new Date(o.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      const current = map.get(month) || { orders: 0, revenue: 0 };
      map.set(month, { 
        orders: current.orders + 1, 
        revenue: current.revenue + (o.total || 0)
      });
    }
    const entries = Array.from(map.entries()).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    return {
      labels: entries.map((e) => e[0]),
      datasets: [
        {
          label: "Orders",
          data: entries.map((e) => e[1].orders),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
      ],
    };
  }, [orders]);

  // Top Categories (Pie Chart)
  const topCategories = useMemo(() => {
    if (orders.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      };
    }

    const catTotals = new Map<string, number>();
    for (const o of orders) {
      for (const it of o.items) {
        const category = it.category || 'Unknown';
        const amount = it.totalAmount || 0;
        catTotals.set(category, (catTotals.get(category) || 0) + amount);
      }
    }
    const entries = Array.from(catTotals.entries()).sort((a, b) => b[1] - a[1]);
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];
    return {
      labels: entries.map((e) => e[0]),
      datasets: [
        {
          data: entries.map((e) => e[1]),
          backgroundColor: colors.slice(0, entries.length),
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }, [orders]);

  // Revenue Growth (Bar Chart)
  const revenueGrowth = useMemo(() => {
    if (orders.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Revenue (₹)",
            data: [],
            backgroundColor: "#10b981",
            borderRadius: 4,
          },
        ],
      };
    }

    const map = new Map<string, number>();
    for (const o of orders) {
      const month = new Date(o.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      map.set(month, (map.get(month) || 0) + (o.total || 0));
    }
    const entries = Array.from(map.entries()).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    return {
      labels: entries.map((e) => e[0]),
      datasets: [
        {
          label: "Revenue (₹)",
          data: entries.map((e) => e[1]),
          backgroundColor: "#10b981",
          borderRadius: 4,
        },
      ],
    };
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.total || 0), 0) / 100;
  }, [orders]);

  const prevRevenue = useMemo(() => {
    const prevOrders = orders.filter(o => new Date(o.createdAt).getTime() < new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
    return prevOrders.reduce((sum, o) => sum + (o.total || 0), 0) / 100;
  }, [orders]);

  const revenueGrowthRate = useMemo(() => {
    if (orders.length === 0) return 0;
    
    // Calculate growth based on order trends
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });
    
    const previousMonthOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return orderDate.getMonth() === prevMonth && orderDate.getFullYear() === prevYear;
    });
    
    const currentRevenue = currentMonthOrders.reduce((sum, o) => sum + (o.total || 0), 0) / 100;
    const previousRevenue = previousMonthOrders.reduce((sum, o) => sum + (o.total || 0), 0) / 100;
    
    if (previousRevenue === 0) {
      return currentRevenue > 0 ? 100 : 0; // 100% growth if we had no previous revenue but have current revenue
    }
    
    return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  }, [orders]);

  const avgOrderValue = useMemo(() => {
    if (orders.length === 0) return 0;
    return totalRevenue / orders.length;
  }, [totalRevenue, orders.length]);

  // Revenue Per Month (Bar Chart)
  const revenueByMonth = useMemo(() => {
    if (orders.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Revenue (₹)",
            data: [],
            backgroundColor: "#10b981",
            borderRadius: 4,
          },
        ],
      };
    }

    const map = new Map<string, number>();
    for (const o of orders) {
      const month = new Date(o.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      const current = map.get(month) || 0;
      map.set(month, current + (o.total || 0) / 100);
    }

    const entries = Array.from(map.entries()).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    return {
      labels: entries.map((e) => e[0]),
      datasets: [
        {
          label: "Revenue (₹)",
          data: entries.map((e) => e[1]),
          backgroundColor: "#10b981",
          borderRadius: 4,
        },
      ],
    };
  }, [orders]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold dot-matrix mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Track your sales performance and insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="text-2xl font-bold">
            ₹{totalRevenue.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm font-bold">
            Total Revenue
          </div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold">
            {orders.length}
          </div>
          <div className="text-gray-600 text-sm font-bold">
            Total Orders
          </div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold">
            ₹{avgOrderValue.toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm font-bold">
            Avg Order Value
          </div>
        </div>
        <div className="card p-6">
          <div className="text-2xl font-bold">
            {revenueGrowthRate >= 0 ? '+' : ''}{revenueGrowthRate.toFixed(1)}%
          </div>
          <div className="text-gray-600 text-sm font-bold">
            Revenue Growth
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">
            Sales Per Month
          </h3>
          <div className="h-64">
            {orders.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 font-bold">
                No data available
              </div>
            ) : (
              <Line data={salesByMonth} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: Math.max(10, Math.ceil(Math.max(...salesByMonth.datasets[0].data as number[]) * 1.2))
                  }
                }
              }} />
            )}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">
            Revenue Per Month
          </h3>
          <div className="h-64">
            {orders.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 font-bold">
                No data available
              </div>
            ) : (
              <Bar data={revenueByMonth} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: Math.max(100000, Math.ceil(Math.max(...revenueByMonth.datasets[0].data as number[]) * 1.3))
                  }
                }
              }} />
            )}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">
          Top Categories
        </h3>
        <div className="h-64 flex justify-center">
          <div className="w-64">
            {orders.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 font-bold">
                No data available
              </div>
            ) : (
              <Pie data={topCategories} options={{ responsive: true, maintainAspectRatio: false }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


