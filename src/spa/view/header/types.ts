import type { Pages } from '../../../types';
import type LinkView from './link/link-view';

export type PageParameters = {
    name: Pages;
    callback: () => void;
};

export type LinkElements = Map<Pages, LinkView>;
