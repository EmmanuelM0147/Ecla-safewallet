import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle, G, Path, Svg } from 'react-native-svg';
import colors from '@/constants/colors';

interface FloatingTokensProps {
  width?: number;
  height?: number;
}

export const FloatingTokens: React.FC<FloatingTokensProps> = ({ 
  width = 320, 
  height = 240 
}) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox="0 0 320 240" fill="none">
        {/* Background ellipse */}
        <Circle cx="160" cy="120" r="120" fill="#EEF3FF" />
        
        {/* Dollar Coin 1 - Large center */}
        <G transform="translate(130, 90)">
          <Circle cx="30" cy="30" r="30" fill={colors.white} />
          <Circle cx="30" cy="30" r="28" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M30 15V45M20 25H40" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" />
          <Path d="M30 10V15M30 45V50" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
        </G>
        
        {/* Dollar Coin 2 - Top right */}
        <G transform="translate(210, 50) rotate(15)">
          <Circle cx="25" cy="25" r="25" fill={colors.white} />
          <Circle cx="25" cy="25" r="23" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M25 12V38M17 22H33" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
        </G>
        
        {/* Dollar Coin 3 - Bottom right */}
        <G transform="translate(190, 150) rotate(-10)">
          <Circle cx="22" cy="22" r="22" fill={colors.white} />
          <Circle cx="22" cy="22" r="20" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M22 11V33M15 20H29" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
        </G>
        
        {/* Dollar Coin 4 - Top left */}
        <G transform="translate(60, 60) rotate(-15)">
          <Circle cx="24" cy="24" r="24" fill={colors.white} />
          <Circle cx="24" cy="24" r="22" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M24 12V36M16 21H32" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
        </G>
        
        {/* Dollar Coin 5 - Bottom left */}
        <G transform="translate(80, 160) rotate(10)">
          <Circle cx="20" cy="20" r="20" fill={colors.white} />
          <Circle cx="20" cy="20" r="18" stroke={colors.primary} strokeWidth="2" fill="none" />
          <Path d="M20 10V30M14 18H26" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
        </G>
        
        {/* Small floating coins */}
        <G transform="translate(40, 120) rotate(-5)">
          <Circle cx="15" cy="15" r="15" fill={colors.white} />
          <Circle cx="15" cy="15" r="13" stroke={colors.primary} strokeWidth="1.5" fill="none" />
          <Path d="M15 8V22M10 14H20" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        </G>
        
        <G transform="translate(240, 100) rotate(20)">
          <Circle cx="15" cy="15" r="15" fill={colors.white} />
          <Circle cx="15" cy="15" r="13" stroke={colors.primary} strokeWidth="1.5" fill="none" />
          <Path d="M15 8V22M10 14H20" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        </G>
        
        <G transform="translate(160, 40) rotate(-8)">
          <Circle cx="16" cy="16" r="16" fill={colors.white} />
          <Circle cx="16" cy="16" r="14" stroke={colors.primary} strokeWidth="1.5" fill="none" />
          <Path d="M16 8V24M11 15H21" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        </G>
        
        <G transform="translate(120, 180) rotate(12)">
          <Circle cx="14" cy="14" r="14" fill={colors.white} />
          <Circle cx="14" cy="14" r="12" stroke={colors.primary} strokeWidth="1.5" fill="none" />
          <Path d="M14 7V21M9 13H19" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
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

export default FloatingTokens;