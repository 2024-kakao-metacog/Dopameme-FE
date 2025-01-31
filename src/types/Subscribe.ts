export interface Subscription {
  id: number;
  followedUserId: string;
  followedNickname: string;
  createdAt: string;
}

export interface SubscriptionState {
  subscriptions: Subscription[];
}
