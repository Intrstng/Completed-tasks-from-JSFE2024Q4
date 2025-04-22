import { CONSTANTS_KEYS } from '../api/types';
import { API_CONSTANTS } from '../api/api-constants';

export function sliceNameLength(text: string): string {
  return text.length > API_CONSTANTS[CONSTANTS_KEYS.USER_NAME_LENGTH] ? `${text.slice(0, API_CONSTANTS[CONSTANTS_KEYS.USER_NAME_LENGTH]
  )}...` : text;
}