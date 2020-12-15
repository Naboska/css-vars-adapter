import { MAIN_ELEMENT } from '../constants';

export const getVariable = (key: string) => getComputedStyle(MAIN_ELEMENT).getPropertyValue(key);
