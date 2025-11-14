import mongoose, { Schema, Document } from 'mongoose';

// Event Interface
export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  duration: string;
  type: 'meeting' | 'task' | 'reminder' | 'event';
  color: string;
  location?: string;
  attendees?: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Event Schema
const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, enum: ['meeting', 'task', 'reminder', 'event'], required: true },
  color: { type: String, required: true },
  location: { type: String },
  attendees: [{ type: String }],
  description: { type: String }
}, {
  timestamps: true
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);