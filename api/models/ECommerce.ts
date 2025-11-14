import mongoose, { Schema, Document } from 'mongoose';

// eCommerce Statistics Interface
export interface IECommerceStats extends Document {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product Interface
export interface IProduct extends Document {
  name: string;
  category: string;
  price: string;
  sold: number;
  revenue: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Interface
export interface IOrder extends Document {
  orderId: string;
  customer: string;
  product: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Pending';
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

// eCommerce Statistics Schema
const ECommerceStatsSchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  trend: { type: String, enum: ['up', 'down'], required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true }
}, {
  timestamps: true
});

// Product Schema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  sold: { type: Number, required: true },
  revenue: { type: String, required: true },
  image: { type: String, required: true }
}, {
  timestamps: true
});

// Order Schema
const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  product: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'Processing', 'Shipped', 'Pending'], required: true },
  date: { type: String, required: true }
}, {
  timestamps: true
});

export const ECommerceStats = mongoose.model<IECommerceStats>('ECommerceStats', ECommerceStatsSchema);
export const Product = mongoose.model<IProduct>('Product', ProductSchema);
export const Order = mongoose.model<IOrder>('Order', OrderSchema);