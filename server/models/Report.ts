import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  userId: mongoose.Types.ObjectId | string;
  inputData: {
    dateOfBirth?: string;
    fullName?: string;
    query?: string;
    [key: string]: any;
  };
  result: {
    lifePathNumber?: number;
    personalityNumber?: number;
    destinyNumber?: number;
    summary?: string;
    [key: string]: any;
  };
  type: 'numerology' | 'astrology' | 'tarot' | 'custom';
  createdAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    inputData: {
      type: Object,
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      enum: ['numerology', 'astrology', 'tarot', 'custom'],
      default: 'numerology',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.models.Report || mongoose.model<IReport>('Report', reportSchema);
