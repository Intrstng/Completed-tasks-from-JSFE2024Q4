import { Pages } from '../../../types';
import LinkView from './link/link-view';

export type PageParameters = {
    name: Pages;
    callback: () => void;
};

export type LinkElements = Map<Pages, LinkView>;
