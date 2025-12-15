export type LandingPageOrgProfileResponse = {
    success: boolean;
    status: string;
    message: string;
    data: LandingPageOrgProfileData;
}

export type LandingPageOrgProfileData = {
    key: string;
    value: string;
}

export type LandingPageAppResponse = {
    success: boolean;
    status: string;
    message: string;
    data: LandingPageAppData[];
}

export type LandingPageAppData = {
    icon_url: string;
    slug: string;
    name: string;
    short_description: string;
    description: string;
    playstore_url: string;
    appstore_url: string;
    terms: {
        name: string;
        slug: string;
    }[]
}

export type LandingPageTeamResponse = {
    success: boolean;
    status: string;
    message: string;
    data: LandingPageTeamData[];
}

export type LandingPageTeamData = {
    name: string;
    title: string;
    social_media: {
        icon: string;
        name: string;
        username: string;
    }[];
}


export type LandingPageTermAppResponse = {
    success: boolean;
    status: string;
    message: string;
    data: LandingPageTermAppData;
}

export type LandingPageTermAppData = {
    app: {
        name: string;
        icon_url: string;
        short_description: string;
        playstore_url: string;
        appstore_url: string;
    };
    term: {
        name: string;
        content: string;
    };
}

