import type { Metadata } from 'next';
import LandingPageInteractive from './components/LandingPageInteractive';

export const metadata: Metadata = {
  title: 'SVR1 Вакуумний Сівач - Agrolan | Українське виробництво за 25 000 грн',
  description: 'Професійний вакуумний сівач SVR1 від Agrolan за 25 000 грн. Точність 98%, повна комплектація, українське виробництво. Економія до 40% насіння. Гарантія 2 роки.',
};

export default function LandingPage() {
  return <LandingPageInteractive />;
}