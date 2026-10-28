import { useEffect, useState } from 'react';
import { Loader2, ArrowUpRight } from 'lucide-react';
import { LeetCodeBrandIcon } from './Icons';

interface LeetCodeData {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
}

const LeetCodeRating = () => {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alfa-leetcode-api.onrender.com/idocp/profile');
                const json = await response.json();
                if (json && json.totalSolved !== undefined) {
                    setData({
                        totalSolved: json.totalSolved,
                        easySolved: json.easySolved,
                        mediumSolved: json.mediumSolved,
                        hardSolved: json.hardSolved,
                        ranking: json.ranking,
                    });
                } else {
                    throw new Error("Invalid response");
                }
            } catch {
                // Fallback to known stats if the public API is rate-limited (429) or down
                setData({
                    totalSolved: 153,
                    easySolved: 85,
                    mediumSolved: 61,
                    hardSolved: 7,
                    ranking: 1109835,
                });
            }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="p-4 flex items-center justify-center bg-zinc-900/30 border border-zinc-800/80 rounded-xl h-36">
            <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
        </div>
    );

    if (error || !data) return (
        <div className="p-4 flex items-center justify-center bg-zinc-900/30 border border-zinc-800/80 rounded-xl h-36 text-xs text-red-400 font-mono">
            Failed to load stats
        </div>
    );

    return (
        <div className="w-full bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 p-4 rounded-xl flex flex-col justify-between transition-all duration-300 group">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-serif text-zinc-100 flex items-center gap-2 group-hover:text-white transition-colors">
                        <LeetCodeBrandIcon className="w-4 h-4 opacity-80" />
                        LeetCode
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400">
                        #{data.ranking?.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-serif font-bold tracking-tight text-amber-400">{data.totalSolved}</span>
                    <span className="text-xs text-zinc-500 font-mono">problems solved</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mb-3">
                    <div className="text-center bg-zinc-950/60 border border-zinc-800/60 rounded-md py-1">
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Easy</div>
                        <div className="text-xs font-mono font-semibold text-zinc-200">{data.easySolved}</div>
                    </div>
                    <div className="text-center bg-zinc-950/60 border border-zinc-800/60 rounded-md py-1">
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Med</div>
                        <div className="text-xs font-mono font-semibold text-amber-400">{data.mediumSolved}</div>
                    </div>
                    <div className="text-center bg-zinc-950/60 border border-zinc-800/60 rounded-md py-1">
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">Hard</div>
                        <div className="text-xs font-mono font-semibold text-rose-400">{data.hardSolved}</div>
                    </div>
                </div>
            </div>
            <a 
                href="https://leetcode.com/u/idocp/" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800/80 rounded-lg hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all duration-200"
            >
                View Profile
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
        </div>
    );
};

export default LeetCodeRating;