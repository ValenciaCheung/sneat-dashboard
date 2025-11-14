import mongoose, { Schema, Document } from 'mongoose';

// Contact Interface
export interface IContact extends Document {
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  time: string;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Message Interface
export interface IMessage extends Document {
  senderId: number;
  contactId: number;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  createdAt: Date;
  updatedAt: Date;
}

// Contact Schema
const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  status: { type: String, enum: ['online', 'offline', 'away'], required: true },
  lastMessage: { type: String, required: true },
  time: { type: String, required: true },
  unreadCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Message Schema
const MessageSchema: Schema = new Schema({
  senderId: { type: Number, required: true },
  contactId: { type: Number, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' }
}, {
  timestamps: true
});

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
export const Message = mongoose.model<IMessage>('Message', MessageSchema);