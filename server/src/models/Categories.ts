import mongoose, { Model, Schema, Document } from 'mongoose';

const categoriesSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  mainCategoryId: { type: String, default: '' },
  active: { type: Boolean, required: true },
});

// Define a TypeScript interface for the document
interface CategoriesDocument extends Document {
  id: string,
  name: string,
  mainCategoryId: string,
  active: boolean
}

export const Categories: Model<CategoriesDocument> = mongoose.model<CategoriesDocument>('categories', categoriesSchema);
