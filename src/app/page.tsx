import {
  Ruler,
  Weight,
  Thermometer,
  FlaskConical,
  LayoutGrid,
  Clock,
  HardDrive,
  Zap,
  Gauge,
  Activity,
  Anchor,
  Wind,
  Coins,
  DollarSign,
  TrendingUp,
  Percent,
  Receipt,
  Umbrella,
  PiggyBank,
  Wallet,
  FunctionSquare,
  Triangle,
  Sigma,
  BoxSelect,
  Box,
  Binary,
  Hash,
  Code,
  Banknote,
  FileText,
  Files,
  Scissors,
  Merge,
  RotateCw,
  Move,
  Droplets,
  Magnet,
  Sun,
  Radio,
  Image as ImageIcon,
  Crop,
  Maximize2,
  Minimize2,
  Eraser,
  Sparkles,
  User
} from 'lucide-react';
import { unitDefinitions, UnitCategory } from '@/lib/units/definitions';
import { BentoGrid, BentoCard, BentoItem } from '@/components/BentoGrid';

// Map icons for unit categories
const iconMap: Record<UnitCategory, any> = {
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

  // Helper to get unit link with instantiated icon
  const getUnitItem = (id: string, featured = false): BentoItem => {
    const cat = unitDefinitions[id as UnitCategory];
    const Icon = iconMap[id as UnitCategory];
    return {
      title: cat?.name || id,
      href: `/${id}`,
      icon: Icon ? <Icon /> : null,
      featured,
      type: 'converter'
    };
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] pb-12">
      <div className="container px-4 mx-auto max-w-screen-xl mt-8">

        <div className="mb-10 text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            The <span className="text-primary">All-in-One</span> Digital Toolkit.
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Master your workflow with professional Financial Calculators, Unit Converters, and secure PDF & Image tools. Fast, free, and privacy-first.
          </p>
        </div>

        <BentoGrid>
          {/* 1. Everyday Essentials (Blue) */}
          <BentoCard
            title="Everyday & Units"
            description="Common unit conversions for daily use."
            icon={<LayoutGrid />}
            colorTheme="blue"
            items={[
              getUnitItem('length', true),
              getUnitItem('weight', true),
              getUnitItem('temperature'),
              getUnitItem('volume'),
              getUnitItem('time'),
              getUnitItem('area'),
              getUnitItem('speed'),
              getUnitItem('digital'),
            ]}
          />

          {/* 2. Business & Finance (Emerald) - Featured Spot */}
          <BentoCard
            title="Finance & Business"
            description="Crucial tools for mortgages, loans, and taxes."
            icon={<DollarSign />}
            colorTheme="emerald"
            items={[
              { title: "Mortgage Calc", href: "/calculators/finance/mortgage", icon: <DollarSign />, featured: true, type: 'calculator' },
              { title: "Loan Calculator", href: "/calculators/finance/loan", icon: <Wallet />, featured: true, type: 'calculator' },
              { title: "Investment / ROI", href: "/calculators/finance/investment", icon: <TrendingUp />, type: 'calculator' },
              { title: "Tax (GST/VAT)", href: "/calculators/finance/tax", icon: <Receipt />, type: 'calculator' },
              { title: "Retirement", href: "/calculators/finance/retirement", icon: <Umbrella />, type: 'calculator' },
              { title: "Currency", href: "/currency", icon: <Coins />, featured: true, type: 'converter' },
            ]}
          />

          {/* 3. Math & Stats (Orange) */}
          <BentoCard
            title="Math & Statistics"
            description="Solvers for algebra, geometry, and probability."
            icon={<FunctionSquare />}
            colorTheme="orange"
            items={[
              { title: "Percentage", href: "/calculators/math/percentage", icon: <Percent />, featured: true, type: 'calculator' },
              { title: "Statistics", href: "/calculators/math/statistics", icon: <Sigma />, type: 'calculator' },
              { title: "Algebra", href: "/calculators/math/algebra", icon: <FunctionSquare />, type: 'calculator' },
              { title: "Trigonometry", href: "/calculators/math/trigonometry", icon: <Triangle />, type: 'calculator' },
              { title: "Area & Volume", href: "/calculators/geometry/area", icon: <BoxSelect />, type: 'calculator' },
              { title: "Tip Splitter", href: "/calculators/math/tip", icon: <Banknote />, type: 'calculator' },
              { title: "Base Converter", href: "/calculators/math/base", icon: <Binary />, type: 'tool' },
            ]}
          />

          {/* 4. Science & Engineering (Purple) */}
          <BentoCard
            title="Science & Eng."
            description="Physics, Electronics, and Web Development."
            icon={<Zap />}
            colorTheme="purple"
            items={[
              { title: "Px to Rem", href: "/calculators/technology/px-to-rem", icon: <Code />, featured: true, type: 'calculator' },
              { title: "Ohm's Law", href: "/calculators/physics/ohms-law", icon: <Zap />, featured: true, type: 'calculator' },
              getUnitItem('pressure'),
              getUnitItem('power'),
              getUnitItem('energy'),
              getUnitItem('force'),
              getUnitItem('torque'),
              getUnitItem('voltage'),
            ]}
          />

          {/* 5. PDF Tools (Rose) - NEW */}
          <BentoCard
            title="PDF Tools"
            description="Merge, Split, and Compress documents securely."
            icon={<FileText />}
            colorTheme="rose"
            comingSoon={true}
            items={[
              { title: "Merge PDF", href: "#", icon: <Merge />, featured: true, type: 'tool' },
              { title: "Split PDF", href: "#", icon: <Scissors />, featured: true, type: 'tool' },
              { title: "Compress PDF", href: "#", icon: <Files />, featured: true, type: 'tool' },
              { title: "PDF to Word", href: "#", icon: <FileText />, type: 'tool' },
              { title: "Word to PDF", href: "#", icon: <FileText />, type: 'tool' },
              { title: "Sign PDF", href: "#", icon: <FileText />, type: 'tool' },
            ]}
          />

          {/* 6. Image Tools (Indigo) - NEW */}
          <BentoCard
            title="Image Tools"
            description="Crop, Resize, and Remove Backgrounds."
            icon={<ImageIcon />}
            colorTheme="blue"
            items={[
              { title: "Crop Image", href: "/tools/image/crop", icon: <Crop />, featured: true, type: 'tool' },
              { title: "Remove BG", href: "/tools/image/remove-bg", icon: <Eraser />, featured: true, type: 'tool' },
              { title: "Passport Photo", href: "/tools/image/passport", icon: <User />, featured: true, type: 'tool' },
              { title: "Convert to JPG", href: "/tools/image/converter", icon: <ImageIcon />, type: 'tool' },
              { title: "Compress Image", href: "/tools/image/converter", icon: <Minimize2 />, type: 'tool' },
              { title: "Studio Headshot", href: "/tools/image/headshot", icon: <User />, type: 'tool' },
            ]}
          />

        </BentoGrid>
      </div>
    </div>
  );
}
