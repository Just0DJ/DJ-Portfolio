// Central content registry: skills, achievements, site metadata.
// Adding or editing portfolio content happens here (data only, no markup changes).

export interface SkillCategory {
  id: string;
  title: string;
  level: string;
  levelPercent: number;
  list: string[];
  details: { heading: string; body: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  role: string;
  rank: string;
  details: { heading: string; body: string }[];
}

export const skills: SkillCategory[] = [
  {
    id: 'skill_cad',
    title: 'CAD & Mechanical Design',
    level: 'Advanced',
    levelPercent: 85,
    list: ['SolidWorks (Part, Assembly, Motion, Sheet Metal)', 'Autodesk Fusion 360', 'Siemens NX', 'AutoCAD', 'Rhinoceros 3D', 'Onshape'],
    details: [
      { heading: 'SolidWorks', body: 'Primary CAD tool: part, assembly, motion and sheet-metal workflows. Used for rocker-bogie suspension kinematics validation in SolidWorks Motion, science cache design with full BOMs, and production-grade IoT enclosure modeling to injection molding and sheet-metal DFM tolerances.' },
      { heading: 'Autodesk Fusion 360 & Siemens NX', body: 'Fusion 360 for rapid design iteration and prototyping of IoT enclosures and research hardware. Siemens NX for volumetric clearance and spatial constraint analyses on ASML photolithography tool layouts, maintenance accessibility, and safety clearances.' },
      { heading: 'AutoCAD · Rhinoceros 3D · Onshape', body: '2D drafting and technical drawings for manufacturing documentation; Rhino for freeform surfacing; Onshape for cloud-collaborative team CAD workflows.' },
    ],
  },
  {
    id: 'skill_simulation',
    title: 'Simulation & Analysis',
    level: 'Intermediate',
    levelPercent: 60,
    list: ['ANSYS (Static Structural, Transient Thermal)', 'CFD Fundamentals', 'Kinematic Analysis'],
    details: [
      { heading: 'ANSYS', body: 'Static Structural and Steady-State/Transient Thermal simulations. Executed transient thermal FEA alongside calibrated infrared thermography to model heat dissipation across lithium-ion cell packs under variable C-rate discharge; ran structural stress-concentration studies for the EEG headband to prevent plastic deformation during repeated donning cycles.' },
      { heading: 'CFD & Kinematics', body: 'CFD fundamentals for thermal management and airflow analysis. Kinematic and multi-body dynamics analysis (SolidWorks Motion) validating rocker-bogie articulation, ground clearance, and dynamic stability.' },
    ],
  },
  {
    id: 'skill_programming',
    title: 'Programming & Computation',
    level: 'Intermediate',
    levelPercent: 60,
    list: ['MATLAB', 'Simulink', 'Python (NumPy, Pandas)', 'C/C++', 'MySQL'],
    details: [
      { heading: 'MATLAB & Simulink', body: 'Engineered an automated Chemical Process Data (CPD) parsing pipeline at Tech Mahindra (ASML) monitoring production telemetry to accelerate defect-detection review cycles. Simulink for digital-twin behavioral modeling.' },
      { heading: 'Python (NumPy, Pandas) & C/C++', body: 'Python anomaly-detection scripts mapping vibration and thermal telemetry against baseline thresholds for the digital-twin framework. Embedded C/C++ firmware modules interfacing sensor arrays with edge-processing hardware at REConnect Energy.' },
      { heading: 'MySQL', body: 'Relational data organization and querying for telemetry storage and project data management.' },
    ],
  },
  {
    id: 'skill_manufacturing',
    title: 'Manufacturing & Prototyping',
    level: 'Advanced',
    levelPercent: 80,
    list: ['Additive Manufacturing (FDM, SLA)', 'CNC Machining', 'Laser Cutting', 'GD&T', 'DfAM'],
    details: [
      { heading: 'Additive Manufacturing', body: 'FDM and SLA printing for competition rovers and research hardware: fabricated the Science Cache prototype (PLA) with iterative dust-sealing improvements, 3D-printed weather-sealed enclosures for the smart window, and V1–V3 headband generations with snap-fit sensor brackets.' },
      { heading: 'CNC, Laser Cutting, GD&T & DfAM', body: 'CNC machining for precision competition parts, laser cutting for fixtures and panels, GD&T for production drawings, and Design for Additive Manufacturing principles applied across prototyping workflows.' },
    ],
  },
  {
    id: 'skill_domains',
    title: 'Core Domains',
    level: 'Advanced',
    levelPercent: 80,
    list: ['Robotics & Mechanisms', 'Semiconductor Tooling Workflows', 'Digital Twins', 'Electromechanical Packaging', 'Battery Thermal Management'],
    details: [
      { heading: 'Robotics & Mechanisms', body: 'Rocker-bogie suspension design, 6-DoF manipulator integration, indexing carousel mechanisms, and field maintenance across three international rover competitions (ERC/IRC).' },
      { heading: 'Semiconductor Tooling', body: 'High-throughput semiconductor processing machinery workflows at 1,000+ units/minute under cleanroom process control, with volumetric clearance analysis in Siemens NX.' },
      { heading: 'Digital Twins & Battery Thermal Management', body: 'Predictive-maintenance digital twin framework coupling sensor streams with SolidWorks/ANSYS models. Lithium-ion pack thermal characterization via transient FEA and infrared thermography.' },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: 'ach_1',
    title: 'European Rover Challenge (ERC) Remote 2025',
    role: 'Mechanical Design Engineer',
    rank: '4th Globally · Field of 50+ international teams',
    details: [
      { heading: 'The Challenge', body: "One of the world's toughest remote robotics competitions, judged on rover design, science operations, and mission execution. Ranked 4th globally." },
      { heading: 'My Contribution', body: 'I focused on the rapid repair and maintenance of the rover during the competition. I also designed the modular mounting system that allowed us to swap payloads (drill vs. arm) in under 5 minutes, which was critical for meeting tight competition deadlines.' },
    ],
  },
  {
    id: 'ach_2',
    title: 'International Rover Challenge (IRC) 2025',
    role: 'Systems Integration',
    rank: '16th Globally · Field of 226 international teams',
    details: [
      { heading: 'The Challenge', body: 'Held in Goa, India — rough-terrain traversal and multiple science missions. Ranked 16th globally out of 226 international teams.' },
      { heading: 'My Contribution', body: 'Led the integration of the Science Cache system with the main chassis. Solved critical vibration issues by designing custom TPU dampeners that reduced payload oscillation by 60% during terrain navigation.' },
    ],
  },
  {
    id: 'ach_3',
    title: 'International Rover Challenge (IRC) 2026',
    role: 'Mechanical Design Engineer & Subsystem Lead',
    rank: '10th Globally · Udupi, India',
    details: [
      { heading: 'The Challenge', body: 'Held in Udupi, India — advanced autonomous navigation and sample collection. Ranked 10th globally.' },
      { heading: 'My Contribution', body: 'Designed the 6-beaker carousel with helical core-drill actuator and dust-sealed chamber; executed structural load-path verification and field maintenance of the 6-DoF manipulator.' },
    ],
  },
];

export const site = {
  name: 'Diwaakar Jayaprakash',
  shortName: 'DiJay',
  role: 'Mechanical Engineering',
  tagline:
    'Mechanical engineering undergraduate specializing in CAD-driven design, structural/thermal FEA, and electromechanical prototyping. Translating functional requirements into production-ready assemblies across robotics, semiconductor equipment workflows, and smart energy systems.',
  email: 'diwaakarjayaprakash@gmail.com',
  linkedin: 'https://linkedin.com/in/IamDiJay',
  github: 'https://github.com/Just0DJ',
  instagram: 'https://instagram.com/dijay__',
  resumePdf: '/260209_Diwaakar-Resume.pdf',
  locations: [
    'Abu Dhabi, UAE — +971 56 791 4327',
    'Chennai, TN, India — +91 81228 00527',
  ],
  url: 'https://dijay.netlify.app',
};

export const skillLogos = [
  { name: 'SolidWorks', src: '/logos/logo-solidworks.svg' },
  { name: 'Fusion 360', src: '/logos/logo-fusion-360.png' },
  { name: 'Onshape', src: '/logos/logo-onshape.png' },
  { name: 'AutoCAD', src: '/logos/logo-autocad.png' },
  { name: 'ANSYS', src: '/logos/logo-ansys.png' },
  { name: 'MATLAB', src: '/logos/logo-matlab.svg' },
  { name: 'Python', src: '/logos/logo-python.svg' },
  { name: 'MySQL', src: '/logos/logo-mysql.svg' },
  { name: 'C/C++', src: '/logos/logo-c.svg' },
];

export const introTexts = ['நான் திஜே', 'मैं डिजे', 'أنا ديجي', 'Je suis DiJay', 'I am DiJay'];

export const accentColors = [
  '#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
  '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3',
  '#ff4757', '#2ed573', '#ffa502', '#ff6348', '#5352ed',
  '#ff3838', '#32ff7e', '#ff9f1a', '#ff6b9d', '#4834d4',
  '#00d2d3', '#ff7675', '#74b9ff', '#a29bfe', '#fd79a8',
];
