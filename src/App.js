import { useEffect, useState } from "react";
import { SongList } from "./components/SongList";
import spotify from "./lib/spotify";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [BestSongs, setBestSongs] = useState([]);

  useEffect(() => {
    fetchBestSongs();
  }, []);

  const fetchBestSongs = async () => {
    setIsLoading(true);
    const result = await spotify.getBestSongs();
    const BestSongs = result.items.map((item) => {
      return item.track;
    });
    setBestSongs(BestSongs);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Best Songs</h2>
          <SongList isLoading={isLoading} songs={BestSongs} />
        </section>
      </main>
    </div>
  );
}
