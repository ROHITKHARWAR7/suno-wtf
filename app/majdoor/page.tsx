import { ScenePage } from '@/components/ScenePage';
import { getScene } from '@/data/scenes';

export default function MajdoorPage() {
  const scene = getScene('majdoor');

  if (!scene) {
    return <div>Scene not found</div>;
  }

  return <ScenePage scene={scene} />;
}
