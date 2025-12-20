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
  // PiggyBank, // Removed unused
  Wallet,
  FunctionSquare,
  Triangle,
  Sigma,
  BoxSelect,
  // Box, // Removed unused
  Binary,
  // Hash, // Removed unused
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
  Mic,
  Crop,
  //   Maximize2, // Removed
  Minimize2,
  Eraser,
  //   Sparkles, // Removed
  User,
  QrCode,
  Video,
  Braces,
  Code2,
  Shield,
  Wand2,
  Music,
  Split,
  PenTool,
  BookOpen
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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UnitMaster - The All-in-One Unit Converter & Digital Toolkit',
  description: 'Free online Unit Converter, Financial Calculators, PDF Tools, and Developer Utilities. Professional, privacy-first, and ad-free.',
  keywords: ['unit converter', 'pdf tools', 'financial calculator', 'developer tools', 'json formatter', 'video trimmer'],
  alternates: {
    canonical: 'https://unitmaster.io',
  },
};

export default function Home() {
  // Performance Optimization: Removed server-side auth check.
  // The homepage should be static/fast since we don't lock cards here anymore.
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // const isLocked = !user; 
  const isLocked = false; // Always "unlocked" on homepage to show all tools


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

          {/* 2. PDF Tools (Rose) - UNLOCKED */}
          <BentoCard
            title="PDF Tools"
            description="Merge, Split, and Compress documents securely."
            icon={<FileText />}
            colorTheme="rose"
            items={[
              { title: 'Merge PDF', href: '/tools/pdf/merge', icon: <Files className="w-full h-full" />, featured: true, type: 'tool' },
              { title: 'Split PDF', href: '/tools/pdf/split', icon: <Scissors className="w-full h-full" />, featured: true, type: 'tool' },
              { title: 'Sign PDF', href: '/tools/pdf/sign', icon: <PenTool className="w-full h-full" />, featured: true, type: 'tool' },
              { title: 'Compress PDF', href: '/tools/pdf/compress', icon: <Minimize2 className="w-full h-full" />, type: 'tool' },
              { title: 'Any to PDF', href: '/document/any-to-pdf', type: 'converter' },
              { title: 'PDF to Word', href: '/document/pdf-to-word', type: 'converter' },
              { title: 'PDF to Excel', href: '/document/pdf-to-xlsx', type: 'converter' },
              { title: 'PDF to JPG', href: '/document/pdf-to-jpg', type: 'converter' },
            ]}
          />

          {/* 3. Finance & Business (Emerald) - UNLOCKED */}
          <BentoCard
            title="Finance & Business"
            description="Professional Suite: Real-Time Rates, PDF Reports & Analysis."
            icon={<DollarSign />}
            colorTheme="emerald"
            items={[
              { title: "Mortgage (Pro)", href: "/calculators/finance/mortgage", icon: <DollarSign />, featured: true, type: 'calculator' },
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
              { title: "Image Converter", href: "/tools/image/converter", icon: <ImageIcon />, type: 'tool' },
              { title: "Compress Image", href: "/tools/image/converter", icon: <Minimize2 />, type: 'tool' },
              { title: "Studio Headshot", href: "/tools/image/headshot", icon: <User />, type: 'tool' },
            ]}
          />


          {/* 5. Developer Tools (Cyan) - UNLOCKED */}
          <BentoCard
            title="Developer Tools"
            description="Utilities for coding and data manipulation."
            icon={<Code2 />}
            colorTheme="purple"
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
              { title: "Video Trimmer", href: "/tools/creator/trimmer", icon: <Video />, featured: true, type: 'tool' },
              { title: "Voice Changer", href: "/tools/creator/voice-changer", icon: <Wand2 className="h-4 w-4 text-purple-500" />, type: 'tool' },
              { title: "Audio Mixer", href: "/tools/creator/audio-mixer", icon: <Music className="h-4 w-4 text-pink-500" />, type: 'tool' }, // New!
              { title: "Audio Extractor", href: "/tools/creator/audio-extractor", icon: <Mic />, type: 'tool' },
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
