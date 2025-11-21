import { cn, useThemeColor } from 'heroui-native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle, Line, Polygon, Text } from 'react-native-svg';
import { AppText } from '../app-text';

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface RadarChartProps {
  data: RadarChartDataPoint[];
  maxValue?: number;
  size?: number;
  levels?: number;
  fillColor?: string;
  strokeColor?: string;
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
}

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  maxValue,
  size = 300,
  levels = 5,
  fillColor,
  strokeColor,
  showLabels = true,
  showValues = false,
  className,
}) => {
  const themeColorAccent = useThemeColor('accent');
  const themeColorBorder = useThemeColor('border');
  const themeColorMuted = useThemeColor('muted');

  const max = maxValue || Math.max(...data.map((d) => d.value));
  const center = size / 2;
  const radius = (size / 2) * 0.7;
  const angleStep = (2 * Math.PI) / data.length;

  const points = useMemo(() => {
    return data.map((item, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const r = (item.value / max) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, angle, label: item.label, value: item.value };
    });
  }, [data, max, radius, center, angleStep]);

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const levelPolygons = useMemo(() => {
    return Array.from({ length: levels }).map((_, levelIndex) => {
      const levelRadius = (radius * (levelIndex + 1)) / levels;
      const levelPoints = data
        .map((_, index) => {
          const angle = angleStep * index - Math.PI / 2;
          const x = center + levelRadius * Math.cos(angle);
          const y = center + levelRadius * Math.sin(angle);
          return `${x},${y}`;
        })
        .join(' ');
      return levelPoints;
    });
  }, [levels, radius, data, angleStep, center]);

  return (
    <View className={cn('items-center gap-4', className)}>
      <Animated.View entering={FadeIn}>
        <Svg width={size} height={size}>
          {levelPolygons.map((levelPoints, index) => (
            <Polygon
              key={`level-${index}`}
              points={levelPoints}
              fill="none"
              stroke={themeColorBorder}
              strokeWidth="1"
              opacity={0.3}
            />
          ))}

          {points.map((point, index) => (
            <Line
              key={`axis-${index}`}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(point.angle)}
              y2={center + radius * Math.sin(point.angle)}
              stroke={themeColorBorder}
              strokeWidth="1"
              opacity={0.5}
            />
          ))}

          <AnimatedPolygon
            entering={FadeIn.delay(300).springify()}
            points={polygonPoints}
            fill={fillColor || themeColorAccent}
            fillOpacity={0.3}
            stroke={strokeColor || themeColorAccent}
            strokeWidth="2"
          />

          {points.map((point, index) => (
            <Circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={strokeColor || themeColorAccent}
            />
          ))}

          {showLabels &&
            points.map((point, index) => {
              const labelRadius = radius + 30;
              const labelX = center + labelRadius * Math.cos(point.angle);
              const labelY = center + labelRadius * Math.sin(point.angle);

              return (
                <Text
                  key={`label-${index}`}
                  x={labelX}
                  y={labelY}
                  fontSize="12"
                  fill={themeColorMuted}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {point.label}
                </Text>
              );
            })}
        </Svg>
      </Animated.View>

      {showValues && (
        <View className="gap-2">
          {data.map((item) => (
            <View key={item.label} className="flex-row items-center gap-2">
              <View
                style={{ backgroundColor: themeColorAccent }}
                className="w-3 h-3 rounded-full"
              />
              <AppText className="text-sm text-foreground">
                {item.label}: {item.value}
              </AppText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
