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
  User,
  QrCode,
  Video,
  Mic,
  Braces,
  Code2,
  Shield
} from 'lucide-react';
import { unitDefinitions, UnitCategory } from '@/lib/units/definitions';
import { BentoGrid, BentoCard, BentoItem } from '@/components/BentoGrid';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

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

export default async function Home() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const isLocked = !user;

  // Helper to get unit item with instantiated icon
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
          {/* 1. Everyday Essentials (Blue) - Free */}
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

          {/* 2. PDF Tools (Rose) - LOCKED */}
          <BentoCard
            title="PDF Tools"
            description="Merge, Split, and Compress documents securely."
            icon={<FileText />}
            colorTheme="rose"
            locked={isLocked}
            items={[
              { title: "Merge PDF", href: "/tools/pdf/merge", icon: <Merge />, featured: true, type: 'tool' },
              { title: "Split PDF", href: "/tools/pdf/split", icon: <Scissors />, featured: true, type: 'tool' },
              { title: "Compress PDF", href: "/tools/pdf/compress", icon: <Files />, featured: true, type: 'tool' },
              { title: "PDF to Image", href: "/tools/pdf/pdf-to-image", icon: <ImageIcon />, type: 'tool' },
              { title: "Image to PDF", href: "/tools/pdf/image-to-pdf", icon: <ImageIcon />, type: 'tool' },
              { title: "Sign PDF", href: "/tools/pdf/sign", icon: <FileText />, type: 'tool' },
            ]}
          />

          {/* 3. Finance & Business (Emerald) - LOCKED */}
          <BentoCard
            title="Finance & Business"
            description="Crucial tools for mortgages, loans, and taxes."
            icon={<DollarSign />}
            colorTheme="emerald"
            locked={isLocked}
            items={[
              { title: "Mortgage Calc", href: "/calculators/finance/mortgage", icon: <DollarSign />, featured: true, type: 'calculator' },
              { title: "Loan Calculator", href: "/calculators/finance/loan", icon: <Wallet />, featured: true, type: 'calculator' },
              { title: "Investment / ROI", href: "/calculators/finance/investment", icon: <TrendingUp />, type: 'calculator' },
              { title: "Tax (GST/VAT)", href: "/calculators/finance/tax", icon: <Receipt />, type: 'calculator' },
              { title: "Retirement", href: "/calculators/finance/retirement", icon: <Umbrella />, type: 'calculator' },
              { title: "Currency", href: "/currency", icon: <Coins />, featured: true, type: 'converter' },
            ]}
          />

          {/* 4. Image Tools (Indigo) - Moderate Utility */}
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


          {/* 5. Developer Tools (Cyan) - Professional */}
          <BentoCard
            title="Developer Tools"
            description="Utilities for coding and data manipulation."
            icon={<Code2 />}
            colorTheme="purple"
            locked={isLocked}
            items={[
              { title: "JSON Formatter", href: "/tools/dev/json-formatter", icon: <Braces />, featured: true, type: 'tool' },
              { title: "QR Code Gen", href: "/tools/dev/qr-code", icon: <QrCode />, featured: true, type: 'tool' },
              { title: "JWT Debugger", href: "/tools/dev/jwt-debugger", icon: <Shield />, type: 'tool' },
              { title: "Base64 Conv.", href: "/tools/dev/base64", icon: <Binary />, type: 'tool' },
            ]}
          />

          {/* 6. Math & Statistics (Orange) - Academic/Niche */}
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


          {/* Credit/Creator Studio (Rose) - New */}
          <BentoCard
            title="Creator Studio"
            description="Tools for YouTubers and Content Creators."
            icon={<Video />}
            colorTheme="rose"
            items={[
              { title: "Thumbnail Grabber", href: "/tools/creator/thumbnail", icon: <ImageIcon />, featured: true, type: 'tool' },
              { title: "Video Trimmer", href: "/tools/creator/trimmer", icon: <Video />, featured: true, type: 'tool' }, // New!
              { title: "Audio Extractor", href: "#", icon: <Mic />, type: 'other' }, // Coming Soon
            ]}
          />

          {/* 7. Science & Engineering (Purple) - Niche */}
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

        </BentoGrid>
      </div>
    </div>
  );
}
