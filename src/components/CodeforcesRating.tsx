import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CodeforcesUser {
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    handle: string;
}

const getRankColor = (rank: string) => {
    const r = rank?.toLowerCase();
    if (r?.includes('grandmaster')) return 'text-red-500';
    if (r?.includes('master')) return 'text-orange-400';
    if (r?.includes('candidate')) return 'text-violet-500';
    if (r?.includes('expert')) return 'text-blue-400';
    if (r?.includes('specialist')) return 'text-cyan-400';
    if (r?.includes('pupil')) return 'text-green-400';
    return 'text-zinc-400';
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

    if (loading) return <div className="p-4 flex items-center justify-center bg-zinc-900/20 border border-zinc-800 rounded-lg h-32"><Loader2 className="w-5 h-5 animate-spin text-zinc-500" /></div>;
    if (error || !data) return <div className="p-4 flex items-center justify-center bg-zinc-900/20 border border-zinc-800 rounded-lg h-32 text-xs text-red-400">Failed to load</div>;

    return (
        <div className="w-full bg-zinc-900/40 border border-zinc-800 p-4 rounded-lg flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-zinc-100 flex items-center gap-2">Codeforces</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 ${getRankColor(data.rank)}`}>{data.rank}</span>
                </div>
                <div className="flex items-end gap-2 mb-4">
                    <span className={`text-3xl font-bold leading-none ${getRankColor(data.rank)}`}>{data.rating}</span>
                    <span className="text-xs text-zinc-500 font-mono mb-1">max {data.maxRating}</span>
                </div>
            </div>
            <a href={`https://codeforces.com/profile/${data.handle}`} target="_blank" rel="noreferrer"
                className="block w-full py-2 text-center text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                View Profile
            </a>
        </div>
    );
};

export default CodeforcesRating;
