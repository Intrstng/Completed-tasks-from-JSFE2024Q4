import { CONSTANTS } from '../state/initial-state';

export function sliceNameLength(text: string): string {
  return text.length > CONSTANTS.userNameLength ? `${text.slice(0, CONSTANTS.userNameLength
  )}...` : text;
}