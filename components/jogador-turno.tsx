import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  currentPlayer: number;
  moves: { 1: number; 2: number };
};

export function JogadorTurno({ currentPlayer, moves }: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[styles.playerBox, currentPlayer === 1 && styles.activePlayer]}
      >
        <Text style={styles.name}>Jogador 1</Text>
        <Text style={styles.moves}>{moves[1]} jogadas</Text>
      </View>

      <Text style={styles.vs}>VS</Text>

      <View
        style={[styles.playerBox, currentPlayer === 2 && styles.activePlayer]}
      >
        <Text style={styles.name}>Jogador 2</Text>
        <Text style={styles.moves}>{moves[2]} jogadas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 40,
  },
  playerBox: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    marginHorizontal: 6,
  },
  activePlayer: {
    backgroundColor: "#4CAF50",
    transform: [{ scale: 1.08 }],
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  moves: {
    marginTop: 4,
    fontSize: 13,
    color: "#555",
  },
  vs: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#888",
  },
});
