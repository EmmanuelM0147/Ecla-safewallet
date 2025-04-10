import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Path, Svg, G } from 'react-native-svg';
import colors from '@/constants/colors';

interface LogoProps {
  size?: number;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 80, 
  color = colors.primary 
}) => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size * 0.5} viewBox="0 0 200 100" fill="none">
        {/* Flower icon */}
        <G transform="translate(0, 10)">
          <Path
            d="M70 30C70 20 80 10 100 10C120 10 130 20 130 30C130 40 120 50 100 50C80 50 70 40 70 30Z"
            fill={color}
            opacity={0.9}
          />
          <Path
            d="M60 50C50 50 40 40 40 20C40 0 50 -10 60 -10C70 -10 80 0 80 20C80 40 70 50 60 50Z"
            fill={color}
            opacity={0.7}
            transform="translate(40, 40)"
          />
          <Path
            d="M60 50C50 50 40 40 40 20C40 0 50 -10 60 -10C70 -10 80 0 80 20C80 40 70 50 60 50Z"
            fill={color}
            opacity={0.7}
            transform="translate(0, 40) rotate(120, 60, 20)"
          />
          <Path
            d="M60 50C50 50 40 40 40 20C40 0 50 -10 60 -10C70 -10 80 0 80 20C80 40 70 50 60 50Z"
            fill={color}
            opacity={0.7}
            transform="translate(80, 40) rotate(240, 60, 20)"
          />
        </G>
        
        {/* Text */}
        <G transform="translate(100, 50)">
          <Path
            d="M0 0H10C15 0 20 5 20 10C20 15 15 20 10 20H0V0ZM0 10H10C10 10 10 10 10 10C10 10 10 10 10 10H0V10Z"
            fill="#1A1A3A"
          />
          <Path
            d="M25 0C25 0 30 0 35 0C40 0 45 5 45 10C45 15 40 20 35 20C30 20 25 20 25 20V0ZM25 10H35C35 10 35 10 35 10C35 10 35 10 35 10H25V10Z"
            fill="#1A1A3A"
          />
          <Path
            d="M50 0H60V20H50V0ZM50 -5H60V0H50V-5Z"
            fill="#1A1A3A"
          />
          <Path
            d="M65 0H75C80 0 85 5 85 10C85 15 80 20 75 20H65V0ZM65 10H75C75 10 75 10 75 10C75 10 75 10 75 10H65V10Z"
            fill="#1A1A3A"
          />
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

export default Logo;