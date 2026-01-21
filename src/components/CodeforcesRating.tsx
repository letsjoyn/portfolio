import { useEffect, useState } from 'react';
import { Loader2, TrendingUp, Trophy } from 'lucide-react';

interface CodeforcesUser {
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    handle: string;
}

const CodeforcesRating = () => {
    const [data, setData] = useState<CodeforcesUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await fetch('https://codeforces.com/api/user.info?handles=joynnayvedya');
                const json = await response.json();
                if (json.status === 'OK') {
                    setData(json.result[0]);
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRating();
    }, []);

    const getRankColor = (rank: string) => {
        const r = rank?.toLowerCase();
        if (r?.includes('grandmaster')) return 'text-red-500';
        if (r?.includes('master')) return 'text-orange-400'; // master is actually orange/yellow
        if (r?.includes('candidate')) return 'text-violet-500';
        if (r?.includes('expert')) return 'text-blue-400';
        if (r?.includes('specialist')) return 'text-cyan-400';
        if (r?.includes('pupil')) return 'text-green-400';
        return 'text-zinc-400';
    };

    const getRankColorHex = (rank: string) => {
        // rough mapping for inline styles/borders if needed
        const r = rank?.toLowerCase();
        if (r?.includes('grandmaster')) return '#ef4444';
        if (r?.includes('expert')) return '#60a5fa';
        if (r?.includes('specialist')) return '#22d3ee';
        return '#a1a1aa';
    }

    if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="w-5 h-5 animate-spin text-zinc-500" /></div>;
    if (error || !data) return <div className="p-3 text-xs text-red-400">Failed to load rating</div>;

    return (
        <div className="w-64 bg-zinc-950 border border-zinc-800 p-4 rounded-lg shadow-xl relative overflow-hidden group">
            {/* Background Glow based on rank */}
            <div
                className="absolute -top-10 -right-10 w-32 h-32 bg-current opacity-10 blur-3xl rounded-full pointer-events-none"
                style={{ color: getRankColorHex(data.rank) }}
            />

            <div className="flex items-center justify-between mb-3 relative z-10">
                <h3 className="font-serif text-zinc-100 flex items-center gap-2">
                    <Trophy className={`w-4 h-4 ${getRankColor(data.rank)}`} />
                    Codeforces
                </h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 ${getRankColor(data.rank)}`}>
                    {data.rank}
                </span>
            </div>

            <div className="flex items-end gap-2 mb-2 relative z-10">
                <span className={`text-3xl font-bold leading-none ${getRankColor(data.rank)}`}>{data.rating}</span>
                <span className="text-xs text-zinc-500 font-mono mb-1">max {data.maxRating}</span>
            </div>

            {/* Simple "meter" visual - just a progress bar towards next milestone? 
          Codeforces ratings: 1200 (Pupil), 1400 (Specialist), 1600 (Expert), 1900 (CM), 2100 (Master)
      */}
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-3 relative z-10">
                <div
                    className="h-full bg-current transition-all duration-1000"
                    style={{
                        width: `${(data.rating % 200) / 2}%`, // Simplified progress within a 200pt tier (very rough, just for visual)
                        color: getRankColorHex(data.rank),
                        backgroundColor: getRankColorHex(data.rank)
                    }}
                />
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 relative z-10 mb-3">
                <TrendingUp className="w-3 h-3" />
                <span>Official Rating</span>
            </div>

            <a
                href={`https://codeforces.com/profile/${data.handle}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-1.5 text-center text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 hover:text-white transition-colors relative z-10"
            >
                View Profile
            </a>
        </div>
    );
};

export default CodeforcesRating;
