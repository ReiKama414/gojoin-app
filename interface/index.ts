export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  eventsAttended: number;
  memberSince: string;
}

export interface EventDetails {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  image: string;
  organizer: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  rating: number;
  price: string;
  tags: string[];
  highlights: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  qrCode: string;
  reminderSet: boolean;
  featured?: boolean;
}
