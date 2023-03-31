export interface NotificationPreferences {
  channel: string;
  type: 'EMAIL' | 'TEXT' | 'PUSH';
  text: string;
  on: boolean;
}

export interface LegalLinks {
  link: string;
  display: string;
}

export interface ProfileData {
  displayName: string;
  notificationPreferences: NotificationPreferences[];
  links: LegalLinks[];
}
