import {
  Activity,
  AppWindow, // 摸鱼作乐 WIP features (IterationCcw for Soup Switcher, Plane for Alt Career, Fish for Wooden Fish, Drama for Ghost Stories)
  Archive,
  Banknote, // 沟通写作 features
  BarChartBig,
  BookOpenText, // 沟通写作
  BrainCircuit, // 时光机工作体验 (摸鱼作乐WIP)
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardList, // 摸鱼作乐
  Clock,
  CloudSun, // Added for WeatherMoodLink
  Coffee,
  Compass,
  Sparkle as ComplimentIcon,
  CookingPot, // 内容创作
  Dice5,
  Drama, // 时间效率 features (CalendarClock for Workday Countdown)
  Dumbbell,
  FileSignature,
  FileWarning,
  Fish,
  Gift, // 时间效率
  HeartPulse,
  HelpingHand,
  Home,
  ImagePlay,
  ImagePlus, // 摸鱼作乐 features (Sparkle as ComplimentIcon)
  IterationCcw,
  Landmark,
  Languages, // Generic WIP icon if needed
  Lightbulb,
  LucideIcon, // 身心健康
  MailCheck,
  MessageCircleHeart,
  MessageSquareQuote,
  MessagesSquare, // 内容创作 features
  Palette,
  Plane,
  Presentation,
  Quote,
  Repeat,
  ScanLine,
  ScrollText, // 智能分析 features (UsersSearchIcon for Colleague Persona)
  ShieldBan, // 智能分析
  ShieldCheck,
  Shirt,
  ShoppingCart,
  SlidersHorizontal, // 职场生存
  Sparkles,
  Tags,
  TimerOff,
  TrendingUp,
  UserCog,
  Users,
  UsersRound,
  Voicemail,
  Wand2,
  Wind,
} from 'lucide-react';

export interface FeatureConfig {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  path: string;
  icon: LucideIcon;
  status: 'live' | 'wip';
}

export interface ToolCategoryConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  description?: string;
  features: FeatureConfig[];
}

export const homeNavigationLink: FeatureConfig = {
  id: 'home',
  name: '首页',
  path: '/',
  icon: Home,
  status: 'live',
  description: '返回应用主页',
};

export const toolCategories: ToolCategoryConfig[] = [
  {
    id: 'communication-writing',
    name: '沟通写作',
    icon: MessagesSquare,
    description: '提升书面和口头沟通的质量',
    features: [
      {
        id: 'email-polisher',
        name: '邮件润色器',
        description: '专业优化您的邮件内容',
        path: '/tools/email-polisher',
        icon: MailCheck,
        status: 'live',
      },
      {
        id: 'jargon-translator',
        name: '黑话翻译器',
        description: '轻松理解和使用行业黑话',
        path: '/tools/jargon-translator',
        icon: Languages,
        status: 'live',
      },
      {
        id: 'cross-department-translator',
        name: '跨部门沟通翻译器',
        shortName: '跨部门翻译',
        description: '打破部门沟通壁垒',
        path: '/tools/cross-department-translator',
        icon: UsersRound,
        status: 'live',
      },
      {
        id: 'eq-assistant',
        name: '职场情商助手',
        description: '提高您的职场情商对话技巧',
        path: '/tools/eq-assistant',
        icon: MessageCircleHeart,
        status: 'live',
      },
      {
        id: 'meeting-speech-generator',
        name: '会议发言生成器',
        shortName: '会议发言稿',
        description: '帮您准备有条理的会议发言稿',
        path: '/tools/meeting-speech-generator',
        icon: Presentation,
        status: 'live',
      },
      {
        id: 'speech-optimizer',
        name: '话术优化器',
        description: '优化您的表达，让话语更有力',
        path: '/tools/speech-optimizer',
        icon: Wand2,
        status: 'live',
      },
      {
        id: 'ppt-phrase-generator',
        name: 'PPT金句生成器',
        shortName: 'PPT金句',
        description: '为您的PPT增添点睛之笔',
        path: '/tools/ppt-phrase-generator',
        icon: Quote,
        status: 'live',
      },
      {
        id: 'resignation-templates',
        name: '离职/跳槽文案生成器',
        shortName: '离职文案',
        description: '专业得体地撰写离职或跳槽文案',
        path: '/tools/resignation-templates',
        icon: FileSignature,
        status: 'live',
      },
      {
        id: 'meeting-nonsense-translator',
        name: '会议废话翻译器',
        shortName: '废话翻译',
        description: '识别并翻译会议中的冗余表达',
        path: '/tools/meeting-nonsense-translator',
        icon: Voicemail,
        status: 'live',
      },
    ],
  },
  {
    id: 'intelligent-analysis',
    name: '智能分析',
    icon: BrainCircuit,
    description: '利用AI进行分析、洞察和决策辅助',
    features: [
      {
        id: 'data-beautifier',
        name: '汇报数据美化器',
        shortName: '数据美化',
        description: '让您的数据和汇报更美观专业',
        path: '/tools/data-beautifier',
        icon: BarChartBig,
        status: 'live',
      },
      {
        id: 'team-mood-detector',
        name: '团队氛围感知器',
        shortName: '团队氛围',
        description: '洞察团队当前的情绪和氛围',
        path: '/tools/team-mood-detector',
        icon: Users,
        status: 'live',
      },
      {
        id: 'meeting-notes-organizer',
        name: '会议纪要小助理',
        shortName: '会议纪要',
        description: '智能整理您的会议记录',
        path: '/tools/meeting-notes-organizer',
        icon: ClipboardList,
        status: 'live',
      },
      {
        id: 'colleague-persona-analyzer',
        name: '同事人设分析器',
        shortName: '同事分析',
        description: '分析同事的可能行为模式和沟通风格',
        path: '/tools/colleague-persona-analyzer',
        icon: Activity,
        status: 'live',
      },
      {
        id: 'weather-mood-link',
        name: '天气心情关联',
        description: '根据实时天气预测工作状态和心情',
        path: '/tools/weather-mood-link',
        icon: CloudSun,
        status: 'live',
      },
      {
        id: 'career-path-forecaster',
        name: '职场命运预测器',
        shortName: '职场预测',
        description: 'AI为你分析潜在职业发展路径、机遇与挑战。',
        path: '/tools/career-path-forecaster',
        icon: Compass,
        status: 'live',
      },
    ],
  },
  {
    id: 'workplace-survival',
    name: '职场生存',
    icon: ShieldCheck,
    description: '应对职场挑战、处理人际关系、化解危机',
    features: [
      {
        id: 'anti-pua-assistant',
        name: '"拒绝PUA"小助手',
        shortName: '反PUA助手',
        description: '帮你识别和应对职场PUA',
        path: '/tools/anti-pua-assistant',
        icon: ShieldBan,
        status: 'live',
      },
      {
        id: 'blame-game-master',
        name: '甩锅/背锅话术',
        shortName: '甩锅话术',
        description: '提供不同场景下的沟通话术',
        path: '/tools/blame-game-master',
        icon: Repeat,
        status: 'live',
      },
      {
        id: 'crisis-communication-templates',
        name: '危机公关模板',
        shortName: '危机公关',
        description: '快速生成专业的危机公关声明',
        path: '/tools/crisis-communication-templates',
        icon: FileWarning,
        status: 'live',
      },
      {
        id: 'boss-radar',
        name: '老板雷达 / 危险系数监测',
        shortName: '老板雷达',
        description: '模拟监测办公室危险等级，助您安全摸鱼。',
        path: '/tools/boss-radar',
        icon: ScanLine,
        status: 'live',
      },
      {
        id: 'side-hustle-assessor',
        name: '副业潜力评估器',
        shortName: '副业评估',
        description: 'AI为你评估副业潜力，发掘隐藏的赚钱机会。',
        path: '/tools/side-hustle-assessor',
        icon: Lightbulb,
        status: 'live',
      },
      {
        id: 'career-leveling-system',
        name: '职场等级系统',
        shortName: '职场升级',
        description: '模拟从菜鸟到CEO的职场晋升之路，体验升级打怪的乐趣。',
        path: '/tools/career-leveling-system',
        icon: TrendingUp,
        status: 'live',
      },
    ],
  },
  {
    id: 'content-generation',
    name: '内容创作',
    icon: Sparkles,
    description: '生成各类职场相关的内容和材料',
    features: [
      {
        id: 'professional-persona-generator',
        name: '职场人设生成器',
        shortName: '人设生成',
        description: '快速打造专业的职场人设',
        path: '/tools/professional-persona-generator',
        icon: UserCog,
        status: 'live',
      },
      {
        id: 'weekly-report-sparkle-enhancer',
        name: '"这周干了啥"包装器',
        shortName: '周报包装',
        description: '让您的周报重点突出、更亮眼',
        path: '/tools/weekly-report-sparkle-enhancer',
        icon: Gift,
        status: 'live',
      },
      {
        id: 'nickname-generator',
        name: '起名/花名生成器',
        shortName: '起名神器',
        description: 'AI为你的项目、团队、宠物或任何事物想出闪亮名号。',
        path: '/tools/nickname-generator',
        icon: Tags,
        status: 'live',
      },
      {
        id: 'worker-meme-generator-pro',
        name: '打工人表情包生成器',
        shortName: '表情包Pro',
        description: '更多自定义的打工人专属表情包',
        path: '/tools/worker-meme-generator-pro',
        icon: ImagePlay,
        status: 'live',
      },
    ],
  },
  {
    id: 'office-fun-recreation',
    name: '摸鱼作乐',
    icon: Dice5,
    description: '提供轻松有趣的办公室娱乐工具',
    features: [
      {
        id: 'meeting-doodle-buddy',
        name: '会议神游涂鸦伴侣',
        shortName: '摸鱼涂鸦',
        description: '开会摸鱼时的最佳伴侣',
        path: '/tools/meeting-doodle-buddy',
        icon: Palette,
        status: 'live',
      },
      {
        id: 'office-fengshui-detector',
        name: '办公室风水检测器',
        shortName: '工位风水',
        description: '看看您的工位风水如何',
        path: '/tools/office-fengshui-detector',
        icon: Wind,
        status: 'live',
      },
      {
        id: 'office-outfit-advisor',
        name: '职场穿搭顾问',
        shortName: '穿搭顾问',
        description: '根据场合和风格提供穿搭建议',
        path: '/tools/office-outfit-advisor',
        icon: Shirt,
        status: 'live',
      },
      {
        id: 'sanity-check-meter',
        name: '下班前精神状态检查器',
        shortName: '精神状态',
        description: '测测您下班前的精神状态',
        path: '/tools/sanity-check-meter',
        icon: Activity,
        status: 'live',
      },
      {
        id: 'universal-excuse-generator',
        name: '万能借口生成器',
        shortName: '万能借口',
        description: '需要请假/迟到/早退的借口吗？',
        path: '/tools/universal-excuse-generator',
        icon: ScrollText,
        status: 'live',
      },
      {
        id: 'awesome-compliment-generator',
        name: '彩虹屁生成器',
        shortName: '彩虹屁',
        description: '(原夸夸生成器) 生成各种赞美词句',
        path: '/tools/awesome-compliment-generator',
        icon: ComplimentIcon,
        status: 'live',
      },
      {
        id: 'bullshit-fortune-telling',
        name: '今日运势（胡说版）',
        shortName: '今日运势',
        description: '今日运势，纯属娱乐',
        path: '/tools/bullshit-fortune-telling',
        icon: HelpingHand,
        status: 'live',
      },
      {
        id: 'daily-grind-affirmations',
        name: '"打工人"每日亿句',
        shortName: '每日亿句',
        description: '每日"正能量"语录',
        path: '/tools/daily-grind-affirmations',
        icon: Repeat,
        status: 'live',
      },
      {
        id: 'daily-slacking-almanac',
        name: '"今日宜摸鱼"黄历',
        shortName: '摸鱼黄历',
        description: '(原今日宜忌) 打工人专属黄历',
        path: '/tools/daily-slacking-almanac',
        icon: CalendarDays,
        status: 'live',
      },
      {
        id: 'impressive-meeting-phrases',
        name: '高大上会议用语',
        shortName: '会议用语',
        description: '生成听起来很专业的会议用语',
        path: '/tools/impressive-meeting-phrases',
        icon: MessageSquareQuote,
        status: 'live',
      },
      {
        id: 'introduction-to-slacking',
        name: '摸鱼学导论',
        description: '系统学习摸鱼的理论与实践',
        path: '/tools/introduction-to-slacking',
        icon: BookOpenText,
        status: 'live',
      },
      {
        id: 'lunch-decision-overlord',
        name: '"今天中午吃啥"选择器',
        shortName: '午餐选择器',
        description: '终结您的午餐选择困难症',
        path: '/tools/lunch-decision-overlord',
        icon: CookingPot,
        status: 'live',
      },
      {
        id: 'meeting-bingo-generator',
        name: '会议摸鱼生成器',
        shortName: '会议Bingo',
        description: '开会不再无聊，来一局Bingo吧',
        path: '/tools/meeting-bingo-generator',
        icon: AppWindow,
        status: 'live',
      },
      {
        id: 'workplace-meme-generator',
        name: '职场 Meme 生成器',
        shortName: '职场Meme',
        description: '快速生成有趣的职场Meme图文',
        path: '/tools/workplace-meme-generator',
        icon: ImagePlus,
        status: 'live',
      },
      {
        id: 'soup-switcher',
        name: '随机鸡汤/毒鸡汤',
        shortName: '鸡汤切换',
        description: '一键切换今日份鸡汤或毒鸡汤',
        path: '/tools/soup-switcher',
        icon: IterationCcw,
        status: 'live',
      },
      {
        id: 'parallel-universe-work-simulator',
        name: '平行宇宙工作模拟器',
        shortName: '平行宇宙模拟',
        description: '探索在不同平行宇宙中的工作体验',
        path: '/tools/parallel-universe-work-simulator',
        icon: Plane,
        status: 'live',
      },
      {
        id: 'electronic-wooden-fish',
        name: '电子木鱼',
        description: '敲一敲，消除工作烦恼',
        path: '/tools/electronic-wooden-fish',
        icon: Fish,
        status: 'live',
      },
      {
        id: 'office-ghost-stories',
        name: '办公室鬼故事',
        description: '上班族专属恐怖故事，提神醒脑',
        path: '/tools/office-ghost-stories',
        icon: Drama,
        status: 'live',
      },
      {
        id: 'work-time-machine',
        name: '时光机工作体验',
        shortName: '时光机',
        description: '体验30年前/后的工作方式',
        path: '/tools/work-time-machine',
        icon: Archive,
        status: 'live',
      },
    ],
  },
  {
    id: 'time-efficiency',
    name: '时间效率',
    icon: Clock,
    description: '管理时间、提升效率、规划个人目标',
    features: [
      {
        id: 'pro-slackers-time-manager',
        name: '摸鱼时钟 Pro',
        shortName: '摸鱼时钟',
        description: '专业的摸鱼时间管理器',
        path: '/tools/pro-slackers-time-manager',
        icon: TimerOff,
        status: 'live',
      },
      {
        id: 'workday-countdown',
        name: '工作日倒计时',
        description: '看看距离下班/周末/假期还有多久',
        path: '/tools/workday-countdown',
        icon: CalendarClock,
        status: 'live',
      },
      {
        id: 'slacking-index-calculator',
        name: '划水指数计算器',
        shortName: '划水指数',
        description: '量化您的摸鱼程度',
        path: '/tools/slacking-index-calculator',
        icon: SlidersHorizontal,
        status: 'live',
      },
      {
        id: 'salary-ticker',
        name: '工资倒推计算器',
        shortName: '工资计算器',
        description: '实时显示"这分钟您赚了多少钱"',
        path: '/tools/salary-ticker',
        icon: Banknote,
        status: 'live',
      },
      {
        id: 'fire-countdown',
        name: '财务自由倒计时',
        shortName: '财务自由',
        description: '按当前储蓄速度计算何时实现财务自由',
        path: '/tools/fire-countdown',
        icon: Landmark,
        status: 'live',
      },
      {
        id: 'procrastination-buster',
        name: '拖延症治疗器',
        shortName: '拖延症治疗',
        description: '将大任务拆解成5分钟小任务',
        path: '/tools/procrastination-buster',
        icon: CheckCircle2,
        status: 'live',
      },
    ],
  },
  {
    id: 'well-being-health',
    name: '身心健康',
    icon: HeartPulse,
    description: '关注职场人的身心健康',
    features: [
      {
        id: 'office-yoga-guide',
        name: '办公室瑜伽指导',
        shortName: '办公室瑜伽',
        description: '适合在工位进行的拉伸和放松动作',
        path: '/tools/office-yoga-guide',
        icon: Dumbbell,
        status: 'live',
      },
      {
        id: 'stealth-spending-log',
        name: '隐形消费追踪',
        shortName: '隐形消费',
        description: '计算奶茶、外卖等小额消费的年度总开销',
        path: '/tools/stealth-spending-log',
        icon: ShoppingCart,
        status: 'live',
      },
      {
        id: 'caffeine-dependency-index',
        name: '咖啡因依赖指数',
        shortName: '咖啡因指数',
        description: '计算您的每日咖啡因摄入量',
        path: '/tools/caffeine-dependency-index',
        icon: Coffee,
        status: 'live',
      },
    ],
  },
];
