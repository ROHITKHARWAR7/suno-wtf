import { ScenePage } from '@/components/ScenePage';
import { getScene } from '@/data/scenes';

export default function KitchenPage() {
  const scene = getScene('kitchen');

  if (!scene) {
    return <div>Scene not found</div>;
  }

  return <ScenePage scene={scene} />;
}
