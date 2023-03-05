import React, { useState } from "react";

import Header from './Header';
import Player from "./Player";
import AddPlayerForm from "./AddPlayerForm"

const App = () => {
  const [players, setPlayers] = useState([]);

  const [nextPlayerId, setNextPlayerId] = useState(5);

  const handleRemovePlayer = (id) => {
    setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== id));
  }

  const handleScoreChange = (id, delta) => {
    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.id === id) {
        return {
          name: player.name,
          score: player.score + delta,
          id: player.id
        }
      }
      return player;
    }));
  }

  const handleAddPlayer = (name) => {
    setPlayers( prevPlayers => [
      ...prevPlayers,
      {
        name,
        score: 0,
        id: nextPlayerId
      }
    ]);
    setNextPlayerId(id=>id+1);
  };

  return (
    <div className="scoreboard">
      <Header
        title="Scoreboard"
        players={players}
      />

      {/* Players list */}
      {players.map(player =>
        <Player
          name={player.name}
          score={player.score}
          id={player.id}
          key={player.id.toString()}
          removePlayer={handleRemovePlayer}
          changeScore={handleScoreChange}
        />
      )}
      <AddPlayerForm
        addPlayer={handleAddPlayer}
      />
    </div>
  );

}

export default App;
