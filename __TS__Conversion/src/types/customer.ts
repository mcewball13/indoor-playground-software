export type CustomerGuardian = {
    guardianFirstName: string;
    guardianLastName: string;
    email: string;
    birthday: any | null;
    password: string;
    phoneNumber: string;
    addressStreet: string;
    addressState: string;
    addressCity: string;
    addressZipCode: string;
    photoURL: string;
    isBanned: boolean;
    status: string;
    minorFirstName: string;
    minorLastName: string;
    minorBirthday: any | null;
};

export type CustomerMinor = {
    minorFirstName: string;
    minorLastName: string;
    minorBirthday: any | null;
};