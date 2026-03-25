import { StyleSheet, Text, View } from "react-native";

const NUM_ROWS = 4;
const NUM_COLS = 6;

function Grid4x6() {
  return (
    <View style={styles.grid}>
      {Array.from({ length: NUM_ROWS }).map((_, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {Array.from({ length: NUM_COLS }).map((_, colIdx) => (
            <View key={colIdx} style={styles.cell}>
              <Text style={styles.cellText}>
                {rowIdx * NUM_COLS + colIdx + 1}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    margin: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    margin: 4,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  cellText: {
    fontSize: 16,
    color: "#333",
  },
});

export default function TabIndex() {
  return <Grid4x6 />;
}
