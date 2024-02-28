import { useEffect, useState } from 'react';
import axios from 'axios';

const StatsPage = () => {
    const [totalGames, setTotalGames] = useState(0);
    const [gamesWon, setGamesWon] = useState(0);
    const [winningPercentage, setWinningPercentage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from your backend API
        const id = localStorage.getItem('token');
        console.log('ID:', id);
        axios.get(`/stats/${id}`)
            .then(response => {
                console.log('Stats:', response.data);
                const { totalGames, wins } = response.data;
                setTotalGames(totalGames);
                setGamesWon(wins);
                
                // Calculate winning percentage
                if (totalGames > 0) {
                    const percentage = (gamesWon / totalGames) * 100;
                    setWinningPercentage(percentage.toFixed(2)); // Round to 2 decimal places
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            {loading ? (
                <div className="text-center">
                    <p className="text-lg font-semibold mb-4">Loading...</p>
                    <div className="spinner-border"></div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">Statistics</h1>
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="text-xl font-semibold">Total Games Played</p>
                            <p className="text-3xl font-bold">{totalGames}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Games Won</p>
                            <p className="text-3xl font-bold">{gamesWon}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Winning Percentage</p>
                            <p className="text-3xl font-bold">{winningPercentage}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatsPage;
