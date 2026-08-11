import { ScenePage } from '@/components/ScenePage';
import { getScene } from '@/data/scenes';

export default function BreakupPage() {
  const scene = getScene('breakup');

  if (!scene) {
    return <div>Scene not found</div>;
  }

  return <ScenePage scene={scene} />;
}
