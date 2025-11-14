import React from "react";
import {
  TrophyIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartBarIcon,
  BanknotesIcon,
  DocumentChartBarIcon,
  ClockIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  EyeIcon,
  CalendarIcon,
  UserGroupIcon,
  CreditCardIcon,
  WalletIcon,
  BuildingLibraryIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  useAnalyticsStats,
  useChartData,
  useProductData,
  useRecentActivities,
  useDeviceStats,
  useGeographicData,
} from "../hooks/useApi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Congratulations Module Component
const CongratulationsModule: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-lg shadow-lg p-6 text-white relative overflow-hidden h-full xl:h-[200px] box-border flex items-center">
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Congratulations! 🎉</h3>
            <p className="text-sm opacity-90 mb-4">
              You have done 72% more sales today. Check your new badge in your
              profile.
            </p>
            <button className="bg-white dark:bg-gray-100 text-purple-600 dark:text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors">
              View Badges
            </button>
          </div>
          <div className="ml-4">
            <TrophyIcon className="h-16 w-16 opacity-20" />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white dark:bg-gray-200 opacity-10 rounded-full -mr-16 -mt-16"></div>
    </div>
  );
};

// Order Module Component
const OrderModule: React.FC<{ darkMode?: boolean }> = ({
  darkMode = false,
}) => {
  const orderRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const logHeight = () => {
      if (orderRef.current) {
        const h = orderRef.current.offsetHeight;
        console.log("[Analytics] Total Orders height:", h);
      }
    };
    logHeight();
    window.addEventListener("resize", logHeight);
    return () => window.removeEventListener("resize", logHeight);
  }, []);
  const orderData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [220, 245, 260, 270, 275, 276],
        borderColor: darkMode ? "rgb(96, 165, 250)" : "rgb(59, 130, 246)",
        backgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.1)"
          : "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        titleColor: darkMode ? "#f9fafb" : "#111827",
        bodyColor: darkMode ? "#f9fafb" : "#111827",
        borderColor: darkMode ? "#6b7280" : "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          color: darkMode ? "#374151" : "#f3f4f6",
        },
      },
      y: {
        display: false,
        grid: {
          color: darkMode ? "#374151" : "#f3f4f6",
        },
      },
    },
  };

  return (
  <div ref={orderRef} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300 h-full xl:h-[200px] box-border flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            276k
          </p>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <ShoppingCartIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div className="h-20">
        <Line data={orderData} options={chartOptions} />
      </div>
    </div>
  );
};

// Sales Module Component
const SalesModule: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300 h-full xl:h-[200px] box-border flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Sales
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            $4,679
          </p>
          <div className="flex items-center mt-2">
            <ArrowUpIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400 ml-1">
              +28.14%
            </span>
            
          </div>
        </div>
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <CurrencyDollarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
      </div>
    </div>
  );
};

// Total Revenue Module Component
const TotalRevenueModule: React.FC<{ darkMode?: boolean }> = ({
  darkMode = false,
}) => {
  const [year, setYear] = React.useState<2024 | 2025>(2025);

  const revenueBarData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "2024",
        data: [14, 6, 12, 28, 16, 10, 8],
        backgroundColor: darkMode ? "rgba(99,102,241,0.8)" : "rgba(79,70,229,0.8)",
        borderRadius: 6,
        barThickness: 18,
        categoryPercentage: 0.7,
        barPercentage: 0.85,
      },
      {
        label: "2025",
        data: [12, -14, -8, -18, -6, -10, -12],
        backgroundColor: darkMode ? "rgba(20,184,166,0.8)" : "rgba(6,182,212,0.8)",
        borderRadius: 6,
        barThickness: 18,
        categoryPercentage: 0.7,
        barPercentage: 0.85,
      },
    ],
  };

  const revenueBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: darkMode ? "#e5e7eb" : "#374151",
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        titleColor: darkMode ? "#f9fafb" : "#111827",
        bodyColor: darkMode ? "#f9fafb" : "#111827",
        borderColor: darkMode ? "#6b7280" : "#e5e7eb",
        borderWidth: 1,
      },
    },
    layout: {
      padding: { top: 10, bottom: 10, left: 0, right: 0 },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#9ca3af" : "#6b7280", maxTicksLimit: 4, autoSkip: true, maxRotation: 0, minRotation: 0 },
        grid: { display: false },
      },
      y: {
        ticks: { color: darkMode ? "#9ca3af" : "#6b7280", maxTicksLimit: 6 },
        grid: { color: darkMode ? "#374151" : "#e5e7eb", drawBorder: false },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 300,
      easing: "easeInOutQuart",
    },
  } as const;

  const percentByYear = year === 2025 ? 78 : 62;
  const progressData = {
    datasets: [
      {
        data: [percentByYear, 100 - percentByYear],
        backgroundColor: [
          darkMode ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.8)",
          darkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.3)",
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { duration: 300, easing: "easeInOutQuart" },
  } as const;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300 h-full box-border">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-[10px]">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Revenue</h3>
          <div className="mt-[20px] mb-[20px] mx-[15px]">
            <div className="h-48">
              <Bar data={revenueBarData} options={revenueBarOptions} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value) as 2024 | 2025)}
              className="text-sm px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-8 appearance-none"
            >
              <option value={2025}>2025</option>
              <option value={2024}>2024</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="mt-[30px] flex flex-col items-center space-y-[15px]">
            <div className="relative w-24 h-24">
              <Doughnut data={progressData} options={donutOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{percentByYear}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Growth</div>
                </div>
              </div>
            </div>
            <div className="w-full px-[15px]">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">62% Company Growth</p>
              </div>
              <div className="grid grid-cols-1 gap-[15px]">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded">
                    <CurrencyDollarIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">2025 | $32.5k</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <WalletIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">2024 | $41.2k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payments Module Component
const PaymentsModule: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300 h-full box-border flex flex-col text-base leading-normal">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Payments
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            $2,468
          </p>
          <div className="flex items-center mt-2">
            <ArrowDownIcon className="h-4 w-4 text-red-500 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400 ml-1">
              -14.68%
            </span>
            
          </div>
        </div>
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <CreditCardIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
      </div>
    </div>
  );
};

// Revenue Module Component
const RevenueModule: React.FC<{ darkMode?: boolean }> = ({
  darkMode = false,
}) => {
  const revenueBarData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [400, 420, 380, 450, 425, 380, 400],
        backgroundColor: darkMode
          ? "rgba(167, 139, 250, 0.8)"
          : "rgba(139, 92, 246, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: darkMode ? "#374151" : "#ffffff",
        titleColor: darkMode ? "#f9fafb" : "#111827",
        bodyColor: darkMode ? "#f9fafb" : "#111827",
        borderColor: darkMode ? "#6b7280" : "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          color: darkMode ? "#374151" : "#f3f4f6",
        },
      },
      y: {
        display: false,
        grid: {
          color: darkMode ? "#374151" : "#f3f4f6",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300 h-full box-border flex flex-col text-base leading-normal">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Revenue
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            425k
          </p>
        </div>
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <BanknotesIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <div className="h-20">
        <Bar data={revenueBarData} options={chartOptions} />
      </div>
    </div>
  );
};

// Profit Report Module Component
const ProfitReportModule: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300 h-full box-border flex flex-col text-base leading-normal">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Profit Report
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            $84,686K
          </p>
          <div className="flex items-center mt-2">
            <ArrowUpIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400 ml-1">
              +68.2%
            </span>
            
          </div>
        </div>
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <DocumentChartBarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
};

// Order Statistics Module Component
const OrderStatisticsModule: React.FC<{ darkMode?: boolean }> = ({
  darkMode = false,
}) => {
  const orderStatsData = {
    labels: ["Electronic", "Fashion", "Decor", "Sports"],
    datasets: [
      {
        data: [82.5, 23.8, 8.49, 0.99],
        backgroundColor: darkMode
          ? [
              "rgba(96, 165, 250, 0.8)",
              "rgba(52, 211, 153, 0.8)",
              "rgba(251, 191, 36, 0.8)",
              "rgba(248, 113, 113, 0.8)",
            ]
          : [
              "rgba(59, 130, 246, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(245, 158, 11, 0.8)",
              "rgba(239, 68, 68, 0.8)",
            ],
        borderWidth: 0,
      },
    ],
  };

  const categories = [
    {
      name: "Electronic",
      items: "Mobile, Earbuds, TV",
      value: "82.5k",
      color: "bg-blue-500",
    },
    {
      name: "Fashion",
      items: "Tshirt, Jeans, Shoes",
      value: "23.8k",
      color: "bg-green-500",
    },
    {
      name: "Decor",
      items: "Fine Art, Dining",
      value: "849",
      color: "bg-yellow-500",
    },
    {
      name: "Sports",
      items: "Football, Cricket Kit",
      value: "99",
      color: "bg-red-500",
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const orderProgressData = {
    datasets: [
      {
        data: [38, 62],
        backgroundColor: [
          darkMode ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.8)",
          darkMode ? "rgba(75, 85, 99, 0.3)" : "rgba(229, 231, 235, 0.3)",
        ],
        borderWidth: 0,
        cutout: "85%",
      },
    ],
  };

  const progressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Electronic":
        return ComputerDesktopIcon;
      case "Fashion":
        return CreditCardIcon;
      case "Decor":
        return BuildingLibraryIcon;
      case "Sports":
        return DocumentChartBarIcon;
      default:
        return DevicePhoneMobileIcon;
    }
  };

  const getBgClass = (name: string, dark: boolean) => {
    switch (name) {
      case "Electronic":
        return dark ? "bg-blue-900/30" : "bg-blue-100";
      case "Fashion":
        return dark ? "bg-rose-900/30" : "bg-rose-100";
      case "Decor":
        return dark ? "bg-amber-900/30" : "bg-amber-100";
      case "Sports":
        return dark ? "bg-emerald-900/30" : "bg-emerald-100";
      default:
        return dark ? "bg-gray-900/30" : "bg-gray-100";
    }
  };

  const getIconColor = (name: string, dark: boolean) => {
    switch (name) {
      case "Electronic":
        return dark ? "text-blue-400" : "text-blue-600";
      case "Fashion":
        return dark ? "text-rose-400" : "text-rose-600";
      case "Decor":
        return dark ? "text-amber-400" : "text-amber-600";
      case "Sports":
        return dark ? "text-emerald-400" : "text-emerald-600";
      default:
        return dark ? "text-gray-400" : "text-gray-600";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Order Statistics</h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">42.82k Total Sales</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">8,258</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
        </div>
        <div className="relative w-16 h-16">
          <Doughnut data={orderProgressData} options={progressOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-900 dark:text-white">38%</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">weekly</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {(() => {
                const IconComp = getIcon(category.name);
                const bg = getBgClass(category.name, darkMode);
                const color = getIconColor(category.name, darkMode);
                return (
                  <div className={`${bg} w-7 h-7 rounded-md flex items-center justify-center`}>
                    <IconComp className={`h-4 w-4 ${color}`} />
                  </div>
                );
              })()}
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{category.items}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{category.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Income/Expenses/Profit Module Component
const IncomeExpensesProfitModule: React.FC = () => {
  const [tab, setTab] = React.useState<"income" | "expenses" | "profit">("income");
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const series = {
    income: { data: [20, 28, 24, 42, 30, 34, 32], color: "rgb(59, 130, 246)", bg: "rgba(59, 130, 246, 0.08)", title: "Total Income", value: "$459.1k", percent: 42.9 },
    expenses: { data: [18, 22, 20, 38, 26, 30, 28], color: "rgb(239, 68, 68)", bg: "rgba(239, 68, 68, 0.08)", title: "Total Expenses", value: "$316.5k", percent: 27.8 },
    profit: { data: [10, 16, 14, 28, 18, 22, 20], color: "rgb(20, 184, 166)", bg: "rgba(20, 184, 166, 0.08)", title: "Total Profit", value: "$147.9k", percent: 35.1 },
  } as const;

  const active = series[tab];
  const lineData = {
    labels,
    datasets: [
      {
        label: tab,
        data: active.data,
        borderColor: active.color,
        backgroundColor: active.bg,
        tension: 0.4,
        fill: false,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(156,163,175,0.7)", borderDash: [4, 4] },
      },
      y: {
        ticks: { display: false },
        grid: { color: "rgba(156,163,175,0.7)", borderDash: [4, 4] },
      },
    },
  };

  const donutData = {
    datasets: [
      { data: [65, 35], backgroundColor: [active.color, "rgba(156,163,175,0.2)"], borderWidth: 0, cutout: "80%" },
    ],
  };
  const donutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <div className="flex space-x-3 mb-4">
        <button onClick={() => setTab("income")} className={`px-3 py-1 rounded-lg text-sm ${tab === "income" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>INCOME</button>
        <button onClick={() => setTab("expenses")} className={`px-3 py-1 rounded-lg text-sm ${tab === "expenses" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>EXPENSES</button>
        <button onClick={() => setTab("profit")} className={`px-3 py-1 rounded-lg text-sm ${tab === "profit" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>PROFIT</button>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          <CurrencyDollarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{active.title}</p>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{active.value}</p>
            <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-emerald-500">{active.percent}%</span>
          </div>
        </div>
      </div>

      <div className="h-40 mb-4">
        <Line data={lineData} options={lineOptions} />
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative w-16 h-16">
          <Doughnut data={donutData} options={donutOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-900 dark:text-white">6.5k</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{tab === "income" ? "Income this week" : tab === "expenses" ? "Expenses this week" : "Profit this week"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">$39k less than last week</p>
        </div>
      </div>
    </div>
  );
};

// Transactions Module Component
const TransactionsModule: React.FC = () => {
  const transactions = [
    { name: "Paypal", amount: "+$82.6", type: "credit", icon: "💳" },
    { name: "Wallet", amount: "+$270.69", type: "credit", icon: "👛" },
    { name: "Transfer", amount: "+$637.91", type: "credit", icon: "🔄" },
    { name: "Credit Card", amount: "-$838.71", type: "debit", icon: "💳" },
    { name: "Bank Transfer", amount: "+$203.33", type: "credit", icon: "🏦" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Transactions
      </h3>
      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm">
                {transaction.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {transaction.name}
              </span>
            </div>
            <span
              className={`text-sm font-medium ${
                transaction.type === "credit"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity Timeline Module Component
const ActivityTimelineModule: React.FC = () => {
  const activities = [
    {
      time: "12 min ago",
      action: "Invoice #00745 from",
      company: "Pixinvent for $350.",
      type: "invoice",
    },
    {
      time: "25 min ago",
      action: "New order #1832412",
      company: "Received from John Doe.",
      type: "order",
    },
    {
      time: "1 hour ago",
      action: "Payment of $650",
      company: "received from Laura Smith.",
      type: "payment",
    },
    {
      time: "2 hours ago",
      action: "New customer",
      company: "registered (Amanda Clarke).",
      type: "customer",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Activity Timeline
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "invoice"
                    ? "bg-blue-500"
                    : activity.type === "order"
                    ? "bg-green-500"
                    : activity.type === "payment"
                    ? "bg-yellow-500"
                    : "bg-purple-500"
                }`}
              ></div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activity.time}
              </p>
              <p className="text-sm text-gray-900 dark:text-white">
                {activity.action}{" "}
                <span className="font-medium">{activity.company}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Browser/OS/Country Module Component
const BrowserOSCountryModule: React.FC = () => {
  const browserData = [
    { name: "Chrome", percentage: 64.91, users: "8,921", color: "bg-blue-500" },
    { name: "Safari", percentage: 19.03, users: "1,900", color: "bg-gray-500" },
    {
      name: "Firefox",
      percentage: 9.99,
      users: "1,200",
      color: "bg-orange-500",
    },
    { name: "Edge", percentage: 6.12, users: "800", color: "bg-green-500" },
  ];

  const osData = [
    { name: "Windows", percentage: 61.5, users: "475", color: "bg-blue-600" },
    { name: "Mac", percentage: 25.2, users: "86", color: "bg-gray-600" },
    { name: "Ubuntu", percentage: 8.4, users: "38", color: "bg-orange-600" },
    { name: "Linux", percentage: 4.9, users: "30", color: "bg-yellow-600" },
  ];

  const countryData = [
    { name: "USA", percentage: 38.6, users: "692", color: "bg-blue-500" },
    { name: "Brazil", percentage: 28.2, users: "480", color: "bg-green-500" },
    { name: "India", percentage: 13.9, users: "245", color: "bg-orange-500" },
    { name: "Australia", percentage: 12.6, users: "190", color: "bg-red-500" },
  ];

  const StatSection = ({ title, data }: { title: string; data: any[] }) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        {title}
      </h4>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.users}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const [tab, setTab] = React.useState<"browser" | "os" | "country">("browser");

  const TabButton = ({ label, value }: { label: string; value: "browser" | "os" | "country" }) => (
    <button
      role="tab"
      aria-selected={tab === value}
      onClick={() => setTab(value)}
      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
        tab === value
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
      }`}
    >
      {label}
    </button>
  );

  const current = tab === "browser" ? { title: "Browser", data: browserData } : tab === "os" ? { title: "Operating System", data: osData } : { title: "Country", data: countryData };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Browser States</h3>
        <div role="tablist" aria-label="Browser/OS/Country" className="flex space-x-3">
          <TabButton label="BROWSER" value="browser" />
          <TabButton label="OPERATING SYSTEM" value="os" />
          <TabButton label="COUNTRY" value="country" />
        </div>
      </div>
      <div className="relative">
        <div className="transition-opacity duration-300 ease-in-out opacity-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatSection title={current.title} data={current.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Analytics Component
const Analytics: React.FC = () => {
  // 从全局（Layout）读取暗色状态
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="p-6 space-y-6">
        {/* Page Header with Theme Toggle */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

        {/* 主题切换按钮已移除，统一使用 Layout 的主按钮 */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_200px_200px] xl:grid-rows-[200px_1fr] gap-6 mt-6 items-stretch">
          <div className="md:col-span-2 xl:col-start-1 xl:col-span-1">
            <CongratulationsModule />
          </div>
          <div className="xl:col-start-2 xl:col-span-1">
            <OrderModule darkMode={isDark} />
          </div>
          <div className="xl:col-start-3 xl:col-span-1">
            <SalesModule />
          </div>
          <div className="md:col-span-2 xl:col-start-1 xl:col-span-1 xl:row-span-2 h-full">
            <TotalRevenueModule darkMode={isDark} />
          </div>
          <div className="xl:col-start-2 xl:col-span-2 xl:row-span-2 h-full flex flex-col gap-6">
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="h-full">
                <PaymentsModule />
              </div>
              <div className="h-full">
                <RevenueModule darkMode={isDark} />
              </div>
            </div>
            <div className="flex-1 h-full">
              <ProfitReportModule />
            </div>
          </div>

          <div className="md:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-full">
                <OrderStatisticsModule darkMode={isDark} />
              </div>
              <div className="h-full">
                <IncomeExpensesProfitModule />
              </div>
              <div className="h-full">
                <TransactionsModule />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-full">
                <ActivityTimelineModule />
              </div>
              <div className="h-full">
                <BrowserOSCountryModule />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025, Made with ❤️ by ValenciaZhang
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                License
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                More Themes
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Analytics;
