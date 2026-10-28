import { useEffect, useState } from 'react';
import { Loader2, ArrowUpRight } from 'lucide-react';
import { CodeforcesBrandIcon } from './Icons';

interface CodeforcesUser {
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    handle: string;
}

const getRankColor = (rank: string) => {
    const r = rank?.toLowerCase();
    if (r?.includes('grandmaster')) return 'text-red-400 border-red-500/20 bg-red-500/10';
    if (r?.includes('master')) return 'text-orange-400 border-orange-500/20 bg-orange-500/10';
    if (r?.includes('candidate')) return 'text-violet-400 border-violet-500/20 bg-violet-500/10';
    if (r?.includes('expert')) return 'text-blue-400 border-blue-500/20 bg-blue-500/10';
    if (r?.includes('specialist')) return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10';
    if (r?.includes('pupil')) return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
    return 'text-zinc-400 border-zinc-700/30 bg-zinc-800/30';
};

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
                } else { setError(true); }
            } catch { setError(true); }
            finally { setLoading(false); }
        };
        fetchRating();
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

    const rankStyle = getRankColor(data.rank);

    return (
        <div className="w-full bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 p-4 rounded-xl flex flex-col justify-between transition-all duration-300 group">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-serif text-zinc-100 flex items-center gap-2 group-hover:text-white transition-colors">
                        <CodeforcesBrandIcon className="w-4 h-4 opacity-80" />
                        Codeforces
                    </span>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${rankStyle}`}>
                        {data.rank}
                    </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-serif font-bold tracking-tight text-white">{data.rating}</span>
                    <span className="text-xs text-zinc-500 font-mono">/ peak {data.maxRating}</span>
                </div>
            </div>
            <a 
                href={`https://codeforces.com/profile/${data.handle}`} 
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

export default CodeforcesRating;