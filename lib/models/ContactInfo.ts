import mongoose, { Document, Schema } from 'mongoose';

export interface IContactInfo extends Document {
  phone: string[];
  email: string[];
  address: string[];
  whatsapp: string[];
  mapLink?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactInfoSchema = new Schema<IContactInfo>(
  {
    phone: {
      type: [String],
      required: [true, 'At least one phone number is required'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one phone number is required'
      }
    },
    email: {
      type: [String],
      required: [true, 'At least one email is required'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0 && v.every(email => /^\S+@\S+\.\S+$/.test(email));
        },
        message: 'At least one valid email is required'
      }
    },
    address: {
      type: [String],
      required: [true, 'At least one address is required'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one address is required'
      }
    },
    whatsapp: {
      type: [String],
      default: []
    },
    mapLink: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    youtube: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const ContactInfo = mongoose.models.ContactInfo || mongoose.model<IContactInfo>('ContactInfo', contactInfoSchema);

export default ContactInfo;
