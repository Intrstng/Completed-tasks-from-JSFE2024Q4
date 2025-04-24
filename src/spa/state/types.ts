import { AppStateKeys } from '../../types';
import { Message, User } from '../api/types';

export type SubscriberCallback = (state: AppState) => void

export type AppState = {
  [AppStateKeys.IS_LOGGED]: boolean;
  [AppStateKeys.CURRENT_USER_NAME]: string;
  [AppStateKeys.CURRENT_USER_PASS]: string;
  [AppStateKeys.CURRENT_CONTACT]: User;
  [AppStateKeys.MESSAGE_HISTORY]: Message[]
  [AppStateKeys.CURRENT_MESSAGE]: string;
  [AppStateKeys.ONLINE_USERS]: User[];
  [AppStateKeys.OFFLINE_USERS]: User[];
};