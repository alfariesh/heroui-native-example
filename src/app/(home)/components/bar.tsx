import { Card } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { BarChart } from '../../../components/charts/bar-chart';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { useAppTheme } from '../../../contexts/app-theme-context';

const BasicBarChartContent = () => {
  const data = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 78 },
    { label: 'Wed', value: 90 },
    { label: 'Thu', value: 55 },
    { label: 'Fri', value: 82 },
    { label: 'Sat', value: 45 },
    { label: 'Sun', value: 72 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Weekly Activity</Card.Title>
            <Card.Description>Hours per day</Card.Description>
          </View>
          <BarChart data={data} height={200} />
        </View>
      </Card>
    </View>
  );
};

const ColoredBarChartContent = () => {
  const data = [
    { label: 'Q1', value: 120, color: '#10b981' },
    { label: 'Q2', value: 150, color: '#3b82f6' },
    { label: 'Q3', value: 95, color: '#f59e0b' },
    { label: 'Q4', value: 180, color: '#8b5cf6' },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Quarterly Revenue</Card.Title>
            <Card.Description>In thousands</Card.Description>
          </View>
          <BarChart data={data} height={220} />
        </View>
      </Card>
    </View>
  );
};

const MinimalBarChartContent = () => {
  const data = [
    { label: 'A', value: 45 },
    { label: 'B', value: 82 },
    { label: 'C', value: 60 },
    { label: 'D', value: 95 },
    { label: 'E', value: 38 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Minimal Style</Card.Title>
            <Card.Description>No grid, no values</Card.Description>
          </View>
          <BarChart data={data} height={180} showGrid={false} showValues={false} />
        </View>
      </Card>
    </View>
  );
};

const ComparisonBarChartContent = () => {
  const { isDark } = useAppTheme();

  const data = [
    { label: 'Jan', value: 85, color: isDark ? '#60a5fa' : '#2563eb' },
    { label: 'Feb', value: 92, color: isDark ? '#60a5fa' : '#2563eb' },
    { label: 'Mar', value: 78, color: isDark ? '#60a5fa' : '#2563eb' },
    { label: 'Apr', value: 105, color: isDark ? '#60a5fa' : '#2563eb' },
    { label: 'May', value: 88, color: isDark ? '#60a5fa' : '#2563eb' },
    { label: 'Jun', value: 110, color: isDark ? '#60a5fa' : '#2563eb' },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Sales Performance</Card.Title>
            <Card.Description>Monthly comparison</Card.Description>
          </View>
          <BarChart data={data} height={240} maxValue={120} />
        </View>
      </Card>
    </View>
  );
};

const LargeDatasetContent = () => {
  const data = [
    { label: '0h', value: 12 },
    { label: '3h', value: 8 },
    { label: '6h', value: 15 },
    { label: '9h', value: 28 },
    { label: '12h', value: 42 },
    { label: '15h', value: 38 },
    { label: '18h', value: 35 },
    { label: '21h', value: 22 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Traffic Pattern</Card.Title>
            <Card.Description>Requests per hour</Card.Description>
          </View>
          <BarChart data={data} height={200} />
        </View>
      </Card>
    </View>
  );
};

const BAR_CHART_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic bar chart',
    content: <BasicBarChartContent />,
  },
  {
    value: 'colored',
    label: 'Colored bars',
    content: <ColoredBarChartContent />,
  },
  {
    value: 'minimal',
    label: 'Minimal style',
    content: <MinimalBarChartContent />,
  },
  {
    value: 'comparison',
    label: 'Comparison chart',
    content: <ComparisonBarChartContent />,
  },
  {
    value: 'large-dataset',
    label: 'Large dataset',
    content: <LargeDatasetContent />,
  },
];

export default function BarChartScreen() {
  return <UsageVariantFlatList data={BAR_CHART_VARIANTS} />;
}
