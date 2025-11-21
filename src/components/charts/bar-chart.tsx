import { cn, useThemeColor } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppText } from '../app-text';

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  maxValue?: number;
  height?: number;
  showValues?: boolean;
  showGrid?: boolean;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  height = 200,
  showValues = true,
  showGrid = true,
  className,
}) => {
  const themeColorAccent = useThemeColor('accent');
  const themeColorBorder = useThemeColor('border');

  const max = maxValue || Math.max(...data.map((d) => d.value));
  const gridLines = 5;

  return (
    <View className={cn('gap-4', className)}>
      <View style={{ height }} className="relative">
        {showGrid && (
          <View className="absolute inset-0 justify-between">
            {Array.from({ length: gridLines }).map((_, i) => (
              <View
                key={i}
                className="flex-row items-center gap-2"
                style={{ height: 1 }}
              >
                <AppText className="text-xs text-muted w-8 text-right">
                  {Math.round((max * (gridLines - 1 - i)) / (gridLines - 1))}
                </AppText>
                <View
                  style={{ backgroundColor: themeColorBorder }}
                  className="flex-1 h-[1px]"
                />
              </View>
            ))}
          </View>
        )}

        <View className="flex-1 flex-row items-end justify-around gap-2 ml-10">
          {data.map((item, index) => {
            const barHeight = (item.value / max) * height;

            return (
              <Animated.View
                key={item.label}
                entering={FadeInDown.delay(index * 100).springify()}
                className="flex-1 items-center gap-2"
              >
                {showValues && (
                  <AppText className="text-xs font-medium text-foreground">
                    {item.value}
                  </AppText>
                )}
                <View
                  style={{
                    height: barHeight,
                    backgroundColor: item.color || themeColorAccent,
                  }}
                  className="w-full rounded-t-lg"
                />
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View className="flex-row justify-around gap-2">
        {data.map((item) => (
          <View key={item.label} className="flex-1 items-center">
            <AppText
              className="text-xs text-muted text-center"
              numberOfLines={1}
            >
              {item.label}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};
