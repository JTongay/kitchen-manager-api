import * as mongoose from 'mongoose';

export interface IInventory extends mongoose.Document {
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export const InventorySchema: mongoose.Schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() }
});

export const Inventory: mongoose.Model<IInventory> = mongoose.model('Inventory', InventorySchema);
