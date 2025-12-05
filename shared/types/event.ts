export interface EventDate {
  start: string;
  end: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  dates: EventDate[];
  platform: string;
  duration: number;
  image: string;
  speaker_image: string;
}

/** Minimal event type for footer/navigation */
export type EventSummary = Pick<Event, 'id' | 'title'>;
