export interface registerProps {
    fullname: string;
    email: string;
    password: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface response {
    statusCode: number;
    data: {
        user: {
            profile_info: {
                fullname: string;
                email: string;
                password: string;
                bio: string;
                avatar: string;
                refreshToken: string;
            };
            social_Links: {
                youtube: string;
                instagram: string;
                facebook: string;
                twitter: string;
                github: string;
                website: string;
            };
            account_info: {
                posts: number;
                reads: number;
            };
            _id: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    };
    message: string;
    success: boolean;
}

export interface InitialState {
    loading: boolean;
    userInfo: {
        profile_info: {
            fullname: string;
            email: string;
            password: string;
            bio: string;
            avatar: string;
        };
        social_Links: {
            youtube: string;
            instagram: string;
            facebook: string;
            twitter: string;
            github: string;
            website: string;
        };
        account_info: {
            posts: number;
            reads: number;
        };
        _id: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    userToken: {
        accessToken: string;
        refreshToken: string;
    };
    error: Error | null;
    success: boolean;
}