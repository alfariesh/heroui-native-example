import { Card } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import { RadarChart } from '../../../components/charts/radar-chart';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicRadarChartContent = () => {
  const data = [
    { label: 'Speed', value: 85 },
    { label: 'Strength', value: 70 },
    { label: 'Defense', value: 65 },
    { label: 'Magic', value: 90 },
    { label: 'Stamina', value: 75 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Character Stats</Card.Title>
            <Card.Description>Overall performance metrics</Card.Description>
          </View>
          <View className="items-center">
            <RadarChart data={data} size={280} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const WithValuesContent = () => {
  const data = [
    { label: 'Innovation', value: 92 },
    { label: 'Quality', value: 88 },
    { label: 'Service', value: 78 },
    { label: 'Value', value: 85 },
    { label: 'Reliability', value: 95 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Product Analysis</Card.Title>
            <Card.Description>Key performance indicators</Card.Description>
          </View>
          <View className="items-center">
            <RadarChart data={data} size={260} showValues />
          </View>
        </View>
      </Card>
    </View>
  );
};

const CustomColorContent = () => {
  const data = [
    { label: 'HTML', value: 95 },
    { label: 'CSS', value: 88 },
    { label: 'JavaScript', value: 92 },
    { label: 'React', value: 85 },
    { label: 'TypeScript', value: 80 },
    { label: 'Node.js', value: 78 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Skills Assessment</Card.Title>
            <Card.Description>Technical proficiency levels</Card.Description>
          </View>
          <View className="items-center">
            <RadarChart
              data={data}
              size={280}
              fillColor="#10b981"
              strokeColor="#059669"
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const CompactRadarContent = () => {
  const data = [
    { label: 'A', value: 70 },
    { label: 'B', value: 85 },
    { label: 'C', value: 60 },
    { label: 'D', value: 90 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Compact View</Card.Title>
            <Card.Description>Smaller radar with 4 axes</Card.Description>
          </View>
          <View className="items-center">
            <RadarChart data={data} size={240} levels={4} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const DetailedRadarContent = () => {
  const data = [
    { label: 'Communication', value: 88 },
    { label: 'Teamwork', value: 92 },
    { label: 'Leadership', value: 75 },
    { label: 'Problem Solving', value: 85 },
    { label: 'Creativity', value: 90 },
    { label: 'Time Management', value: 78 },
    { label: 'Adaptability', value: 82 },
    { label: 'Technical Skills', value: 95 },
  ];

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full p-4">
        <View className="gap-4">
          <View>
            <Card.Title>Employee Evaluation</Card.Title>
            <Card.Description>Comprehensive skill matrix</Card.Description>
          </View>
          <View className="items-center">
            <RadarChart data={data} size={300} levels={5} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const RADAR_CHART_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic radar chart',
    content: <BasicRadarChartContent />,
  },
  {
    value: 'with-values',
    label: 'With value labels',
    content: <WithValuesContent />,
  },
  {
    value: 'custom-color',
    label: 'Custom colors',
    content: <CustomColorContent />,
  },
  {
    value: 'compact',
    label: 'Compact view',
    content: <CompactRadarContent />,
  },
  {
    value: 'detailed',
    label: 'Detailed (8 axes)',
    content: <DetailedRadarContent />,
  },
];

export default function RadarChartScreen() {
  return <UsageVariantFlatList data={RADAR_CHART_VARIANTS} />;
}
