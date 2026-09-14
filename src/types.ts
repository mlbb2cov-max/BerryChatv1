export type AppMode = 'chat' | 'real' | 'story';
export type AppLanguage = 'en' | 'my';

/** Genre of an interactive Story Mode adventure (Endless Adventure / CYOA). */
export type StoryGenre = 'scifi' | 'fantasy' | 'slice' | 'horror' | 'random';

/** A saved, resumable Story Mode session. Fully separate from character chats. */
export interface StorySession {
  id: string;
  title: string;
  genre: StoryGenre;
  /** Optional user-typed free-form genre/premise for the adventure. */
  premise?: string;
  createdAt: number;
  updatedAt: number;
  /** True once the opening scene has been generated. */
  started: boolean;
  messages: ChatMessage[];
  /** The current 3 AI-suggested actions rendered as clickable chips. */
  lastActions: string[];
}

export interface CharacterLocaleFields {
  name?: string;
  personality: string;
  backstory: string;
  speakingStyle: string;
  relationship: string;
  traits?: string[];
  customPrompt?: string;
  initialChatGreeting?: string;
  initialMeetGreeting?: string;
  memories?: string[];
}

export interface MessagePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string; // base64
  };
}

export interface Bookmark {
  id: string;
  msgId: string;
  sessionId: string;
  text: string;
  date: string;
  time: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  parts?: MessagePart[];
  timestamp: number;
  time?: string;
  date?: string;
  mode: AppMode;
  read?: boolean;
  isEncounterCard?: boolean;
  encounterId?: string;
  encounterTitle?: string;
  encounterSetting?: string;
  encounterSummary?: string;
  encounterEndedAt?: number;
}

export interface Session {
  id: string;
  name: string;
  createdAt: number;
  messages: ChatMessage[];
}

export interface MeetEncounter {
  id: string;
  characterId: string;
  title: string;
  setting: string;
  startedAt: number;
  endedAt?: number;
  summary: string;
  messages: ChatMessage[];
  status: 'active' | 'ended';
}

export interface Character {
  id: string;
  name: string;
  avatar: string;
  wallpaper?: string;
  personality: string;
  backstory: string;
  speakingStyle: string;
  relationship: string;
  traits?: string[];
  /**
   * Per-language copy of this companion's descriptive fields. The UI renders the
   * entry matching the active language so Myanmar mode never shows English prose.
   */
  locales?: {
    en?: CharacterLocaleFields;
    my?: CharacterLocaleFields;
  };
  model?: string;
  systemPrompt?: string;
  customPrompt?: string;
  memories?: string[];
  level: number;
  affection: number; // 0 to 100
  trust: number;     // 0 to 100
  streak: number;    // consecutive days
  lastChatDate?: string | null;
  liked?: boolean;
  bookmarks?: Bookmark[];
  sessions: Session[];
  activeSessionId: string;
  activeMeetEncounter?: MeetEncounter | null;
  pastEncounters?: MeetEncounter[];
  createdAt: number;
  lastActivityTimestamp?: number;
  isDefault?: boolean;
  hasChatted?: boolean;
  /** Warning tag labels (e.g. "🔴 Red Flag") rendered as a badge on the character card */
  tags?: string[];
  /** When true, the companion stays cold/dismissive/condescending by default and only softens if the user earns it (used by the red-flag characters) */
  rude?: boolean;
  initialChatGreeting?: string;
  initialMeetGreeting?: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  bio: string;
}

export interface RealModeEncounter {
  id: string;
  characterId: string;
  title: string;
  startedAt: number;
  chatContextSnapshot: string;
  messages: ChatMessage[];
}

export interface KeyHealthInfo {
  lastUsed: number | null;
  successCount: number;
  failCount: number;
  lastError: string | null;
}
