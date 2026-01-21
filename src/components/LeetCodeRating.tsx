import { useEffect, useState } from 'react';
import { Loader2, TrendingUp, Trophy } from 'lucide-react';

// Interface for the combined stats we want
interface LeetCodeData {
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    contestRating: number;
    attendedContestsCount: number;
}

const LeetCodeRating = () => {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching basic stats and contest stats in parallel
                const [statsRes, contestRes] = await Promise.all([
                    fetch('https://leetcode-stats-api.herokuapp.com/letsjoyn'),
                    fetch('https://alfa-leetcode-api.onrender.com/userContestRankingInfo/letsjoyn')
                ]);

                const statsJson = await statsRes.json();
                const contestJson = await contestRes.json();

                if (statsJson.status === 'success') {
                    // Combine the data
                    // Note: Alfa API structure for contest info needs checking, but usually it returns:
                    // { data: { userContestRanking: { rating: 1234, attendedContestsCount: 5, ... } } }
                    // Or sometimes flat depending on the endpoint.
                    // The endpoint /userContestRankingInfo/letsjoyn typically returns:
                    // { data: { userContestRanking: { attendedContestsCount: 0, rating: 0, ... } } }

                    const contestRating = contestJson?.data?.userContestRanking?.rating || 0;
                    const attendedContestsCount = contestJson?.data?.userContestRanking?.attendedContestsCount || 0;

                    setData({
                        totalSolved: statsJson.totalSolved,
                        totalQuestions: statsJson.totalQuestions || 3300,
                        easySolved: statsJson.easySolved,
                        mediumSolved: statsJson.mediumSolved,
                        hardSolved: statsJson.hardSolved,
                        ranking: statsJson.ranking,
                        contestRating: Math.round(contestRating), // Ratings are often floats
                        attendedContestsCount: attendedContestsCount
                    });
                } else {
                    setError(true);
                }
            } catch (e) {
                // If one fails, we might still show partial data, but for now error out
                console.error("LeetCode fetch error:", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-4 flex items-center justify-center"><Loader2 className="w-5 h-5 animate-spin text-zinc-500" /></div>;
    if (error || !data) return <div className="p-3 text-xs text-red-400">Failed to load stats</div>;

    const isUnrated = data.attendedContestsCount === 0 || data.contestRating === 0;

    return (
        <div className="w-64 bg-zinc-950 border border-zinc-800 p-4 rounded-lg shadow-xl relative overflow-hidden group">
            {/* Background Glow */}
            <div
                className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffa116] opacity-10 blur-3xl rounded-full pointer-events-none"
            />

            <div className="flex items-center justify-between mb-3 relative z-10">
                <h3 className="font-serif text-zinc-100 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#ffa116]" />
                    LeetCode
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#ffa116]">
                    Rank: {data.ranking?.toLocaleString() || 'N/A'}
                </span>
            </div>

            {/* Contest Rating Section */}
            <div className="flex items-end gap-2 mb-2 relative z-10">
                {isUnrated ? (
                    <span className="text-3xl font-bold leading-none text-zinc-600">Unrated</span>
                ) : (
                    <span className="text-3xl font-bold leading-none text-[#ffa116]">{data.contestRating}</span>
                )}
                <span className="text-xs text-zinc-500 font-mono mb-1">
                    {isUnrated ? "contest rating" : `rating (${data.attendedContestsCount} contests)`}
                </span>
            </div>

            {/* Rating Meter (Only show if rated) */}
            {!isUnrated && (
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-3 relative z-10">
                    <div
                        className="h-full bg-[#ffa116] transition-all duration-1000"
                        style={{
                            width: `${Math.min(((data.contestRating - 1200) / 1000) * 100, 100)}%` // Rough scale 1200-2200
                        }}
                    />
                </div>
            )}

            {/* If unrated, maybe show total solved progress bar instead? Or just a spacer */}
            {isUnrated && (
                <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-3 relative z-10 opacity-50">
                    <div className="h-full bg-zinc-700 w-0" />
                </div>
            )}

            <div className="grid grid-cols-3 gap-1 mb-3 relative z-10">
                <div className="text-center bg-zinc-900/50 rounded py-1">
                    <div className="text-[10px] text-zinc-500">Easy</div>
                    <div className="text-xs font-bold text-[#00b8a3]">{data.easySolved}</div>
                </div>
                <div className="text-center bg-zinc-900/50 rounded py-1">
                    <div className="text-[10px] text-zinc-500">Med</div>
                    <div className="text-xs font-bold text-[#ffc01e]">{data.mediumSolved}</div>
                </div>
                <div className="text-center bg-zinc-900/50 rounded py-1">
                    <div className="text-[10px] text-zinc-500">Hard</div>
                    <div className="text-xs font-bold text-[#ff375f]">{data.hardSolved}</div>
                </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 relative z-10 mb-3 justify-center">
                <TrendingUp className="w-3 h-3" />
                <span>{data.totalSolved} Problems Solved</span>
            </div>

            <a
                href="https://leetcode.com/u/letsjoyn/"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-1.5 text-center text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 hover:text-white transition-colors relative z-10"
            >
                View Profile
            </a>
        </div>
    );
};

export default LeetCodeRating;
