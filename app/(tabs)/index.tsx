import { useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { JogadorTurno } from "../../components/jogador-turno";

function ParesEmbaralhados(numPairs: number) {
  const ids = Array.from(
    { length: numPairs },
    () => Math.floor(Math.random() * 1000) + 1,
  );

  const urls = ids.map((id) => `https://picsum.photos/seed/${id}/400/400`);
  const pairs = [...urls, ...urls];

  return pairs.sort(() => Math.random() - 0.5);
}

const NUM_ROWS = 6;
const NUM_COLS = 4;

function MemoryGameGrid() {
  const { width } = useWindowDimensions();

  const horizontalMargin = 40;
  const cellMargin = 4 * 2 * NUM_COLS;
  const cellSize = (width - horizontalMargin - cellMargin) / NUM_COLS;

  const numPairs = (NUM_ROWS * NUM_COLS) / 2;

  const cards = useMemo(() => ParesEmbaralhados(numPairs), []);

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [moves, setMoves] = useState<Record<number, number>>({ 1: 0, 2: 0 });

  const [turnStartTime, setTurnStartTime] = useState(Date.now());

  const [turnTimes, setTurnTimes] = useState<
    { player: number; time: number }[]
  >([]);

  function handlePress(idx: number) {
    if (disabled || flipped.includes(idx) || matched.includes(idx)) return;

    setFlipped((prev) => [...prev, idx]);
  }

  useEffect(() => {
    if (flipped.length !== 2) return;

    setDisabled(true);

    const [first, second] = flipped;

    const endTime = Date.now();
    const duration = endTime - turnStartTime;

    setTurnTimes((prev) => [
      ...prev,
      { player: currentPlayer, time: duration },
    ]);

    setMoves((prev) => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));

    if (cards[first] === cards[second]) {
      setMatched((prev) => [...prev, first, second]);
      setFlipped([]);
      setDisabled(false);
      setTurnStartTime(Date.now());
    } else {
      const timer = setTimeout(() => {
        setFlipped([]);
        setDisabled(false);

        setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        setTurnStartTime(Date.now());
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [flipped, cards, currentPlayer, turnStartTime]);

  return (
    <View>
      <View style={styles.info}>
        <JogadorTurno
          currentPlayer={currentPlayer}
          moves={moves as JogadorTurnoProps["moves"]}
        />
      </View>

      <View style={styles.grid}>
        {Array.from({ length: NUM_ROWS }).map((_, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {Array.from({ length: NUM_COLS }).map((_, colIdx) => {
              const idx = rowIdx * NUM_COLS + colIdx;
              const isFlipped = flipped.includes(idx) || matched.includes(idx);

              return (
                <TouchableOpacity
                  key={colIdx}
                  style={[styles.cell, { width: cellSize, height: cellSize }]}
                  activeOpacity={0.8}
                  onPress={() => handlePress(idx)}
                >
                  {isFlipped ? (
                    <Image source={{ uri: cards[idx] }} style={styles.image} />
                  ) : (
                    <View style={styles.hidden} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.info}>
        {turnTimes.map((t, i) => (
          <Text key={i}>
            P{t.player} - {(t.time / 1000).toFixed(2)}s
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    margin: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    margin: 4,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  hidden: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#bdbdbd",
    borderRadius: 6,
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 6,
  },
  info: {
    padding: 10,
  },
});

export default function TabIndex() {
  return <MemoryGameGrid />;
}
