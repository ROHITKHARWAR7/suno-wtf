import { getScene } from '@/data/scenes';
import { BhojpuriScenePage } from '@/components/BhojpuriScenePage';

export const metadata = {
  title: 'Bhojpuri Banger - SUNO.WTF',
  description: 'Depression ki dawa hove bhojpuri gana',
};

export default function BhojpuriPage() {
  const scene = getScene('bhojpuri');
  
  if (!scene) {
    return <div>Scene not found</div>;
  }

  return (
    <BhojpuriScenePage 
      scene={{
        ...scene,
        youtubePlaylistId: scene.youtubePlaylistId || '',
        bhojpuriQuotes: (scene as any).bhojpuriQuotes || [],
      }}
    />
  );
}
