/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, DiyProject } from '../types';

export const CATEGORIES = [
  'All Departments',
  'Power Tools',
  'Hand Tools',
  'Fasteners & Hardware',
  'Electrical & Lighting',
  'Plumbing',
  'Paint & Building'
] as const;

export const PRODUCTS: Product[] = [
  // POWER TOOLS
  {
    id: 'p-drill-18v',
    name: '18V Brushless Compact Drill & Driver Kit',
    category: 'Power Tools',
    brand: 'DeWalt',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 342,
    description: 'High-performance brushless motor delivers up to 550 in-lbs of torque. Features compact, lightweight ergonomics to fit easily into tight workspaces.',
    iconName: 'Wrench',
    specs: {
      'Voltage': '18V',
      'Motor Type': 'Brushless (Long Life)',
      'Max Torque': '550 in-lbs',
      'No Load Speed': '0-500 / 0-1,750 RPM',
      'Chuck Size': '1/2 in. Keyless Metal',
      'Weight': '3.4 lbs'
    },
    stock: 14,
    maxStock: 25,
    features: [
      '2-speed transmission for custom drilling & driving speed control',
      'Built-in high-output LED light with 20-second delay for low visibility',
      'All-metal ratcheting chuck for superior bit retention strength'
    ],
    usageTips: [
      'Always secure your workpiece with clamps before drilling.',
      'Use lower speeds for high-resistance metal drilling, and high speeds for wood.',
      'Charge battery fully before its first heavy application.'
    ]
  },
  {
    id: 'p-saw-circ',
    name: '7-1/4 in. Corded Circular Saw with Laser Guide',
    category: 'Power Tools',
    brand: 'Makita',
    imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewsCount: 198,
    description: 'A powerful pro-grade saw featuring a 15-Amp motor and integrated red laser line pointer for rip-cutting or cross-cutting layouts.',
    iconName: 'Wrench',
    specs: {
      'Amperage': '15 Amps',
      'Blade Diameter': '7-1/4 in. (184mm)',
      'Max Cut Depth at 90°': '2-7/16 in.',
      'Max Cut Depth at 45°': '1-7/8 in.',
      'Bevel Capacity': '50°',
      'Weight': '9.5 lbs'
    },
    stock: 6,
    maxStock: 15,
    features: [
      'In-line laser line guide for high-accuracy laser-straight cuts',
      'Heavy-duty magnesium base plate for lightweight durability and control',
      'Easy bevel adjustment levers for quick chamfered angle tuning'
    ],
    usageTips: [
      'Keep your saw blade sharpened; dull blades drag the motor and cause splintering.',
      'Ensure the guard retracts freely before connecting to power.',
      'Wear double ear and eye protection during heavy lumber milling.'
    ]
  },
  {
    id: 'p-sander-orb',
    name: '5-inch Random Orbital Palm Sander',
    category: 'Power Tools',
    brand: 'Bosch',
    imageUrl: 'https://images.unsplash.com/photo-1621008061266-932fbb48cd9b?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 115,
    description: 'Delivers fast, smooth swirl-free wood finishes. Engineered with variable speed dial control and a highly effective through-the-pad dust collection bag.',
    iconName: 'Wrench',
    specs: {
      'Amperage': '3.0 Amps',
      'Pad Size': '5 in. Hook-and-Loop',
      'Orbit Speed': '8,000 - 12,000 OPM',
      'Orbit Diameter': '3/32 in.',
      'Dust Port': '1-1/4 in. Standard',
      'Weight': '2.9 lbs'
    },
    stock: 3,
    maxStock: 20,
    features: [
      'Electronic speed selector allows match of OPM to fine wood or plastics',
      'Dust-sealed toggled power switch guarantees interior electronic safety',
      'Anti-vibration ribbed rubber overlay pads reduce hand fatigue'
    ],
    usageTips: [
      'Do not apply heavy downward force; let the tool\'s orbit work naturally.',
      'Keep the sander flat on the surface; tipping the tool creates localized divots.',
      'Empty the dust collection chamber when it reaches half-full to preserve suction.'
    ]
  },

  // HAND TOOLS
  {
    id: 'h-hammer-prof',
    name: '16 oz. Straight Claw Rip Steel Hammer',
    category: 'Hand Tools',
    brand: 'Estwing',
    imageUrl: 'https://images.unsplash.com/photo-1586864387789-628af9face72?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 289,
    description: 'Forged from one solid piece of premium tool steel for maximum striking leverage. Features an anti-vibration rubber grip that reduces recoil shock by up to 70%.',
    iconName: 'Hammer',
    specs: {
      'Head Weight': '16 oz.',
      'Material': 'Single-piece Forged Alloy Steel',
      'Handle Type': 'Ergonomic Shock-Reduction Grip',
      'Claw Style': 'Straight (Rip Claw)',
      'Overall Length': '13 in.'
    },
    stock: 22,
    maxStock: 30,
    features: [
      'Integrated magnetic nail starter groove for quick one-handed nail sets',
      'Balanced design translates minimal effort into high-velocity strikes',
      'Straight claw maximizes prying torque for framing and teardowns'
    ],
    usageTips: [
      'Hold the grip firmly near the base for optimal leverage and control.',
      'The straight claw is ideal for heavy boards prying or joist disassembly.',
      'Wipe down after outdoor water exposure with an oiled cloth to prevent rust.'
    ]
  },
  {
    id: 'h-screwdriver-set',
    name: 'Premium 22-Piece Magnetic Screwdriver Set',
    category: 'Hand Tools',
    brand: 'Klein Tools',
    imageUrl: 'https://images.unsplash.com/photo-1581147036324-c10b7f8c09d5?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewsCount: 147,
    description: 'Includes 10 professional screwdrivers, 10 precision mini-drivers, and 2-in-1 magnetizer tool. Perfect for home projects, electronics, and automotive use.',
    iconName: 'Wrench',
    specs: {
      'Shaft Material': 'Chrome Vanadium Steel (S2 Grade)',
      'Tip Types': 'Phillips, Slotted, Torx, Square (Robertson)',
      'Grip': 'Ergonomic Tri-Lobe Polycarbonate & Rubber',
      'Rust Protection': 'Black Phosphate Coated Tips'
    },
    stock: 18,
    maxStock: 40,
    features: [
      'S2 steel tips forged for exact fastener fits to minimize head stripping',
      'Color-coded handles instantly identify Phillips vs. Flathead drivers',
      'Molded wall hanging stand included for optimal garage organization'
    ],
    usageTips: [
      'Ensure the screwdriver tip matches the fastener exactly to avoid cam-out.',
      'Avoid using drivers as improvised pry bars or scrapers.',
      'Use the magnetizer block to recharge a tip\'s pick-up pull strength.'
    ]
  },
  {
    id: 'h-level-magn',
    name: '24 in. Heavy-Duty Aluminum Magnetic Box Level',
    category: 'Hand Tools',
    brand: 'Stanley',
    imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 92,
    description: 'Reinforced cast aluminum frame with precise acrylic block vials for checking level, plumb, and 45-degree angles. Features continuous Rare-Earth magnetic strip.',
    iconName: 'Hammer',
    specs: {
      'Frame Material': 'Aircraft-grade Box Aluminum',
      'Length': '24 in.',
      'Precision': '0.0005 in./in. (0.5mm/m)',
      'Vials': '3 (Level, Plumb, 45°)',
      'Magnets': 'Continuous Rare-Earth Magnetic Base'
    },
    stock: 9,
    maxStock: 15,
    features: [
      'Continuous magnetic bottom holds securely to steel conduit, studs, or piping',
      'Shock-absorbing rubber end caps guard accuracy during ladder drops',
      'Surrounding ergonomic grab ports handle easily under messy conditions'
    ],
    usageTips: [
      'Check level calibration by taking a reading, rotating the level 180° on the same spot, and comparing the bubble position.',
      'Keep the measuring surface clean of cement slurry or paint grit.'
    ]
  },

  // FASTENERS & HARDWARE
  {
    id: 'f-screws-wood',
    name: 'Premium Performance Wood Screws #8 x 2-1/2 in.',
    category: 'Fasteners & Hardware',
    brand: 'Grip-Rite',
    imageUrl: 'https://images.unsplash.com/photo-1582260655866-51f67fceba01?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 156,
    description: 'Advanced yellow-zinc wood screws featuring star-drive T25 heads, quick-start sharp points, and coarse thread cuts. Standard box of 100 loose screws.',
    iconName: 'Grid',
    specs: {
      'Screw Size': '#8',
      'Length': '2-1/2 in.',
      'Head Type': 'T25 Star Drive (Torx)',
      'Material': 'Hardened Carbon Steel, Yellow Zinc Coated',
      'Thread': 'Coarse, Knurled Shoulder',
      'Pack Quantity': '100 Screws'
    },
    stock: 45,
    maxStock: 60,
    features: [
      'Star drive design distributes driving shear force evenly to eliminate stripping',
      'Self-countersinking flat ribs finish beautiful and flush in softwood or oak',
      'Coarse threads grip deep fibers to deliver immense pull-out tension resistance'
    ],
    usageTips: [
      'While self-drilling, pre-drilling a pilot hole near board ends prevents swelling/splitting.',
      'A T25 bit is included inside this retail box. Store it securely with your bits.',
      'Not recommended for treated outdoor cedar (use stainless steel fasteners instead).'
    ]
  },
  {
    id: 'f-anchors-wall',
    name: 'Self-Drilling Nylon Drywall Anchors with Screws',
    category: 'Fasteners & Hardware',
    brand: 'E-Z Ancor',
    imageUrl: 'https://images.unsplash.com/photo-1614051052608-2c26f0f5b902?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewsCount: 78,
    description: 'No-drill wall anchors. Heavy-duty self-tapping screw threads peel plaster/drywall away internally to build 50-lb load ratings. Combo Pack of 50 sets.',
    iconName: 'Grid',
    specs: {
      'Anchor Material': 'High-strength Nylon Glass-Fiber',
      'Capacity': '50 lbs per anchor (in 1/2" drywall)',
      'Screw Material': 'Carbon Steel, Zinc Plated',
      'Quantity': '50 Anchors + 50 Screws'
    },
    stock: 31,
    maxStock: 50,
    features: [
      'Requires absolutely no prior drill bit preparation; installs with a screwdriver head',
      'Deep external helical thread grips plasterboard tightly without core failure',
      'Backs out cleanly if mounting layouts need revision.'
    ],
    usageTips: [
      'Use a manual hand screwdriver to set anchors to avoid high-torque spinning.',
      'Ensure there are no underlying electrical cables or plumbing pipes in the wall bay.'
    ]
  },

  // ELECTRICAL
  {
    id: 'e-multimeter',
    name: 'Digital Clamp Multimeter & Tester',
    category: 'Electrical & Lighting',
    brand: 'Fluke',
    imageUrl: 'https://images.unsplash.com/photo-1582260714777-628d052dcb8d?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewsCount: 88,
    description: 'Measures AC Current (via jaw clamp), AC/DC Voltage, Resistance, and Continuity. Large backlit digital display. Safety rated CAT III 600V.',
    iconName: 'Activity',
    specs: {
      'Display Output': '2000 Counts Backlit LCD',
      'AC Current Range': '2A to 400A (via clamp)',
      'Voltage Range': 'AC to 600V, DC to 600V',
      'Jaw Opening Size': '1.1 inches max',
      'Safety Standard': 'CAT III 600V'
    },
    stock: 8,
    maxStock: 12,
    features: [
      'Non-Contact AC Voltage detection built into top sensor with visual red LED',
      'Continuity buzzer checks fuses, wiring lines, and board leads in seconds',
      'Includes silicon test leads, safety carrying case, and pre-packaged batteries'
    ],
    usageTips: [
      'Always test your multimeter on a known live voltage source first before trusting its reading.',
      'Turn off circuit power before measuring resistance; static residual current ruins calculations.',
      'Do not clamp around multiple cables; isolate the single hot wire you want to check.'
    ]
  },
  {
    id: 'e-cord-out',
    name: '50 ft. 12/3 Heavy-Duty SJTW Extension Cord',
    category: 'Electrical & Lighting',
    brand: 'Southwire',
    imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 174,
    description: 'Engineered for outdoor pro applications, landscaping, and job site power equipment. Rugged waterproof jacket protects against abrasions and oil splashes.',
    iconName: 'BatteryCharging',
    specs: {
      'Length': '50 ft.',
      'Wire Gauge': '12 AWG (Heavy Duty)',
      'Conductors': '3 (Grounded)',
      'Jacket Type': 'SJTW Weather-Resistant',
      'Rating': '15 Amps, 125V, 1875W Max'
    },
    stock: 12,
    maxStock: 25,
    features: [
      'Molded end socket features built-in clear light displaying when line has power',
      'Highly flexible vinyl jacket shrugs off severe ambient cold temperatures down to -40°F',
      'Heavy-forged solid brass prongs prevent cable pull failures'
    ],
    usageTips: [
      'Uncoil fully before heavy power load use to prevent internal heat coils.',
      'Check the cord for split outer jackets before every job site layout.',
      'Store indoors when not in use to prolong jacket life.'
    ]
  },

  // PLUMBING
  {
    id: 'pl-wrench-pipe',
    name: '14 in. Heavy-Duty Cast Iron Pipe Wrench',
    category: 'Plumbing',
    brand: 'RIDGID',
    imageUrl: 'https://images.unsplash.com/photo-1582260682285-b1ab1d9230ee?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 135,
    description: 'Cast iron handle with full floating forged hook jaw. Features self-cleaning threads, non-stick adjustment spiral nut, and easily replaceable grip teeth.',
    iconName: 'Wrench',
    specs: {
      'Length': '14 in.',
      'Max Jaw Capacity': '2.0 in. Outer Diameter',
      'Body Material': 'Cast Iron Housing',
      'Jaw Material': 'Hardened Alloy Steel Teeth',
      'Weight': '3.2 lbs'
    },
    stock: 5,
    maxStock: 15,
    features: [
      'Spring-loaded hook jaw provides immediate grip and ratcheting release action',
      'Extremely durable I-beam profile handles highest torque loads securely',
      'Integrated scale indicates sizing reference instantly on metal pipe stocks'
    ],
    usageTips: [
      'Always position the wrench pulling direction so the jaw mouth closes tighter.',
      'Leave a small clearance gap between the pipe and the crook of the hook jaw for ideal teeth bite.',
      'Avoid using handle extenders (cheater bars) which can fold or snap the cast iron.'
    ]
  },
  {
    id: 'pl-tape-teflon',
    name: 'Premium Teflon Thread Seal Tape (4-Pack)',
    category: 'Plumbing',
    brand: 'Oatey',
    imageUrl: 'https://images.unsplash.com/photo-1585435421671-0c159296ddde?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 201,
    description: 'Standard industrial grade PTFE thread wrapping tape. For leakproof seals on water pipes, sprinkler fittings, shower arms, and threaded gas pipelines.',
    iconName: 'Droplet',
    specs: {
      'Material': 'Polytetrafluoroethylene (PTFE)',
      'Width': '1/2 in.',
      'Length': '520 in. (per roll)',
      'Thickness': '3.5 mil',
      'Pack Quantity': '4 Rolls'
    },
    stock: 58,
    maxStock: 100,
    features: [
      'Non-stick formula resists setting, binding, or thread seize over years of use',
      'Chemically immune to acids, alkalies, and solvents; temperature rated down to -400°F',
      'Permits clean, rapid dismantling weeks or years after original joint assembly'
    ],
    usageTips: [
      'Wrap clockwise around male pipe threads (the direction of tightening). Wrapping backwards unravels tape as you screw the fittings together.',
      'Keep tape flat under slight tension as you wrap; coverage of 3 to 5 layers is typically perfect.'
    ]
  },

  // PAINT & BUILDING Materials
  {
    id: 'pb-brush-sash',
    name: '3 in. Pro-Grade Angle Sash Paint Brush',
    category: 'Paint & Building',
    brand: 'Purdy',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewsCount: 94,
    description: 'Fitted with premium thick synthetic blend filaments designed to carry extra paint cargo and lay it down with high precision. Thick wood handles.',
    iconName: 'Paintbrush',
    specs: {
      'Brush Width': '3 in.',
      'Filament Type': 'Synthetic Poly-Nylon Blend',
      'Chisel/Edge': 'Angled Sash Trim',
      'Handle Style': 'Solid Beechwood Fluted Style',
      'Best Suited For': 'Latex & Acrylic Paints'
    },
    stock: 25,
    maxStock: 35,
    features: [
      'Chiseled trim edge delivers sharp, professional cutting lines near mold joints',
      'Reinforced stainless steel rust-free ferrule grips individual bristles tightly',
      'Thick reservoir blend minimizes paint drips and maximizes smooth coatings'
    ],
    usageTips: [
      'Dampen artificial fibers slightly with clear water before latex paints to make wash-up simpler.',
      'Dip only the bottom 1/3 to 1/2 of your sash bristles into the paint can; overloading triggers messy handle overflows.',
      'Clean brush immediately after paint sessions. Hang bristles down to dry.'
    ]
  },
  {
    id: 'pb-tarp-heavy',
    name: '10 x 12 ft. Premium Heavy-Duty Waterproof Tarp',
    category: 'Paint & Building',
    brand: 'EverBilt',
    imageUrl: 'https://images.unsplash.com/photo-1534067160754-07d2e0f4949a?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 165,
    description: 'Tightly woven thick polyethylene fibers laminated on both sides. Formulated with reinforced corners, heat-sealed rope hems, and rust-free metal grommets.',
    iconName: 'Grid',
    specs: {
      'Dimensions': '10 ft. x 12 ft.',
      'Thickness': '10 mil',
      'Mesh Count': '14 x 14 weave per sq. in.',
      'Grommet Spacing': 'Every 18 inches',
      'Material': 'UV-Resistant Dual-Coated Poly'
    },
    stock: 14,
    maxStock: 30,
    features: [
      'Silver reflective top deflects light and UV rays; dark brown bottom side stays stealthy',
      'Reinforced plastic reinforced corner bars shrug off heavy wind-tension stress',
      'Completely water-tight coating is perfect for woodpiles, vehicles, and roofs'
    ],
    usageTips: [
      'Avoid sharp metal edges or dragging on rough gravel blocks under weight.',
      'Tarp measurements are "cut size". The finished hem dimensions may run 2-3 inches shorter.',
      'To secure, use flexible bungee cords instead of stiff steel cables to protect grommets from ripping.'
    ]
  }
];

export const DIY_PROJECTS: DiyProject[] = [
  {
    id: 'proj-planter',
    name: 'Solid Wooden Garden Planter Box',
    description: 'Build a durable, rustic cedar or pressure-treated rectangular box planter for homegrown herbs, flowers, or garden beds.',
    difficulty: 'Beginner',
    timeNeeded: '2 - 3 Hours',
    requiredItems: ['p-saw-circ', 'p-drill-18v', 'f-screws-wood', 'pb-tarp-heavy'],
    steps: [
      'Cut four boards for the sides (e.g., 2ft length) and two short ends (e.g., 1.5ft) using your corded Circular Saw.',
      'Lay a protective tarp down to collect sawdust. Sand all cut edges using a medium grit orbital block sander.',
      'Pre-drill pilot holes using the 18V Brushless Drill near board corners to avoid splitting.',
      'Use performance wood screws to secure the end panels between the side panels, forming a basic box frame.',
      'Fit and screw bottom slats inside the box frame, and drill 4-5 small holes in the bottom boards to allow proper soil drainage.'
    ],
    instructions: 'A classic DIY weekend wood build. Highly rewarding way to learn straight saw milling, face alignment, and structural screw joints.'
  },
  {
    id: 'proj-leak',
    name: 'Fixing a Threaded Metal Joint or Faucet Pipe',
    description: 'Diagnose leak points in standard household connection points, strip obsolete tape, and assemble secure waterproof joints.',
    difficulty: 'Intermediate',
    timeNeeded: '30 mins - 1 Hour',
    requiredItems: ['pl-wrench-pipe', 'pl-tape-teflon'],
    steps: [
      'Locate and shut off the primary mains water valve before work starts.',
      'Use the heavy-duty Pipe Wrench to firmly rotate the old joint counterclockwise, taking care not to wrap the copper line out of shape.',
      'Scrape the male threads clean of old scale, corrosion, or old deteriorated materials.',
      'Take the Teflon/PTFE Thread Seal tape, wrap it flat around male threads clockwise for 4-5 solid revolutions under slight tension.',
      'Thread the joint back into position by hand, then lock and cinch the joint tight using the Pipe Wrench. Open the main water line and inspect.'
    ],
    instructions: 'Plumbing threads carry clean liquid under constant PSI. Applying seals in the correct direction is the secret to bulletproof leak fixes.'
  },
  {
    id: 'proj-shelf',
    name: 'Heavy Floating Stud Shelf Mount',
    description: 'Learn the core principles of using levels and heavy glass-fiber self-tapping drywall or stud anchors to mount floating steel/wood shelves.',
    difficulty: 'Beginner',
    timeNeeded: '45 Mins',
    requiredItems: ['h-screwdriver-set', 'h-level-magn', 'f-anchors-wall', 'p-drill-18v'],
    steps: [
      'Decide your ideal shelf wall layout. Keep away from internal wire conduits.',
      'Align the shelf template, place the 24" Aluminum Magnetic Level flat on top, and level the plane until the center vial bubble sits precisely between lines.',
      'Mark the screw positions with a pencil.',
      'Take your self-drilling heavy-duty nylon anchors. Pressing into marked drywall sheet points, turn clockwise using a manual hand screwdriver or drill slowly until the anchor is completely flush with paper.',
      'Match the shelf metal brackets over the anchor holes, and thread the carbon steel structural screws directly through brackets into the nylon cores.'
    ],
    instructions: 'Never rely on friction or cardboard core hooks for heavy shelves! Anchors guarantee stability and home safety.'
  }
];

// Formulas and calculators definitions
export interface CalculationResult {
  itemName: string;
  qtyNeeded: number;
  explanation: string;
  primaryProductId: string;
}

export const EST_PROJECTS = {
  PAINTING: 'Painting a Room (Walls/Trim)',
  DECKING: 'Building a Wooden Deck Platform',
  DRYWALL: 'Drywall Repair or Stud Anchoring'
} as const;

export function calculateProjectMaterials(
  projectType: keyof typeof EST_PROJECTS,
  inputs: { width: number; length: number; height?: number; units: 'feet' | 'meters' }
): { items: CalculationResult[]; message: string } {
  const coeff = inputs.units === 'meters' ? 3.28084 : 1.0; // convert meters variables to feet equivalents if needed
  const wFeet = inputs.width * coeff;
  const lFeet = inputs.length * coeff;
  const hFeet = (inputs.height || 8.0) * coeff;

  const results: CalculationResult[] = [];
  let summaryText = '';

  if (projectType === 'PAINTING') {
    // Wall surface area: perimeter x height
    const perimeter = 2 * (wFeet + lFeet);
    const wallArea = perimeter * hFeet;
    // Paint coverage (approx 350 sq ft per gallon for single coat, we recommend 2 coats)
    const totalAreaToPaint = wallArea * 2;
    const gallonsNeeded = Math.ceil(totalAreaToPaint / 350);
    
    // We recommend brush and tarps
    results.push({
      itemName: '3 in. Pro-Grade Angle Sash Paint Brush',
      qtyNeeded: 1,
      explanation: `For detailed edge cutting. One brush covers ${wallArea.toFixed(0)} sq ft of walls.`,
      primaryProductId: 'pb-brush-sash'
    });
    results.push({
      itemName: 'Heavy-Duty Waterproof Tarp (10x12 ft)',
      qtyNeeded: Math.max(1, Math.ceil((wFeet * lFeet) / 120)),
      explanation: 'To protect floors, trims, and wooden furniture items from paint splatter.',
      primaryProductId: 'pb-tarp-heavy'
    });

    summaryText = `An estimated ${wallArea.toFixed(0)} sq ft of wall surface needs covering. A recommended double coat (${totalAreaToPaint.toFixed(0)} sq ft total) requires approximately ${gallonsNeeded} gallon(s) of paint. We've added premium brushes and protective tarps below.`;
  }
  else if (projectType === 'DECKING') {
    // 2-1/2 wood screws estimate: about 350 screws for a standard 10x12 deck
    const area = wFeet * lFeet;
    // Rule of thumb: around 3.5 screws per square foot of deck surface
    const totalScrews = Math.ceil(area * 3.5);
    const boxesNeeded = Math.ceil(totalScrews / 100); // 100 per box

    results.push({
      itemName: '#8 x 2-1/2 in. Performance Wood Screws (Box of 100)',
      qtyNeeded: boxesNeeded,
      explanation: `Calculated for a ${wFeet.toFixed(0)}x${lFeet.toFixed(0)} ft (${area.toFixed(0)} sq ft) deck. Estimated ${totalScrews} screws total needed to tie decking boards.`,
      primaryProductId: 'f-screws-wood'
    });
    results.push({
      itemName: '18V Brushless Compact Drill & Driver Kit',
      qtyNeeded: 1,
      explanation: 'Required to pre-drill board pilot holes and drive hundreds of star wood screws without battery fade.',
      primaryProductId: 'p-drill-18v'
    });
    results.push({
      itemName: '7-1/4 in. Circular Saw with Laser Guide',
      qtyNeeded: 1,
      explanation: 'Indispensable tool to square and rip deck lumber stocks to sizing requirements.',
      primaryProductId: 'p-saw-circ'
    });
    results.push({
      itemName: '24 in. Box Level with Magnetic Base',
      qtyNeeded: 1,
      explanation: 'Required to verify framing joist levels and support beam grades correctly.',
      primaryProductId: 'h-level-magn'
    });

    summaryText = `For a ${wFeet.toFixed(0)}x${lFeet.toFixed(0)} ft structural deck deck platform (~${area.toFixed(0)} sq ft), we calculate a fastener payload of ${totalScrews} wood screws along with heavy framing power saws, level guides, and drill kits.`;
  }
  else if (projectType === 'DRYWALL') {
    const area = wFeet * lFeet; // wall or surface area
    // Anchors needed: usually 1 anchor every 16 or 24 inches for studs, or based on layouts
    const anchorQty = Math.max(20, Math.ceil(area / 10)); // rough estimate
    const anchorPacks = Math.ceil(anchorQty / 50);

    results.push({
      itemName: 'Drywall Anchors with Screws (Combo Pack of 50 Sets)',
      qtyNeeded: Math.max(1, anchorPacks),
      explanation: `To safely secure steel mount hooks, studs, or accessories. Highly load rated.`,
      primaryProductId: 'f-anchors-wall'
    });
    results.push({
      itemName: '22-Piece Premium Magnetic Screwdriver Set',
      qtyNeeded: 1,
      explanation: 'To align with various tip sizes (Phillips/Flat) and hand-drive anchors with feedback control without paper strip damage.',
      primaryProductId: 'h-screwdriver-set'
    });
    results.push({
      itemName: '24 in. Aluminum Magnetic Level',
      qtyNeeded: 1,
      explanation: 'To align and keep multi-point mounting positions fully plumb and straight.',
      primaryProductId: 'h-level-magn'
    });

    summaryText = `Drywall mounting and stud anchoring projects demand reliable levels to avoid angled mounts and premium fiber-glass reinforced self-drilling anchors to secure structural tension loads up to 50 lbs.`;
  }

  return { items: results, message: summaryText };
}
