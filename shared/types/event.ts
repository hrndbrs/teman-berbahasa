export interface EventDate {
  start: string;
  end: string;
}

export interface TbEvent {
  id: number;
  title: string;
  description: string;
  dates: EventDate[];
  platform: string;
  duration: number;
  tag: string;
  speaker: string;
  image: string;
  speaker_image: string;
}

/** Minimal event type for footer/navigation */
export type EventSummary = Pick<TbEvent, 'id' | 'title'>;

/** View model consumed by the marketing site, derived from `TbEvent`. */
export interface MiniCourse {
  id: number;
  tag: string;
  title: string;
  description: string;
  meta: string;
  dates: string[];
  speaker: string;
  image: string;
  past: boolean;
}
