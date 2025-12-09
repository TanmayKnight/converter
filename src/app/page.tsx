import Link from 'next/link';
import {
  Ruler,
  Weight,
  Thermometer,
  FlaskConical,
  LayoutGrid,
  Clock,
  HardDrive,
  ArrowRight,
  Zap,
  Gauge,
  Activity,
  Anchor,
  Wind,
  Coins,
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  Sun,
  Radio,
  Magnet,
  Droplets,
  RotateCw,
  Move,
  LucideIcon,
  Binary,
  Hash,
  Code,
  BoxSelect,
  Box,
  Banknote,
  Sigma,
  FunctionSquare,
  Triangle,
  PiggyBank,
  Receipt,
  Wallet,
  Umbrella,
} from 'lucide-react';
import { unitDefinitions, UnitCategory, CategoryDefinition } from '@/lib/units/definitions';
import { CompactCard } from '@/components/CompactCard';

// Map icons
const iconMap: Record<UnitCategory, LucideIcon> = {
  length: Ruler,
  weight: Weight,
  temperature: Thermometer,
  volume: FlaskConical,
  area: LayoutGrid,
  time: Clock,
  digital: HardDrive,
  speed: Wind,
  pressure: Gauge,
  power: Zap,
  energy: Activity,
  force: Anchor,
  currency: Coins,
  torque: RotateCw,
  acceleration: Move,
  flow: Droplets,
  current: Zap,
  voltage: Zap,
  resistance: Zap,
  charge: Zap,
  magnetism: Magnet,
  illuminance: Sun,
  radiation: Radio,
};

export default function Home() {
  // Define groups with thematic mix of Converters and Calculators
  const columns = [
    {
      id: 'everyday',
      title: 'Everyday Essentials',
      description: 'Daily utilities and common conversions.',
      color: 'text-blue-600',
      border: 'border-blue-500/20',
      items: [
        { type: 'converter', id: 'length' },
        { type: 'converter', id: 'weight' },
        { type: 'converter', id: 'temperature' },
        { type: 'converter', id: 'volume' },
        { type: 'converter', id: 'time' },
        { type: 'converter', id: 'currency' },
        { type: 'calculator', title: 'Tip Splitter', href: '/calculators/math/tip', icon: Banknote },
        { type: 'calculator', title: 'Percentage', href: '/calculators/math/percentage', icon: Percent },
        { type: 'calculator', title: 'BMI Calculator', href: '/calculators/health/bmi', icon: Activity },
        { type: 'calculator', title: 'Startups / ROI', href: '/calculators/finance/roi', icon: TrendingUp },
      ]
    },
    {
      id: 'finance',
      title: 'Business & Finance',
      description: 'Professional tools for money management.',
      color: 'text-emerald-600',
      border: 'border-emerald-500/20',
      items: [
        { type: 'calculator', title: 'Investment', href: '/calculators/finance/investment', icon: PiggyBank },
        { type: 'calculator', title: 'Loan Calculator', href: '/calculators/finance/loan', icon: Percent },
        { type: 'calculator', title: 'Mortgage', href: '/calculators/finance/mortgage', icon: DollarSign },
        { type: 'calculator', title: 'Advanced Loans', href: '/calculators/finance/loan-advanced', icon: Wallet },
        { type: 'calculator', title: 'Tax (GST/VAT)', href: '/calculators/finance/tax', icon: Receipt },
        { type: 'calculator', title: 'Retirement', href: '/calculators/finance/retirement', icon: Umbrella },
        { type: 'converter', id: 'area' }, // Land area often financial
      ]
    },
    {
      id: 'science',
      title: 'Science & Engineering',
      description: 'Physics, Electronics, and Mechanics.',
      color: 'text-purple-600',
      border: 'border-purple-500/20',
      items: [
        { type: 'converter', id: 'speed' },
        { type: 'converter', id: 'pressure' },
        { type: 'converter', id: 'power' },
        { type: 'converter', id: 'energy' },
        { type: 'converter', id: 'force' },
        { type: 'converter', id: 'torque' },
        { type: 'converter', id: 'digital' },
        { type: 'converter', id: 'current' },
        { type: 'converter', id: 'voltage' },
        { type: 'converter', id: 'resistance' },
        { type: 'calculator', title: "Ohm's Law", href: '/calculators/physics/ohms-law', icon: Zap },
        { type: 'calculator', title: 'Px to Rem', href: '/calculators/technology/px-to-rem', icon: Code },
      ]
    },
    {
      id: 'math',
      title: 'Math & Geometry',
      description: 'Advanced mathematics and shapes.',
      color: 'text-orange-600',
      border: 'border-orange-500/20',
      items: [
        { type: 'calculator', title: 'Algebra', href: '/calculators/math/algebra', icon: FunctionSquare },
        { type: 'calculator', title: 'Trigonometry', href: '/calculators/math/trigonometry', icon: Triangle },
        { type: 'calculator', title: 'Statistics', href: '/calculators/math/statistics', icon: Sigma },
        { type: 'calculator', title: 'Area Calc', href: '/calculators/geometry/area', icon: BoxSelect },
        { type: 'calculator', title: 'Volume Calc', href: '/calculators/geometry/volume', icon: Box },
        { type: 'calculator', title: 'Base Converter', href: '/calculators/math/base', icon: Binary },
        { type: 'calculator', title: 'Roman Numerals', href: '/calculators/math/roman', icon: Hash },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] pb-12">

      {/* Main Content Area */}
      <div className="container px-4 mx-auto max-w-screen-2xl mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">

          {columns.map((col) => (
            <div key={col.id} className="space-y-4">
              <div className="flex flex-col gap-1 pb-2 border-b border-border/40">
                <h2 className={`text-lg font-bold ${col.color}`}>{col.title}</h2>
                <p className="text-xs text-muted-foreground">{col.description}</p>
              </div>

              <div className="grid gap-3">
                {col.items.map((item: any, i) => {
                  let href = '';
                  let Icon;
                  let title = '';
                  let description = '';

                  if (item.type === 'converter') {
                    const cat = unitDefinitions[item.id as UnitCategory];
                    if (!cat) return null; // Safety
                    href = `/${cat.id}`;
                    Icon = iconMap[cat.id];
                    title = cat.name;
                    description = '';
                  } else {
                    href = item.href;
                    Icon = item.icon;
                    title = item.title;
                    description = '';
                  }

                  return (
                    <CompactCard
                      key={i}
                      href={href}
                      icon={Icon}
                      title={title}
                      description={description}
                      iconColorClass={col.color}
                      colorClass={col.border}
                    />
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
