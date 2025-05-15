export interface UserInitialState {
   isLoggedIn: boolean;
   isModerator: boolean;

   signupLoading: boolean;
   signupDone: boolean;
   signupError: string | unknown;

   loginLoading: boolean;
   loginDone: boolean;
   loginError: string | unknown;

   user: User;
};


export interface providerData {
   uid: string,
   email: string,
   providerId: string
   photoURL?: string
   displayName?: string
   phoneNumber?: string
}


export interface Metadata {
   lastSignInTime: string,
   creationTime: string,
   lastRefreshTime: string
}

export interface UserPayload {
   message: string;
   status: number;
   data: User
}

export interface User {
   uid: string,
   email: string,
   emailVerified: boolean,
   disabled?: boolean,
   metadata: Metadata
   tokensValidAfterTime?: string
   providerData: providerData[]
}



export interface SignupUser {
   id: string;
   password: string;
   email: string;
   name: string;
   question: object;
   gender: string;
   birthday: string
}


