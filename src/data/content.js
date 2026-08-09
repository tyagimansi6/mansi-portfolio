export const site = {
  name: 'Mansi Tyagi',
  brand: 'Mansi',
  title: 'Mansi Tyagi | Portfolio',
  description:
    'Mansi Tyagi — Computer Science Engineering Student, Frontend Developer, and UI/UX Enthusiast.',
  positioning: 'Computer Science Student & Full-Stack Developer',
  statusBadge: 'Open to Internship Opportunities',
  email: 'archanatyagi209@gmail.com',
  github: 'https://github.com/tyagimansi6',
  linkedin: 'https://www.linkedin.com/in/mansityagi6',
  codechef: 'https://www.codechef.com/users/cse_21_1870',
  resume: '/resume.pdf',
};

export const roles = [
  'Frontend Developer',
  'Problem Solver',
  'UI/UX Enthusiast',
  'Computer Science Engineering Student',
];

export const about = {
  paragraphs: [
    "I'm a Computer Science undergraduate passionate about web development, UI/UX design, and problem solving. I enjoy building responsive web applications, solving DSA problems, and continuously learning modern technologies.",
    'I am currently looking for software development opportunities where I can grow as a developer.',
  ],
  stats: [
    { value: 7.8, label: 'CGPA', suffix: '' },
    { value: 4, label: 'Projects Built', suffix: '+' },
    { value: 13, label: 'Skills', suffix: '+' },
  ],
  highlights: [{ id: 'codechef', label: 'CodeChef', value: '3★' }],
};

export const education = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology',
    title: 'Computer Science Engineering',
    place: 'ABES Engineering College',
    detail: 'CGPA: 7.8',
    description:
      'Currently pursuing B.Tech in Computer Science Engineering with a CGPA of 7.8. Focused on web development, data structures & algorithms, and modern software practices.',
  },
  {
    id: 'xii',
    degree: 'Class XII',
    title: 'Higher Secondary',
    place: '88.4%',
    detail: '88.4%',
    description: 'Completed Class XII with 88.4%.',
  },
  {
    id: 'x',
    degree: 'Class X',
    title: 'Secondary',
    place: '93.2%',
    detail: '93.2%',
    description: 'Completed Class X with 93.2%.',
  },
];

export const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'C++', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 82 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 75 },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 90 },
      { name: 'Figma', level: 78 },
      { name: 'DSA', level: 82 },
      { name: 'OOP', level: 85 },
    ],
  },
];

export const projectFilters = ['All', 'Frontend', 'JavaScript', 'React', 'Full Stack'];

export const projects = [
  {
    id: 'realtime-chat',
    number: '01',
    title: 'Real-Time Chat Application',
    description:
      'Built a full-stack real-time messaging platform with secure JWT authentication, protected APIs, user-to-user conversations and real-time communication. Integrated MongoDB for persistent chat data and Socket.IO for live messaging, with additional support for video calling, notifications, media sharing and message translation.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT'],
    categories: ['Full Stack', 'React', 'JavaScript'],
    featured: true,
    sourceUrl: 'https://github.com/tyagimansi6/realtime-chat-app',
  },
  {
    id: 'devconnect',
    number: '02',
    title: 'DevConnect – Developer Collaboration Platform',
    description:
      'A platform where developers can create profiles, showcase projects, connect with peers, share posts, and collaborate on coding projects.',
    tags: ['Profiles', 'Collaboration', 'Social'],
    categories: ['Full Stack'],
    featured: false,
  },
  {
    id: 'expense-tracker',
    number: '03',
    title: 'Expense Tracker with Analytics',
    description:
      'Income and expense tracking with charts, reports, and a responsive UI for clear financial insights.',
    tags: ['Analytics', 'Charts', 'Responsive'],
    categories: ['Frontend', 'JavaScript'],
    featured: false,
  },
  {
    id: 'task-tracker',
    number: '04',
    title: 'Task Tracker',
    description:
      'A task management app with full CRUD operations, responsive design, and a modern UI.',
    tags: ['CRUD', 'Responsive', 'Modern UI'],
    categories: ['Frontend', 'JavaScript'],
    featured: false,
  },
  {
    id: 'portfolio',
    number: '05',
    title: 'Personal Portfolio Website',
    description:
      'A responsive personal portfolio featuring a clean light theme, glassmorphism cards, and smooth animations.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    categories: ['Frontend', 'React', 'JavaScript'],
    featured: false,
  },
];

export const experience = [
  {
    id: 'sync-explore',
    role: 'Frontend Developer Intern',
    company: 'Sync and Explore Pvt. Ltd.',
    period: 'February 2026 – April 2026',
    summary:
      'Worked as a Frontend Developer Intern, contributing to the design and development of responsive and user-friendly web interfaces.',
    responsibilities: [
      'Developed responsive web pages using HTML, CSS, and JavaScript.',
      'Built modern UI components following responsive design principles.',
      'Improved overall user experience.',
      'Worked collaboratively with the development team.',
      'Optimized layouts for desktop and mobile.',
      'Participated in debugging and testing.',
    ],
    docs: [
      {
        label: 'View Internship Certificate',
        href: '/assets/certificates/internship-certificate.pdf',
      },
      {
        label: 'View Letter of Recommendation',
        href: '/assets/certificates/lor-mansi.pdf',
      },
    ],
  },
];

export const achievements = [
  {
    id: 'codechef-3star',
    title: '3-Star CodeChef',
    description:
      'Achieved a 3-star rating on CodeChef through consistent problem solving and competitive programming practice.',
  },
  {
    id: 'ncc-c',
    title: 'NCC C Certificate Holder',
    description:
      'Earned the NCC C Certificate, demonstrating leadership, discipline, and commitment beyond academics.',
  },
  {
    id: 'emerging-tech',
    title: 'Emerging Technologies Internship',
    description: 'Shortlisted for an Emerging Technologies Internship opportunity.',
  },
  {
    id: 'php-fullstack',
    title: 'PHP Full Stack Internship',
    description: 'Shortlisted for a PHP Full Stack Internship opportunity.',
  },
];

export const certifications = [
  {
    id: 'cisco-networking-basics',
    title: 'Cisco Networking Academy – Networking Basics',
    organization: 'Cisco Networking Academy',
    status: 'Completed',
    completedDate: '03 August 2026',
    description:
      'Successfully completed the Cisco Networking Academy Networking Basics course, gaining foundational knowledge of networking concepts, IP addressing, Ethernet, routing, switching, network protocols, and networking fundamentals.',
    featured: true,
    verified: true,
    badge: '/assets/certificates/networking-basics.png',
    certificatePdf: '/assets/certificates/networking-basics-certificate.pdf',
  },
  {
    id: 'cisco-python-essentials-1',
    title: 'Cisco Networking Academy – Python Essentials 1',
    organization: 'Cisco Networking Academy',
    status: 'Completed',
    completedDate: '04 August 2026',
    description:
      'Successfully completed the Cisco Networking Academy Python Essentials 1 course, offered by ABES Engineering College through the Cisco Networking Academy program.',
    featured: false,
    certificatePdf: '/assets/certificates/python-essentials-1-certificate.pdf',
  },
  {
    id: 'cisco-python-essentials-2',
    title: 'Cisco Networking Academy – Python Essentials 2',
    organization: 'Cisco Networking Academy',
    status: 'Completed',
    completedDate: '04 August 2026',
    description:
      'Successfully completed the Cisco Networking Academy Python Essentials 2 course through the Cisco Networking Academy program.',
    featured: false,
    badge: '/assets/certificates/python-essentials-2.png',
    certificatePdf: '/assets/certificates/python-essentials-2-certificate.pdf',
  },
  {
    id: 'siemens-pm',
    title: 'Siemens Project Management Job Simulation',
    organization: 'Siemens',
    status: 'Completed',
    description: 'Hands-on simulation covering planning and delivery fundamentals.',
    featured: false,
    certificatePdf: '/assets/certificates/forage.pdf',
  },
];

export const codingProfiles = [
  {
    id: 'github',
    name: 'GitHub',
    label: 'Open Source & Projects',
    url: site.github,
    handle: '@tyagimansi6',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    label: 'Professional Network',
    url: site.linkedin,
    handle: 'mansityagi6',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    label: 'Competitive Programming',
    url: site.codechef,
    handle: 'cse_21_1870',
  },
];

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'profiles', label: 'Profiles', href: '#profiles' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const sectionIds = navLinks.map((link) => link.id);

const content = {
  site,
  roles,
  about,
  education,
  skills,
  projectFilters,
  projects,
  experience,
  achievements,
  certifications,
  codingProfiles,
  navLinks,
  sectionIds,
};

export default content;
