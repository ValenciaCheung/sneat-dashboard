import mongoose, { Schema, Document } from 'mongoose';

// Email Interface
export interface IEmail extends Document {
  from: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  avatar: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Email Folder Interface
export interface IEmailFolder extends Document {
  name: string;
  icon: string;
  count: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Email Schema
const EmailSchema: Schema = new Schema({
  from: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  preview: { type: String, required: true },
  time: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  hasAttachment: { type: Boolean, default: false },
  avatar: { type: String, required: true },
  content: { type: String }
}, {
  timestamps: true
});

// Email Folder Schema
const EmailFolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  count: { type: Number, default: 0 },
  active: { type: Boolean, default: false }
}, {
  timestamps: true
});

export const Email = mongoose.model<IEmail>('Email', EmailSchema);
export const EmailFolder = mongoose.model<IEmailFolder>('EmailFolder', EmailFolderSchema);