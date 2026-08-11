import { ScenePage } from '@/components/ScenePage';
import { getScene } from '@/data/scenes';

export default function ShadiPage() {
  const scene = getScene('shaadi');

  if (!scene) {
    return <div>Scene not found</div>;
  }

  return <ScenePage scene={scene} />;
}
