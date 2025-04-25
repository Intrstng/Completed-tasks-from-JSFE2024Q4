export type AboutContent = {
    TITLE: string;
    NAME: string;
    DESCRIPTION_TITLE: string;
    DESCRIPTION_LIST: string[];
    DESCRIPTION_ADD: string;
    LINK_COLOR: string;
    VIEWBOX: string;
};

export type AboutLinks = {
    GIT: AboutLink;
};

export type AboutLink = {
    link: string;
    color: string;
    viewBox: string;
    svgID: string;
};
