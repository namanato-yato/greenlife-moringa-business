import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Trophy, TrendingUp, Calculator, Heart, Sparkles, 
  CheckCircle2, MessageSquare, Send, User, Plus, Calendar, 
  Flame, Shield, Activity, Coffee, Droplet, UserCheck, 
  Sparkle, LogOut, HeartPulse, Trash2, LineChart
} from 'lucide-react';

interface MemberProfile {
  name: string;
  email: string;
  focus: string;
  points: number;
  streak: number;
  joinDate: string;
  avatarSeed: number;
}

interface CommunityPost {
  id: string;
  author: string;
  role: 'Member' | 'Botanist' | 'Health Expert' | 'Founder';
  avatarSeed: number;
  time: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  likedByUser?: boolean;
}

interface HealthLog {
  id: string;
  date: string;
  weight: number;
  energy: number; // 1-10 scale
  water: number;  // ounces
  sleep: number;  // hours
  dose: number;   // grams
  notes: string;
}

const PRELOADED_POSTS: CommunityPost[] = [
  {
    id: 'post-club-1',
    author: 'Dr. Liam Ross',
    role: 'Botanist',
    avatarSeed: 5,
    time: '2 hours ago',
    category: 'Botanical Science',
    title: 'Why Moringa stenotepela beats standard cultivars',
    content: 'Moringa stenotepela possesses elevated drought-resistant alkaloids, translating to significantly higher concentrations of active flavonoids and cardioprotective biophenols. When consuming, always make sure your water temperature is below 85°C to guard these live enzymes!',
    likes: 24,
  },
  {
    id: 'post-club-2',
    author: 'Elena Vance',
    role: 'Health Expert',
    avatarSeed: 12,
    time: 'Yesterday',
    category: 'Refined Recipes',
    title: 'Moringa Golden-Milk Elixir Recipe',
    content: 'Combine 1 tsp of Moringa stenotepela powder, 1/2 tsp ginger juice, 1 cup of creamy almond milk, a touch of cardamom, and 1 tsp of cold-pressed seed oil. It provides a supreme cell-renewing bedtime routine that supports morning vascular comfort and glow.',
    likes: 18,
  },
  {
    id: 'post-club-3',
    author: 'Chief Farmer Dave',
    role: 'Founder',
    avatarSeed: 1,
    time: '3 days ago',
    category: 'Organics',
    title: 'Organic Volcanic Soils of the Rift Valley',
    content: 'Our newest harvest batch has just completed biological screening. The volcanic traces are richer in silicon this year, enhancing the structural bone-density support profile of our shade-dried leaves. Feel free to ask any cultivation questions here!',
    likes: 31,
  }
];

const PRELOADED_LOGS: HealthLog[] = [
  {
    id: 'log-1',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    weight: 154,
    energy: 6,
    water: 64,
    sleep: 7.0,
    dose: 3.0,
    notes: 'Began primary dosage. Earthy profile, noticeable focus boost by afternoon.',
  },
  {
    id: 'log-2',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    weight: 153.5,
    energy: 7,
    water: 72,
    sleep: 7.5,
    dose: 3.0,
    notes: 'Increased cellular vitality, clean focus without midday drowsiness.',
  },
  {
    id: 'log-3',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    weight: 153.0,
    energy: 8,
    water: 80,
    sleep: 8.0,
    dose: 3.5,
    notes: 'Steady physical energy. Replaced espresso with fresh mineral water ratios.',
  }
];

export default function HealthClub() {
  // Member Profile state
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  
  // Registration Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regFocus, setRegFocus] = useState('Daily Energy & Bio-vitality');

  // Dosage Calculator
  const [weight, setWeight] = useState(150);
  const [age, setAge] = useState(30);
  const [activity, setActivity] = useState('moderate');
  const [calcResult, setCalcResult] = useState<{ dose: string; schedule: string } | null>(null);

  // Sub-tab Navigator inside logged in portal
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'tracker' | 'community'>('dashboard');

  // Interactive Health Metrics Tracker state
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
  
  // Log Metric fields
  const [logWeight, setLogWeight] = useState<number>(150);
  const [logEnergy, setLogEnergy] = useState<number>(8);
  const [logWater, setLogWater] = useState<number>(64);
  const [logSleep, setLogSleep] = useState<number>(7.5);
  const [logDose, setLogDose] = useState<number>(3.5);
  const [logNotes, setLogNotes] = useState<string>('');
  const [logDate, setLogDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Community Feed
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Botanical Science');

  // Daily Habits checklist
  const [habits, setHabits] = useState([
    { id: 'h1', label: '1 tsp Moringa stenotepela with warm water/smoothie', done: false, points: 25 },
    { id: 'h2', label: 'Massage 3 drops of cold-pressed oil on face/hair', done: false, points: 25 },
    { id: 'h3', label: '15-minute mindful walking/posture stretch', done: false, points: 25 },
    { id: 'h4', label: 'Review one scientific publication or blog article', done: false, points: 25 },
  ]);

  // Load state from localStorage on build
  useEffect(() => {
    // Member Profile
    const savedMember = localStorage.getItem('green_moringa_member');
    if (savedMember) {
      try {
        setProfile(JSON.parse(savedMember));
      } catch (e) {
        console.error('Error parsing member profile:', e);
      }
    }

    // Community Posts
    const savedPosts = localStorage.getItem('green_moringa_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(PRELOADED_POSTS);
      }
    } else {
      setPosts(PRELOADED_POSTS);
    }

    // Health Metric Logs
    const savedLogs = localStorage.getItem('green_moringa_health_logs');
    if (savedLogs) {
      try {
        setHealthLogs(JSON.parse(savedLogs));
      } catch (e) {
        setHealthLogs(PRELOADED_LOGS);
      }
    } else {
      setHealthLogs(PRELOADED_LOGS);
      localStorage.setItem('green_moringa_health_logs', JSON.stringify(PRELOADED_LOGS));
    }

    // Daily habit check states
    const savedHabitsDate = localStorage.getItem('green_moringa_habits_date');
    const todayStr = new Date().toDateString();
    
    if (savedHabitsDate === todayStr) {
      const savedHabits = localStorage.getItem('green_moringa_habits');
      if (savedHabits) {
        try {
          setHabits(JSON.parse(savedHabits));
        } catch (e) {
          // ignore
        }
      }
    } else {
      localStorage.setItem('green_moringa_habits_date', todayStr);
    }
  }, []);

  // Calculate default dosage whenever inputs change
  useEffect(() => {
    let baseGrams = 3.0;
    
    // adjust depending on weight
    if (weight > 180) baseGrams += 1.0;
    else if (weight < 120) baseGrams -= 0.5;

    // adjust depending on age
    if (age > 50) baseGrams += 0.5;

    // adjust depending on activity
    if (activity === 'high') baseGrams += 1.5;
    else if (activity === 'sedentary') baseGrams -= 0.5;

    // custom advice
    let scheduleAdvice = 'Best taken in the morning or early afternoon with a meal to stabilize glucose absorption.';
    if (regFocus.toLowerCase().includes('sleep') || regFocus.toLowerCase().includes('rest')) {
      scheduleAdvice = 'Best split: 50% in the morning, and 50% mixed into warm botanical herbal tea 1 hour before sleeping.';
    } else if (activity === 'high') {
      scheduleAdvice = 'Consume half of the dosage 30 mins before physical workout, and host the other half in a post-workout recovery shake.';
    }

    setCalcResult({
      dose: `${baseGrams.toFixed(1)} grams (approximately ${Math.max(1, Math.round(baseGrams / 1.5))} level teaspoons of powder, or ${Math.max(2, Math.round(baseGrams * 1.5))} capsules)`,
      schedule: scheduleAdvice
    });
  }, [weight, age, activity, regFocus]);

  // Register Member
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    const newProfile: MemberProfile = {
      name: regName.trim(),
      email: regEmail.trim(),
      focus: regFocus,
      points: 200, // starting bonus
      streak: 1,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatarSeed: Math.floor(Math.random() * 20) + 1
    };

    setProfile(newProfile);
    localStorage.setItem('green_moringa_member', JSON.stringify(newProfile));
  };

  // Sign out / clear session
  const handleSignOut = () => {
    if (confirm('Are you sure you want to log out of the Green Life Health Club? Your current session local state will be reset.')) {
      localStorage.removeItem('green_moringa_member');
      setProfile(null);
      // Reset registration values
      setRegName('');
      setRegEmail('');
    }
  };

  // Toggle checklist habit
  const handleToggleHabit = (id: string) => {
    const updatedHabits = habits.map(h => {
      if (h.id === id) {
        const nextDone = !h.done;
        
        // Award or deduct points
        if (profile) {
          const pointsDifference = nextDone ? h.points : -h.points;
          const updatedProfile = {
            ...profile,
            points: Math.max(0, profile.points + pointsDifference)
          };
          setProfile(updatedProfile);
          localStorage.setItem('green_moringa_member', JSON.stringify(updatedProfile));
        }

        return { ...h, done: nextDone };
      }
      return h;
    });

    setHabits(updatedHabits);
    localStorage.setItem('green_moringa_habits', JSON.stringify(updatedHabits));

    // Check if the user just completed all habits to trigger a bonus points boost
    const allCompleted = updatedHabits.every(h => h.done);
    if (allCompleted && profile) {
      const updatedProfileWithBonus = {
        ...profile,
        points: profile.points + 50, // 50 bonus points
        streak: profile.streak + 1
      };
      setProfile(updatedProfileWithBonus);
      localStorage.setItem('green_moringa_member', JSON.stringify(updatedProfileWithBonus));
    }
  };

  // Submit new community post
  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-user-${Date.now()}`,
      author: profile.name,
      role: 'Member',
      avatarSeed: profile.avatarSeed,
      time: 'Just now',
      category: newPostCategory,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      likes: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('green_moringa_posts', JSON.stringify(updatedPosts));

    // Reward points for community sharing
    const updatedProfile = {
      ...profile,
      points: profile.points + 30
    };
    setProfile(updatedProfile);
    localStorage.setItem('green_moringa_member', JSON.stringify(updatedProfile));

    // Reset fields
    setNewPostTitle('');
    setNewPostContent('');
  };

  // Like a post
  const handleLikePost = (id: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        const liked = !post.likedByUser;
        return {
          ...post,
          likes: liked ? post.likes + 1 : post.likes - 1,
          likedByUser: liked
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('green_moringa_posts', JSON.stringify(updatedPosts));
  };

  // Create physical health log entry
  const handleCreateLog = (e: FormEvent) => {
    e.preventDefault();
    if (!logDate) return;

    const newLog: HealthLog = {
      id: `log-user-${Date.now()}`,
      date: logDate,
      weight: Number(logWeight) || 150,
      energy: Number(logEnergy),
      water: Number(logWater) || 0,
      sleep: Number(logSleep) || 8,
      dose: Number(logDose) || 0,
      notes: logNotes.trim(),
    };

    const updatedLogs = [newLog, ...healthLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setHealthLogs(updatedLogs);
    localStorage.setItem('green_moringa_health_logs', JSON.stringify(updatedLogs));

    // Reward points for logging health data
    if (profile) {
      const updatedProfile = {
        ...profile,
        points: profile.points + 40 // +40 membership points reward
      };
      setProfile(updatedProfile);
      localStorage.setItem('green_moringa_member', JSON.stringify(updatedProfile));
    }

    // Reset form fields
    setLogNotes('');
    alert('📊 Biological status updated! Your telemetry metrics have been calibrated, and we awarded you +40 health points!');
  };

  // Delete health log
  const handleDeleteLog = (id: string) => {
    if (confirm('Verify: Delete this recorded wellness log? This action is local and irreversible.')) {
      const updatedLogs = healthLogs.filter(log => log.id !== id);
      setHealthLogs(updatedLogs);
      localStorage.setItem('green_moringa_health_logs', JSON.stringify(updatedLogs));
    }
  };

  // Calculate member levels based on points
  const getMemberLevel = (pts: number) => {
    if (pts >= 1000) return { label: 'Golden Bloom Legend', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    if (pts >= 500) return { label: 'Silver Leaf Supporter', color: 'text-slate-705 bg-slate-50 border-slate-200' };
    return { label: 'Bronze Seed Novice', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
  };

  // Calculate dynamic average metrics
  const getAverageMetrics = () => {
    if (healthLogs.length === 0) return { avgEnergy: 0, avgWater: 0, avgSleep: 0, avgDose: 0 };
    const sum = healthLogs.reduce((acc, log) => {
      return {
        energy: acc.energy + log.energy,
        water: acc.water + log.water,
        sleep: acc.sleep + log.sleep,
        dose: acc.dose + log.dose
      };
    }, { energy: 0, water: 0, sleep: 0, dose: 0 });

    return {
      avgEnergy: Math.round((sum.energy / healthLogs.length) * 10) / 10,
      avgWater: Math.round(sum.water / healthLogs.length),
      avgSleep: Math.round((sum.sleep / healthLogs.length) * 10) / 10,
      avgDose: Math.round((sum.dose / healthLogs.length) * 10) / 10,
    };
  };

  const averages = getAverageMetrics();

  // Helper values for SVG layout line parsing
  const renderSVGChart = () => {
    if (healthLogs.length < 2) {
      return (
        <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50/50 border border-dashed border-slate-200 text-xs text-slate-400 font-medium">
          Add at least 2 diagnostic logs to map biochemical trend lines.
        </div>
      );
    }

    // Sort logs chronologically to draw the line left-to-right
    const sortedChronological = [...healthLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const maxVal = 10;
    const paddingX = 40;
    const paddingY = 20;
    const svgWidth = 500;
    const svgHeight = 150;

    const points = sortedChronological.map((log, idx) => {
      const stepX = (svgWidth - paddingX * 2) / Math.max(1, sortedChronological.length - 1);
      const x = paddingX + idx * stepX;
      // scale up logarithmic/linear representation of energy
      const y = svgHeight - paddingY - ((log.energy - 1) / (maxVal - 1)) * (svgHeight - paddingY * 2);
      return { x, y, log };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const areaD = points.length > 0 
      ? `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(svgHeight - paddingY).toFixed(1)} L ${points[0].x.toFixed(1)} ${(svgHeight - paddingY).toFixed(1)} Z` 
      : '';

    return (
      <div className="space-y-2 mt-2">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span>Vitality Energy Growth Trend</span>
          <span className="text-emerald-600 font-extrabold">Active Chronological Scale</span>
        </div>
        <div className="relative rounded-2xl bg-slate-50 border border-slate-100 p-2 sm:p-4 shadow-inner">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-32 overflow-visible text-emerald-600">
            {/* Grid Lines */}
            <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#e2e8f0" strokeDasharray="3,3" />
            <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#e2e8f0" strokeDasharray="3,3" />
            <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#e2e8f0" />

            {/* Area under line */}
            {areaD && (
              <path d={areaD} fill="url(#blue-gradient)" className="opacity-10" />
            )}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#ecfdf5" />
              </linearGradient>
            </defs>

            {/* Actual trajectory line */}
            <path d={pathD} fill="none" stroke="#059669" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />

            {/* Points & helper indicators */}
            {points.map((p, idx) => (
              <g key={p.log.id} className="group cursor-pointer">
                <circle cx={p.x} cy={p.y} r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                <circle cx={p.x} cy={p.y} r="8" fill="#10b981" className="opacity-0 hover:opacity-15 transition-opacity" />
                {/* Labels */}
                <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[10px] font-black font-mono fill-emerald-800">
                  {p.log.energy}★
                </text>
                {/* Dates below */}
                <text x={p.x} y={svgHeight - 4} textAnchor="middle" className="text-[8px] font-bold font-mono fill-slate-400 bg-white">
                  {p.log.date.substring(5)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div id="health-club" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase flex items-center justify-center gap-1.5 animate-pulse">
          <Award className="h-4 w-4" /> Botanical Longevity Portal
        </span>
        <h2 className="mt-3 font-sans text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
          Green Life Health Club
        </h2>
        <p className="mt-3.5 text-xs sm:text-sm text-emerald-900/70 leading-relaxed">
          Unlock biological longevity tracking and community discovery. Customize your dose schedule, record crucial cell-vitality variables, and earn premium membership loyalty points.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!profile ? (
          /* REGISTRATION SCREEN */
          <motion.div
            key="club-register"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mx-auto max-w-xl rounded-2xl border border-emerald-100/80 bg-white p-6 sm:p-8 shadow-md"
          >
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">Activate Your Representative Member Account</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Join our botanical program to access the premium metabolic logs, dosage calculators, and earn loyalty points.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="member-name">
                  Full Name
                </label>
                <input
                  id="member-name"
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Sandra Thorne"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="member-email">
                  Email Address
                </label>
                <input
                  id="member-email"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@personal.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="member-focus">
                  Primary Longevity Focus Area
                </label>
                <select
                  id="member-focus"
                  value={regFocus}
                  onChange={(e) => setRegFocus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                >
                  <option>Daily Energy & Bio-vitality</option>
                  <option>Dermal Glow & Skin Resilience</option>
                  <option>Metabolic Regulation & Carb Balance</option>
                  <option>Vascular & Heart Protection</option>
                  <option>Joint Recovery & Longevity</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  id="submit-register-btn"
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white transition-colors duration-150 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-2 shadow-sm animate-pulse"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Initialize Member Account (+200 PTS)</span>
                </button>
              </div>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-5 text-center text-[11px] text-slate-400 leading-relaxed">
              By joining, you secure priority access to each organic volcanic harvest, direct scientific bulletin summaries, and a secure local cache on your current browser.
            </div>
          </motion.div>
        ) : (
          /* LOGGED-IN PORTAL INTERFACE */
          <motion.div
            key="club-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Top Stat Widget Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Member ID Badge */}
              <div className="md:col-span-4 rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-900 p-5 text-white border border-emerald-800 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none animate-spin" style={{ animationDuration: '60s' }}>
                  <HeartPulse className="h-40 w-40" />
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">GREEN LIFE CLUB</span>
                  <button
                    id="signout-btn"
                    onClick={handleSignOut}
                    title="Log out from locally stored session"
                    className="rounded-lg p-1 text-emerald-400/80 hover:text-red-400 hover:bg-white/5 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/20 font-black text-emerald-300">
                      {profile.name[0]?.toUpperCase() || 'M'}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold truncate max-w-[160px]">{profile.name}</h4>
                      <p className="text-[10px] text-emerald-300 truncate max-w-[160px]">{profile.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Rank:</span>
                    <span className="font-bold text-emerald-300 text-[11px] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      {getMemberLevel(profile.points).label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Loyalty Level:</span>
                    <span className="flex items-center gap-1 font-bold text-amber-400 font-mono">
                      <Flame className="h-4 w-4 fill-current text-amber-500 animate-bounce" />
                      {profile.streak} Days active
                    </span>
                  </div>
                </div>
              </div>

              {/* Focus Area Card */}
              <div className="md:col-span-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#2c6e49] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Active Focus
                  </span>
                  <h3 className="mt-1.5 text-base font-extrabold text-emerald-950 font-sans">{profile.focus}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    Customized biological logs enable consistent feedback for your objective of <strong>{profile.focus.toLowerCase()}</strong>. Keep logging to track averages.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 mt-4 text-xs font-semibold text-amber-900/90 leading-relaxed flex gap-2 items-start">
                  <Sparkle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Logging vital metrics awards <strong>+40 points</strong>! Earn badges, certificates, and potential farm priority bonuses.</span>
                </div>
              </div>

              {/* Total points card */}
              <div className="md:col-span-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">Points & Rewards</span>
                  <div className="mt-2 text-4xl font-black text-emerald-950 tracking-tight font-mono">
                    {profile.points} <span className="text-xs font-bold text-slate-400">PTS</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    Accumulate points through routines and telemetry updates to unlock the upcoming Organic Apothecary Reward shop.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-900">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500"><Trophy className="h-4 w-4 text-amber-500" /> Member Benefits:</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-150">Active Partner Status</span>
                </div>
              </div>

            </div>

            {/* Premium Tab Bar for Sub-views */}
            <div className="flex border-b border-slate-200 gap-1 overflow-x-auto select-none no-scrollbar">
              <button
                onClick={() => setActiveSubTab('dashboard')}
                className={`py-3 px-5 text-xs font-extrabold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
                  activeSubTab === 'dashboard' 
                    ? 'border-emerald-600 text-emerald-950'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Calculator className="h-4 w-4" />
                <span>Routines & Calculator</span>
              </button>

              <button
                onClick={() => setActiveSubTab('tracker')}
                className={`py-3 px-5 text-xs font-extrabold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
                  activeSubTab === 'tracker' 
                    ? 'border-emerald-600 text-emerald-950'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Activity className="h-4 w-4" />
                <span>Health Tracker Logs</span>
                {healthLogs.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {healthLogs.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveSubTab('community')}
                className={`py-3 px-5 text-xs font-extrabold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
                  activeSubTab === 'community' 
                    ? 'border-emerald-600 text-emerald-950'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Members Forum</span>
              </button>
            </div>

            {/* Dynamic Segment Views */}
            <AnimatePresence mode="wait">
              
              {/* VIEW 1: ROUTINES & CALCULATOR */}
              {activeSubTab === 'dashboard' && (
                <motion.div
                  key="routines-calc-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Daily habits checkoff */}
                  <div className="lg:col-span-6 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Action Plan</span>
                      <h3 className="font-sans text-lg font-black text-emerald-950">Daily Longevity Checklist</h3>
                      <p className="text-xs text-slate-500">Earn points daily by completing steps specified to optimize raw Moringa stenotepela use.</p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {habits.map((h) => (
                        <button
                          key={h.id}
                          id={`habit-pill-${h.id}`}
                          onClick={() => handleToggleHabit(h.id)}
                          className={`w-full flex items-center justify-between gap-3 text-left p-3.5 rounded-xl border transition-all text-xs font-semibold focus:outline-none ${
                            h.done 
                              ? 'bg-emerald-50/50 border-emerald-250 text-emerald-900' 
                              : 'bg-white border-slate-150 hover:bg-slate-50 text-slate-705'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className={`h-4.5 w-4.5 shrink-0 ${h.done ? 'text-emerald-400 fill-emerald-100/30' : 'text-slate-300'}`} />
                            <span className={`${h.done ? 'line-through text-slate-400 font-normal' : ''}`}>{h.label}</span>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-black font-mono shrink-0 ${h.done ? 'bg-emerald-100/30 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                            {h.done ? 'Earned' : `+${h.points} PTS`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stenotepela Dosage Calculator */}
                  <div className="lg:col-span-6 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm space-y-5">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700 border border-emerald-100">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c6e49]">Precise calibration</span>
                        <h3 className="font-sans text-base font-black text-emerald-950">Stenotepela Dosage Calculator</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Matches weight, activity indices, and age traits to calculate optimal raw leaf and seed concentrations for maximum enzymatic effectiveness.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="calc-weight">
                          Weight Indicator
                        </label>
                        <div className="relative">
                          <input
                            id="calc-weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Math.max(40, parseInt(e.target.value) || 0))}
                            className="w-full rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2 text-xs font-bold font-mono focus:border-emerald-600 focus:bg-white focus:outline-none"
                          />
                          <span className="absolute right-3.5 top-2.5 text-[10px] font-bold text-slate-400">LBS</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="calc-age">
                          Age Ratio
                        </label>
                        <div className="relative">
                          <input
                            id="calc-age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2 text-xs font-bold font-mono focus:border-emerald-600 focus:bg-white focus:outline-none"
                          />
                          <span className="absolute right-3.5 top-2.5 text-[10px] font-bold text-slate-400">YRS</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="calc-activity">
                        Physical Activity Index
                      </label>
                      <select
                        id="calc-activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full rounded-xl border border-slate-250 bg-slate-50/50 px-3 py-2.5 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-none"
                      >
                        <option value="sedentary">Sedentary / Desk Work</option>
                        <option value="moderate">Moderately Active / Walkers</option>
                        <option value="high">Athletic / Weightlifter / Manual Work</option>
                      </select>
                    </div>

                    <AnimatePresence mode="wait">
                      {calcResult && (
                        <motion.div
                          key="dosage-result"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2.5"
                        >
                          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5"><Activity className="h-4 w-4 text-emerald-600" /> Calculated Target Profile:</div>
                          <div className="text-xs sm:text-sm font-black text-emerald-950 tracking-tight leading-relaxed font-sans">{calcResult.dose}</div>
                          
                          <div className="border-t border-slate-200/50 pt-2 text-[11px] leading-relaxed text-slate-600">
                            <strong className="text-slate-800 font-bold">Recommended Chronology:</strong> {calcResult.schedule}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* VIEW 2: DETAILED HEALTH TRACKER LOGS */}
              {activeSubTab === 'tracker' && (
                <motion.div
                  key="tracker-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Dashboard Bento Stat Block */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Vitality Energy</span>
                      <strong className="text-2xl font-black text-emerald-900 mt-1 block font-mono">{averages.avgEnergy} <span className="text-xs text-slate-400 font-bold">/ 10</span></strong>
                    </div>

                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Sleep Hours</span>
                      <strong className="text-2xl font-black text-emerald-900 mt-1 block font-mono">{averages.avgSleep} <span className="text-xs text-slate-400 font-bold">Hrs</span></strong>
                    </div>

                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Pure Water</span>
                      <strong className="text-2xl font-black text-emerald-900 mt-1 block font-mono">{averages.avgWater} <span className="text-xs text-slate-400 font-bold">Oz</span></strong>
                    </div>

                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Moringa Intake</span>
                      <strong className="text-2xl font-black text-emerald-900 mt-1 block font-mono">{averages.avgDose} <span className="text-xs text-slate-400 font-bold">g</span></strong>
                    </div>
                  </div>

                  {/* Chart and Logging split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Log New Stats Form */}
                    <div className="lg:col-span-5 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff0505]">Diagnostic update</span>
                        <h3 className="font-sans text-base font-black text-emerald-950">Record Vitality Metrics</h3>
                        <p className="text-xs text-slate-500">Log variables to evaluate correlation between pure Moringa stenotepela use and everyday biological states.</p>
                      </div>

                      <form onSubmit={handleCreateLog} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="log-date">
                              Log Date
                            </label>
                            <input
                              id="log-date"
                              type="date"
                              required
                              value={logDate}
                              onChange={(e) => setLogDate(e.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="log-weight-input">
                              Weight (lbs)
                            </label>
                            <input
                              id="log-weight-input"
                              type="number"
                              required
                              min={30}
                              max={600}
                              value={logWeight}
                              onChange={(e) => setLogWeight(Number(e.target.value))}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* Energy Level Slider */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            <label htmlFor="log-energy-range">Energy / Focus Level</label>
                            <span className="text-emerald-700 font-mono text-[11px] font-black">{logEnergy} / 10 ({logEnergy <= 3 ? 'Sluggish' : logEnergy <= 7 ? 'Balanced' : 'Vibrant State'})</span>
                          </div>
                          <input
                            id="log-energy-range"
                            type="range"
                            min="1"
                            max="10"
                            value={logEnergy}
                            onChange={(e) => setLogEnergy(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="log-water-input">
                              Water (oz)
                            </label>
                            <input
                              id="log-water-input"
                              type="number"
                              required
                              min={0}
                              value={logWater}
                              onChange={(e) => setLogWater(Number(e.target.value))}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="log-sleep-input">
                              Sleep (hrs)
                            </label>
                            <input
                              id="log-sleep-input"
                              type="number"
                              required
                              step="0.5"
                              min={0}
                              value={logSleep}
                              onChange={(e) => setLogSleep(Number(e.target.value))}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="log-dose-input">
                              Moringa (g)
                            </label>
                            <input
                              id="log-dose-input"
                              type="number"
                              required
                              step="0.1"
                              min={0}
                              value={logDose}
                              onChange={(e) => setLogDose(Number(e.target.value))}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1" htmlFor="log-notes-input">
                            Symptom Notes & Self-Assessment
                          </label>
                          <textarea
                            id="log-notes-input"
                            value={logNotes}
                            onChange={(e) => setLogNotes(e.target.value)}
                            placeholder="e.g. Higher resilience during morning workout, steady stamina, clean digestion parameters."
                            rows={2}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-emerald-800 hover:bg-emerald-900 transition-colors text-white py-2.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Record Wellness Status (+40 PTS)</span>
                        </button>
                      </form>
                    </div>

                    {/* Chart & History logs */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Interactive dynamic chart */}
                      <div className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c6e49] flex items-center gap-1">
                          <LineChart className="h-4 w-4" /> Trajectory analytics
                        </span>
                        <h3 className="font-sans text-base font-black text-emerald-950 mt-1">Metabolic Trend Chart</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Your records visualize daily active states. Stable indicators show successful biochemical support in your system.
                        </p>
                        
                        {renderSVGChart()}
                      </div>

                      {/* Log lists */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Historic Telemetry Log Data</span>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {healthLogs.length === 0 ? (
                            <div className="text-center py-8 text-xs text-slate-400 font-semibold border border-slate-150 rounded-2xl bg-[#FDFDFB]">
                              No health records on file. Fill out the record form to initialize tracking.
                            </div>
                          ) : (
                            healthLogs.map((log) => (
                              <div
                                key={log.id}
                                className="bg-white border border-slate-150 hover:border-emerald-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 shadow-sm transition-all"
                              >
                                <div className="space-y-2">
                                  {/* Top line with date & delete */}
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-mono">
                                      {log.date}
                                    </span>
                                    {log.weight > 0 && (
                                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                                        Weight: {log.weight} lbs
                                      </span>
                                    )}
                                  </div>

                                  {/* Stats block layout */}
                                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                                    <span className="flex items-center gap-1"><Flame className="h-4 w-4 text-orange-500 shrink-0" /> Energy: {log.energy}/10</span>
                                    <span className="flex items-center gap-1"><Droplet className="h-4 w-4 text-blue-500 shrink-0" /> Water: {log.water} oz</span>
                                    <span className="flex items-center gap-1"><Coffee className="h-4 w-4 text-emerald-600 shrink-0" /> Dose: {log.dose}g</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-slate-400 shrink-0" /> Sleep: {log.sleep} hrs</span>
                                  </div>

                                  {/* Notes rendering */}
                                  {log.notes && (
                                    <p className="text-[11px] text-slate-500 leading-relaxed max-w-lg font-medium italic">
                                      "{log.notes}"
                                    </p>
                                  )}
                                </div>

                                <button
                                  id={`delete-log-${log.id}`}
                                  onClick={() => handleDeleteLog(log.id)}
                                  className="text-slate-350 hover:text-red-500 self-end sm:self-center p-1.5 rounded-lg hover:bg-slate-50"
                                  title="Remove log item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              )}

              {/* VIEW 3: MEMBERS DISCUSSION CIRCLE */}
              {activeSubTab === 'community' && (
                <motion.div
                  key="community-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  <div className="lg:col-span-12 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-sm flex flex-col space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Circle of Experts</span>
                          <h3 className="font-sans text-lg font-black text-emerald-950">Active Discussion Circle</h3>
                        </div>
                        <span className="text-xs text-slate-400 font-bold font-mono">{posts.length} Publications</span>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        A supportive, secure environment to share recipes, ask botanical questions, or discuss local volcanic soil harvests. Sharing gives you <strong className="text-emerald-800 font-bold">+30 points</strong>!
                      </p>

                      {/* Create New Post form */}
                      <form onSubmit={handleCreatePost} className="bg-[#FDFDFB] p-4 rounded-xl border border-slate-150 space-y-4 shadow-inner">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff0505] flex items-center gap-1"><Plus className="h-3 w-3" /> Start Discussion</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Subject description"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500-600"
                          />
                          <select
                            value={newPostCategory}
                            onChange={(e) => setNewPostCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option>Botanical Science</option>
                            <option>Refined Recipes</option>
                            <option>Home Cultivation</option>
                            <option>Success History</option>
                          </select>
                        </div>

                        <textarea
                          required
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Your questions or recommendations regarding Moringa cultivation..."
                          rows={3}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 transition-colors shadow-sm"
                          >
                            <Send className="h-3.5 w-3.5" />
                            <span>Publish (+30 PTS)</span>
                          </button>
                        </div>
                      </form>

                      {/* Feed container */}
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                        {posts.map((post) => (
                          <div key={post.id} className="p-4 rounded-xl border border-slate-100 bg-white space-y-3 shadow-sm hover:border-emerald-100 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 font-bold text-xs text-emerald-800">
                                  {post.author[0]}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                                    {post.author}
                                    <span className={`text-[9px] font-black px-1 rounded-sm uppercase tracking-wider ${
                                      post.role === 'Botanist' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                      post.role === 'Founder' ? 'bg-[#ff0505]/5 text-[#ff0505] border border-[#ff0505]/10' :
                                      post.role === 'Health Expert' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                      'bg-slate-50 text-slate-500'
                                    }`}>
                                      {post.role}
                                    </span>
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-400 font-mono">{post.time}</span>
                                </div>
                              </div>
                              
                              <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                {post.category}
                              </span>
                            </div>

                            <div className="space-y-1 text-xs">
                              <h4 className="font-extrabold text-slate-800 leading-tight">{post.title}</h4>
                              <p className="text-slate-600 leading-relaxed font-normal whitespace-pre-wrap">{post.content}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400 font-bold">
                              <button
                                onClick={() => handleLikePost(post.id)}
                                className={`flex items-center gap-1.5 focus:outline-none transition-colors ${
                                  post.likedByUser ? 'text-[#ff0505]' : 'hover:text-slate-600'
                                }`}
                              >
                                <Heart className={`h-3.5 w-3.5 ${post.likedByUser ? 'fill-current text-[#ff0505]' : ''}`} />
                                <span>{post.likes} Healthy Hearts</span>
                              </button>
                              
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Shield className="h-3 w-3 text-emerald-600" /> Botanical Encryption Active
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
