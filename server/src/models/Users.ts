import mongoose, { Model, Schema, Document } from 'mongoose';

const usersSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  active: { type: Boolean, required: true },
});

// Define a TypeScript interface for the document
interface UsersDocument extends Document {
  id: string,
  name: string,
  type: string,
  active: boolean
}

export const Users: Model<UsersDocument> = mongoose.model<UsersDocument>('users', usersSchema);
