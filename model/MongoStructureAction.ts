import mongoose from "mongoose";

const ProductionStartSchema = new mongoose.Schema({
    productCount: { type: Number, required: true },
    action: { type: String, enum: ["start"], required: true },
    timestamp: { type: Date, default: Date.now },
    userEmail: { type: String, required: true },
});

const ProductionStopSchema = new mongoose.Schema({
    action: { type: String, enum: ["stop"], required: true },
    timestamp: { type: Date, default: Date.now },
    userEmail: { type: String, required: true },
});

const ProductionStart = mongoose.models.ProductionStart || mongoose.model("ProductionStart", ProductionStartSchema);
const ProductionStop = mongoose.models.ProductionStop || mongoose.model("ProductionStop", ProductionStopSchema);

export { ProductionStart, ProductionStop };