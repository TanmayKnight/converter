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
} from 'lucide-react';
import { unitDefinitions, UnitCategory, CategoryDefinition } from '@/lib/units/definitions';
import { Search } from '@/components/Search';
import { CompactCard } from '@/components/CompactCard';

// Map icons
const iconMap: Record<UnitCategory, React.ElementType> = {
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
};

// Groups
const groups = [
  {
    name: 'Common Converters',
    description: 'Everyday units for general use.',
    categories: ['length', 'weight', 'temperature', 'volume', 'area', 'time', 'currency'] as UnitCategory[]
  },
  {
    name: 'Engineering & Physics',
    description: 'Technical units for specialized calculations.',
    categories: ['speed', 'pressure', 'power', 'energy', 'force'] as UnitCategory[]
  },
  {
    name: 'Digital & Science',
    description: 'Data storage and other scientific measurments.',
    categories: ['digital'] as UnitCategory[]
  }
];

export default function Home() {
  const getCategory = (id: UnitCategory) => unitDefinitions[id];

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] pb-12">
      {/* Hero Section - Compact */}
      <section className="relative pt-8 pb-8 md:pt-12 md:pb-10 overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto text-center max-w-screen-xl">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground mb-3">
            Convert <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Anything</span> Instantly
          </h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground mb-6">
            Accurate, fast, and free unit converters and calculators.
          </p>

          <div className="mb-4">
            <Search />
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container px-4 mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Common Converters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/40">
              <h2 className="text-lg font-bold">General</h2>
            </div>
            <div className="grid gap-3">
              {groups[0].categories.map(catId => {
                const cat = getCategory(catId);
                const Icon = iconMap[cat.id];
                return (
                  <CompactCard
                    key={cat.id}
                    href={`/${cat.id}`}
                    icon={Icon}
                    title={cat.name}
                    description=""
                  />
                );
              })}
            </div>
          </div>

          {/* Column 2: Engineering & Digital */}
          <div className="space-y-8">
            {/* Engineering */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/40">
                <h2 className="text-lg font-bold">Engineering</h2>
              </div>
              <div className="grid gap-3">
                {groups[1].categories.map(catId => {
                  const cat = getCategory(catId);
                  const Icon = iconMap[cat.id];
                  return (
                    <CompactCard
                      key={cat.id}
                      href={`/${cat.id}`}
                      icon={Icon}
                      title={cat.name}
                      description=""
                    />
                  );
                })}
              </div>
            </div>

            {/* Digital */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/40">
                <h2 className="text-lg font-bold">Digital</h2>
              </div>
              <div className="grid gap-3">
                {groups[2].categories.map(catId => {
                  const cat = getCategory(catId);
                  const Icon = iconMap[cat.id];
                  return (
                    <CompactCard
                      key={cat.id}
                      href={`/${cat.id}`}
                      icon={Icon}
                      title={cat.name}
                      description=""
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3: Calculators */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/40">
              <h2 className="text-lg font-bold text-purple-600">Calculators</h2>
            </div>
            <div className="grid gap-3">
              <CompactCard
                href="/calculators/finance/mortgage"
                icon={DollarSign}
                title="Mortgage Calculator"
                description=""
                colorClass="border-purple-500/20"
                iconColorClass="text-purple-600"
              />
              <CompactCard
                href="/calculators/finance/loan"
                icon={Percent}
                title="Loan Calculator"
                description=""
                colorClass="border-purple-500/20"
                iconColorClass="text-purple-600"
              />
              <CompactCard
                href="/calculators/finance/roi"
                icon={TrendingUp}
                title="ROI Calculator"
                description=""
                colorClass="border-purple-500/20"
                iconColorClass="text-purple-600"
              />
              <CompactCard
                href="/calculators/health/bmi"
                icon={Activity}
                title="BMI Calculator"
                description=""
                colorClass="border-pink-500/20"
                iconColorClass="text-pink-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
