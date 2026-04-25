// ============================================================
// DABBLE — SHARED TYPE DEFINITIONS
// TypeScript strict mode — no any, no implicit types
// Branded types prevent ID mix-ups at compile time
// ============================================================

// ----- Branded ID Types -----
type Brand<T, B extends string> = T & { readonly __brand: B };

export type UserId       = Brand<string, 'UserId'>;
export type BusinessId   = Brand<string, 'BusinessId'>;
export type EventId      = Brand<string, 'EventId'>;
export type AttendanceId = Brand<string, 'AttendanceId'>;
export type IntentionId  = Brand<string, 'IntentionId'>;
export type MessageId    = Brand<string, 'MessageId'>;

export const toUserId       = (id: string): UserId       => id as UserId;
export const toBusinessId   = (id: string): BusinessId   => id as BusinessId;
export const toEventId      = (id: string): EventId      => id as EventId;
export const toAttendanceId = (id: string): AttendanceId => id as AttendanceId;
export const toIntentionId  = (id: string): IntentionId  => id as IntentionId;
export const toMessageId    = (id: string): MessageId    => id as MessageId;

// ----- Domain Constants (const objects, never TypeScript enum) -----
export const AttendanceStatus = {
  GOING:      'going',
  INTERESTED: 'interested',
} as const;
export type AttendanceStatus = typeof AttendanceStatus[keyof typeof AttendanceStatus];

export const ExperienceLevel = {
  BEGINNER:    'beginner',
  CASUAL:      'casual',
  EXPERIENCED: 'experienced',
} as const;
export type ExperienceLevel = typeof ExperienceLevel[keyof typeof ExperienceLevel];

export const EventCategory = {
  MUSIC:      'music',
  ART:        'art',
  FOOD_DRINK: 'food_drink',
  SPORTS:     'sports',
  NIGHTLIFE:  'nightlife',
  OUTDOOR:    'outdoor',
  GAMING:     'gaming',
  SOCIAL:     'social',
} as const;
export type EventCategory = typeof EventCategory[keyof typeof EventCategory];

// ----- Core Domain Models -----
export interface Profile {
  readonly id: UserId;
  readonly email?: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  interests: string[];
  neighborhood: string | null;
  readonly created_at: string;
}

export interface Business {
  readonly id: BusinessId;
  name: string;
  address: string;
  borough: string;
  category: EventCategory;
  description: string | null;
  website: string | null;
  instagram: string | null;
  readonly created_at: string;
}

export interface DabbleEvent {
  readonly id: EventId;
  readonly business_id: BusinessId;
  title: string;
  description: string | null;
  category: EventCategory;
  event_date: string;
  event_time: string;
  cover_image_url: string | null;
  capacity: number | null;
  readonly created_at: string;
  // Joined fields populated by queries
  business?: Business;
  attendee_count?: number;
  user_attendance?: AttendanceStatus | null;
}

export interface Attendance {
  readonly id: AttendanceId;
  readonly user_id: UserId;
  readonly event_id: EventId;
  status: AttendanceStatus;
  readonly created_at: string;
  profile?: Profile;
}

export interface Intention {
  readonly id: IntentionId;
  readonly user_id: UserId;
  readonly event_id: EventId;
  message: string;
  experience_level: ExperienceLevel;
  readonly created_at: string;
  profile?: Profile;
}

export interface Message {
  readonly id: MessageId;
  readonly sender_id: UserId;
  readonly receiver_id: UserId;
  readonly event_id: EventId;
  content: string;
  read: boolean;
  readonly created_at: string;
  sender?: Profile;
}

// ----- Async State Machine (discriminated union) -----
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// ----- Auth -----
export interface AuthUser {
  readonly id: UserId;
  readonly email: string;
  profile: Profile | null;
}

// ----- Navigation -----
export type RootStackParamList = {
  MainTabs: undefined;
  EventDetail: { eventId: EventId };
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: { userId?: UserId };
};
