import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle, G, Path, Svg } from 'react-native-svg';
import colors from '@/constants/colors';

interface CoinsIllustrationProps {
  width?: number;
  height?: number;
}

export const CoinsIllustration: React.FC<CoinsIllustrationProps> = ({ 
  width = 300, 
  height = 200 
}) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 300 200" fill="none">
        <Circle cx="150" cy="100" r="100" fill={colors.primaryLight} opacity={0.1} />
        
        {/* Coin 1 */}
        <G transform="translate(120, 80)">
          <Circle cx="30" cy="30" r="30" fill={colors.white} />
          <Circle cx="30" cy="30" r="28" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M30 15V45M20 25H40" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
          <Path d="M30 10V15M30 45V50" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
          <Path d="M15 30H20M40 30H45" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
        </G>
        
        {/* Coin 2 */}
        <G transform="translate(50, 60) rotate(-15)">
          <Circle cx="25" cy="25" r="25" fill={colors.white} />
          <Circle cx="25" cy="25" r="23" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M25 12V38M17 22H33" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
        </G>
        
        {/* Coin 3 */}
        <G transform="translate(200, 50) rotate(10)">
          <Circle cx="25" cy="25" r="25" fill={colors.white} />
          <Circle cx="25" cy="25" r="23" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M25 12V38M17 22H33" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
        </G>
        
        {/* Coin 4 */}
        <G transform="translate(180, 130) rotate(25)">
          <Circle cx="20" cy="20" r="20" fill={colors.white} />
          <Circle cx="20" cy="20" r="18" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M20 10V30M14 18H26" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
        </G>
        
        {/* Coin 5 */}
        <G transform="translate(70, 140) rotate(-20)">
          <Circle cx="20" cy="20" r="20" fill={colors.white} />
          <Circle cx="20" cy="20" r="18" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M20 10V30M14 18H26" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CoinsIllustration;