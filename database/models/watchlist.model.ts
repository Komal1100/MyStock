import mongoose, { type Model , models} from "mongoose";

export interface WatchlistItem extends Document {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
}

const WatchListSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, index: true },
        symbol: { type: String, required: true, uppercase: true, trim: true },
        company: { type: String, required: true, trim: true },
        addedAt: { type: Date, default: Date.now },
    } ,
    {timestamps: true}
);

WatchListSchema.index({userId:1 , symbol:1} , {unique:true});

export const WatchList : Model<WatchlistItem> =
    (models?.WatchList as Model<WatchlistItem>) ||
    mongoose.model<WatchlistItem>('WatchList', WatchListSchema);