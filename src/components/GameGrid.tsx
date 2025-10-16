import type { Game } from "../types/game";
import GameCard from "./GameCard";
import { Frown } from "lucide-react";

export default function GameGrid({ items }: { items: Game[] }) {
  if (!items?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-16">
        <div 
          className="p-8 bg-yellow-300 border-2 border-gray-700 rounded-lg text-center"
          style={{ boxShadow: '6px 6px 0px 0px rgba(43,43,43,0.3)' }}
        >
          <Frown className="w-16 h-16 mx-auto mb-4 text-gray-700" />
          <h3 className="text-xl font-bold text-black mb-2">ไม่พบเกม</h3>
          <p className="text-gray-700">ลองค้นหาด้วยคำอื่นดูนะ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map(game => <GameCard key={game.id} game={game} />)}
    </div>
  );
}