'use client';

import { useVariant } from '@/lib/variants';
import DeviceFrame from '@/components/DeviceFrame';
import HomeScreen from '@/components/HomeScreen';
import V1Current from '@/components/variants/v1-current';
import V2Progressive from '@/components/variants/v2-progressive';
import V3Conversational from '@/components/variants/v3-conversational';

export default function Home() {
  const { variant } = useVariant();

  return (
    <DeviceFrame>
      {variant === 'home' && <HomeScreen />}
      {variant === 'current' && <V1Current />}
      {variant === 'progressive' && <V2Progressive />}
      {variant === 'conversational' && <V3Conversational />}
    </DeviceFrame>
  );
}

