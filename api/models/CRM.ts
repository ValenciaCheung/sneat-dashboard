import mongoose, { Schema, Document } from 'mongoose';

// CRM Statistics Interface
export interface ICRMStats extends Document {
  name: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sales Funnel Interface
export interface ISalesFunnel extends Document {
  stage: string;
  count: number;
  percentage: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Interface
export interface ICustomer extends Document {
  name: string;
  company: string;
  email: string;
  status: 'Active' | 'Prospect' | 'Negotiation' | 'Closed';
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

// Activity Interface
export interface IActivity extends Document {
  type: 'call' | 'email' | 'meeting';
  customer: string;
  company: string;
  action: string;
  time: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

// CRM Statistics Schema
const CRMStatsSchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true }
}, {
  timestamps: true
});

// Sales Funnel Schema
const SalesFunnelSchema: Schema = new Schema({
  stage: { type: String, required: true },
  count: { type: Number, required: true },
  percentage: { type: Number, required: true },
  color: { type: String, required: true }
}, {
  timestamps: true
});

// Customer Schema
const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Prospect', 'Negotiation', 'Closed'], required: true },
  value: { type: String, required: true }
}, {
  timestamps: true
});

// Activity Schema
const ActivitySchema: Schema = new Schema({
  type: { type: String, enum: ['call', 'email', 'meeting'], required: true },
  customer: { type: String, required: true },
  company: { type: String, required: true },
  action: { type: String, required: true },
  time: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true }
}, {
  timestamps: true
});

export const CRMStats = mongoose.model<ICRMStats>('CRMStats', CRMStatsSchema);
export const SalesFunnel = mongoose.model<ISalesFunnel>('SalesFunnel', SalesFunnelSchema);
export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);