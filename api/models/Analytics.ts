import mongoose, { Schema, Document } from "mongoose";

// Analytics Statistics Interface
export interface IAnalyticsStats extends Document {
  name: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Chart Data Interface
export interface IChartData extends Document {
  type: "line" | "bar" | "doughnut" | "area" | "funnel";
  title: string;
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
    borderWidth?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Product Data Interface
export interface IProductData extends Document {
  name: string;
  category: string;
  sales: number;
  revenue: number;
  status: "In Stock" | "Out of Stock" | "Low Stock";
  createdAt: Date;
  updatedAt: Date;
}

// Analytics Statistics Schema
const AnalyticsStatsSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    change: { type: String, required: true },
    changeType: {
      type: String,
      enum: ["increase", "decrease"],
      required: true,
    },
    icon: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Chart Data Schema
const ChartDataSchema: Schema = new Schema(
  {
    type: { type: String, enum: ["line", "bar", "doughnut"], required: true },
    title: { type: String, required: true },
    labels: [{ type: String }],
    datasets: [
      {
        label: { type: String },
        data: [{ type: Number }],
        backgroundColor: { type: Schema.Types.Mixed },
        borderColor: { type: String },
        tension: { type: Number },
        borderWidth: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Product Data Schema
const ProductDataSchema: Schema = new Schema(
  {
    product: { type: String, required: true },
    category: { type: String, required: true },
    sales: { type: Number, required: true },
    revenue: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], required: true },
  },
  {
    timestamps: true,
  }
);

// New interfaces for enhanced Analytics

// Recent Activities Interface
export interface IRecentActivity extends Document {
  type: "order" | "user" | "system" | "payment";
  title: string;
  description: string;
  timestamp: Date;
  status: "success" | "warning" | "error" | "info";
  userId?: string;
  metadata?: any;
  createdAt: Date;
}

// Geographic Data Interface
export interface IGeographicData extends Document {
  country: string;
  countryCode: string;
  users: number;
  orders: number;
  revenue: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Device Statistics Interface
export interface IDeviceStats extends Document {
  deviceType: "desktop" | "mobile" | "tablet";
  browserName: string;
  osName: string;
  users: number;
  sessions: number;
  bounceRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Notifications Interface
export interface INotification extends Document {
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  priority: "low" | "medium" | "high" | "urgent";
  isRead: boolean;
  userId?: string;
  actionUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Quick Actions Interface
export interface IQuickAction extends Document {
  name: string;
  description: string;
  icon: string;
  actionType: "export" | "create" | "settings" | "report";
  url: string;
  isEnabled: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Recent Activities Schema
const RecentActivitySchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ["order", "user", "system", "payment"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, required: true },
    status: {
      type: String,
      enum: ["success", "warning", "error", "info"],
      required: true,
    },
    userId: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

// Geographic Data Schema
const GeographicDataSchema: Schema = new Schema(
  {
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    users: { type: Number, required: true },
    orders: { type: Number, required: true },
    revenue: { type: Number, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Device Statistics Schema
const DeviceStatsSchema: Schema = new Schema(
  {
    deviceType: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      required: true,
    },
    browserName: { type: String, required: true },
    osName: { type: String, required: true },
    users: { type: Number, required: true },
    sessions: { type: Number, required: true },
    bounceRate: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Notifications Schema
const NotificationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "warning", "error", "success"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      required: true,
    },
    isRead: { type: Boolean, default: false },
    userId: { type: String },
    actionUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Quick Actions Schema
const QuickActionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    actionType: {
      type: String,
      enum: ["export", "create", "settings", "report"],
      required: true,
    },
    url: { type: String, required: true },
    isEnabled: { type: Boolean, default: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const AnalyticsStats = mongoose.model<IAnalyticsStats>(
  "AnalyticsStats",
  AnalyticsStatsSchema
);
export const ChartData = mongoose.model<IChartData>(
  "ChartData",
  ChartDataSchema
);
export const ProductData = mongoose.model<IProductData>(
  "ProductData",
  ProductDataSchema
);
export const RecentActivity = mongoose.model<IRecentActivity>(
  "RecentActivity",
  RecentActivitySchema
);
export const GeographicData = mongoose.model<IGeographicData>(
  "GeographicData",
  GeographicDataSchema
);
export const DeviceStats = mongoose.model<IDeviceStats>(
  "DeviceStats",
  DeviceStatsSchema
);
export const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
export const QuickAction = mongoose.model<IQuickAction>(
  "QuickAction",
  QuickActionSchema
);
