import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface QRCodeProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  color = colors.text,
  backgroundColor = colors.white,
}) => {
  // Create a simple hash of the value to generate a consistent pattern
  const generateHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const hash = generateHash(value);
  
  // Generate a 25x25 matrix for the QR code (simplified version)
  const matrix = Array(25).fill(0).map((_, rowIndex) => {
    return Array(25).fill(0).map((_, colIndex) => {
      // Always have a border
      if (rowIndex === 0 || colIndex === 0 || rowIndex === 24 || colIndex === 24) {
        return false;
      }
      
      // Fixed position markers (top-left, top-right, bottom-left)
      if ((rowIndex < 7 && colIndex < 7) || 
          (rowIndex < 7 && colIndex > 17) || 
          (rowIndex > 17 && colIndex < 7)) {
        // Outer square
        if (rowIndex === 1 || rowIndex === 6 || colIndex === 1 || colIndex === 6 ||
            rowIndex === 18 || rowIndex === 23 || colIndex === 18 || colIndex === 23) {
          return true;
        }
        // Inner square
        if ((rowIndex >= 2 && rowIndex <= 5 && colIndex >= 2 && colIndex <= 5) ||
            (rowIndex >= 2 && rowIndex <= 5 && colIndex >= 19 && colIndex <= 22) ||
            (rowIndex >= 19 && rowIndex <= 22 && colIndex >= 2 && colIndex <= 5)) {
          return true;
        }
        return false;
      }
      
      // Use the hash to determine if a cell should be filled
      return ((hash + rowIndex * colIndex) % 3 === 0);
    });
  });

  const cellSize = size / 25;

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor }]}>
      {matrix.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((cell, colIndex) => (
            <View
              key={`cell-${rowIndex}-${colIndex}`}
              style={[
                styles.cell,
                {
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: cell ? color : backgroundColor,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 0,
  },
});

export default QRCode;