export interface Message {
  id: string;
  content: string;
  type: 'text' | 'media';
  sender: 'user' | 'bot';
  timestamp: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'chart' | 'card';
}

export interface ChatCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  data?: Record<string, any>;
  type: 'crypto' | 'news' | 'alert';
}