/**
 * Gamification Utility for Fun Zone
 * Handles XP, Levels, Streaks, and Achievement logic with LocalStorage persistence.
 */

const STORAGE_KEY = 'dakh_funzone_stats';

const INITIAL_STATS = {
    xp: 0,
    level: 1,
    gamesPlayed: 0,
    bestScores: {}, // { gameId: score }
    achievements: [],
    claimedRewards: [], // Array of level IDs
    coupons: [], // Array of { level, code, reward }
    lastPlayedDate: null,
    streak: 0,
};

export const getStats = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_STATS;
    const stats = JSON.parse(stored);
    // Ensure new fields exist for legacy data
    return { ...INITIAL_STATS, ...stats };
};

export const saveStats = (stats) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};

// XP_required = 120 * (level ^ 1.6)
// Max Level = 100
export const calculateLevel = (xp) => {
    if (xp < 120) return 1;
    // level = (xp / 120) ^ (1 / 1.6)
    const level = Math.floor(Math.pow(xp / 120, 1 / 1.6)) + 1;
    return Math.min(100, level); // Cap at 100
};

export const getXPForLevel = (level) => {
    if (level <= 1) return 0;
    return Math.floor(120 * Math.pow(level - 1, 1.6));
};

export const getXPForNextLevel = (currentLevel) => {
    if (currentLevel >= 100) return Infinity;
    return Math.floor(120 * Math.pow(currentLevel, 1.6));
};

export const REWARDS = [
    { level: 5, label: '5% Discount', type: 'coupon', value: '5' },
    { level: 10, label: '10% Discount', type: 'coupon', value: '10' },
    { level: 20, label: 'Free Resume Review', type: 'service', value: 'RESUME_REVIEW' },
    { level: 30, label: '50% Internship Discount', type: 'coupon', value: '50' },
    { level: 50, label: 'Free Course Access', type: 'access', value: 'FREE_COURSE' },
    { level: 100, label: 'Grand Master Certification', type: 'rank', value: 'CERTIFIED' },
];

const generateCoupon = (level) => {
    const random = Math.floor(100 + Math.random() * 899);
    return `DAKH-LVL${level}-${random}`;
};

// Simple guard to prevent processing the same result twice within a very short window (HMR / React.Strict effects)
let lastProcessedTime = 0;

export const addGameResult = (gameId, score) => {
    const now = Date.now();
    if (now - lastProcessedTime < 200) return { earnedXP: 0, leveledUp: false };
    lastProcessedTime = now;

    const stats = getStats();
    
    // XP = score * multiplier (differs by game)
    const multiplier = gameId === 'logic-vault' ? 0.05 : (gameId === 'typed-flow' ? 0.02 : 0.03);
    let earnedXP = Math.floor(score * multiplier);
    
    // MAX XP CAP: 150 per game (Updated as requested)
    earnedXP = Math.min(150, Math.max(5, earnedXP));
    
    stats.xp += earnedXP;
    
    // Calculate new level
    const newLevel = calculateLevel(stats.xp);
    const leveledUp = newLevel > stats.level;
    
    let unlockedReward = null;
    if (leveledUp) {
        // Check for new rewards
        const reward = REWARDS.find(r => r.level <= newLevel && r.level > stats.level);
        if (reward && !stats.claimedRewards.includes(reward.level)) {
            const coupon = generateCoupon(reward.level);
            unlockedReward = { ...reward, coupon };
            stats.coupons.push({ level: reward.level, code: coupon, label: reward.label });
            stats.claimedRewards.push(reward.level);
        }
    }
    
    stats.level = newLevel;
    stats.gamesPlayed += 1;

    // Update Best Score
    if (!stats.bestScores[gameId] || score > stats.bestScores[gameId]) {
        stats.bestScores[gameId] = score;
    }

    // Update Streak
    const today = new Date().toDateString();
    const lastDate = stats.lastPlayedDate ? new Date(stats.lastPlayedDate).toDateString() : null;
    
    if (lastDate !== today) {
        if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
            stats.streak += 1;
        } else {
            stats.streak = 1;
        }
        stats.lastPlayedDate = Date.now();
    }

    // Check Achievements
    const newAchievements = checkAchievements(gameId, score, stats);
    stats.achievements = [...new Set([...stats.achievements, ...newAchievements])];

    saveStats(stats);
    return { earnedXP, leveledUp, newLevel, unlockedReward, newAchievements };
};

const checkAchievements = (gameId, score, stats) => {
    const list = [];
    if (gameId === 'typed-flow' && score >= 1000) list.push('TYPING_MASTER');
    if (gameId === 'logic-vault' && score >= 2000) list.push('LOGIC_PRO');
    if (gameId === 'skill-runner' && score >= 500) list.push('SPEED_DEMON');
    if (stats.streak >= 7) list.push('WEEK_WARRIOR');
    if (stats.level >= 5) list.push('VETERAN_CREATOR');
    return list;
};

export const BADGE_DETAILS = {
    TYPING_MASTER: { icon: 'keyboard', title: 'Typing Master', desc: '1000+ points in TypedFlow', color: 'secondary' },
    LOGIC_PRO: { icon: 'psychology', title: 'Logic Pro', desc: '2000+ points in LogicVault', color: 'tertiary' },
    SPEED_DEMON: { icon: 'directions_run', title: 'Speed Demon', desc: '500+ points in SkillRunner', color: 'primary' },
    WEEK_WARRIOR: { icon: 'calendar_month', title: 'Week Warrior', desc: '7-day login streak', color: 'primary' },
    VETERAN_CREATOR: { icon: 'star', title: 'Veteran Creator', desc: 'Reached Level 5', color: 'secondary' },
};
