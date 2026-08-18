import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

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

    if (loading) return <div className="p-4 flex items-center justify-center bg-zinc-900/20 border border-zinc-800 rounded-lg h-32"><Loader2 className="w-5 h-5 animate-spin text-zinc-500" /></div>;
    if (error || !data) return <div className="p-4 flex items-center justify-center bg-zinc-900/20 border border-zinc-800 rounded-lg h-32 text-xs text-red-400">Failed to load</div>;

    return (
        <div className="w-full bg-zinc-900/40 border border-zinc-800 p-4 rounded-lg flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-zinc-100 flex items-center gap-2">LeetCode</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#ffa116]">#{data.ranking?.toLocaleString()}</span>
                </div>
                <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold leading-none text-[#ffa116]">{data.totalSolved}</span>
                    <span className="text-xs text-zinc-500 font-mono mb-1">problems solved</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-zinc-900/60 border border-zinc-800/50 rounded py-1.5">
                        <div className="text-[10px] text-zinc-500 mb-0.5">Easy</div>
                        <div className="text-xs font-bold text-[#00b8a3]">{data.easySolved}</div>
                    </div>
                    <div className="text-center bg-zinc-900/60 border border-zinc-800/50 rounded py-1.5">
                        <div className="text-[10px] text-zinc-500 mb-0.5">Med</div>
                        <div className="text-xs font-bold text-[#ffc01e]">{data.mediumSolved}</div>
                    </div>
                    <div className="text-center bg-zinc-900/60 border border-zinc-800/50 rounded py-1.5">
                        <div className="text-[10px] text-zinc-500 mb-0.5">Hard</div>
                        <div className="text-xs font-bold text-[#ff375f]">{data.hardSolved}</div>
                    </div>
                </div>
            </div>
            <a href="https://leetcode.com/u/idocp/" target="_blank" rel="noreferrer"
                className="block w-full py-2 text-center text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                View Profile
            </a>
        </div>
    );
};

export default LeetCodeRating;
