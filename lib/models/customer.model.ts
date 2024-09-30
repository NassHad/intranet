import mongoose, { Schema, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema: Schema<ICustomer> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;
