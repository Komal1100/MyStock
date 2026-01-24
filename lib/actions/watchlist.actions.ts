import {string} from "zod";
import connectDb from "@/database/mongoose";
import {WatchList} from "@/database/models/watchlist.model";

export async function getWatchlistSymbolsByEmail(email: string):Promise<string[]> {
    if(!email) return [];
    try{
        const mongoose = await connectDb();
        const db = mongoose.connection.db;
        if(!db) throw new Error("Mongoose connection failed");
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];

        const items = await WatchList.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol));

    }catch(e){
        console.error('getWatchlistSymbolsByEmail error:', e);
        return [];
    }
}