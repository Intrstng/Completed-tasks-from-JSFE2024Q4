import type { FooterLinks } from '../spa/view/footer/types';
import { COLORS } from './color-constants';

export const footerLinks: FooterLinks = {
    RS: {
        link: 'https://rs.school/',
        color: COLORS.logo,
        viewBox: '0 0 73 26',
        svgID: 'rs',
    },
    GIT: {
        link: 'https://github.com/Intrstng',
        color: COLORS.logo,
        viewBox: '0 0 32 32',
        svgID: 'git',
    },
};

export const COPYRIGHT = 'Minsk 2025';
