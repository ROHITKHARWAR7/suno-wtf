import { ScenePage } from '@/components/ScenePage';
import { getScene } from '@/data/scenes';

export default function SaloonPage() {
  const scene = getScene('saloon');

  if (!scene) {
    return <div>Scene not found</div>;
  }

  return <ScenePage scene={scene} />;
}
