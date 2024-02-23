type CreateCompany = {
    name: string;
    docId: string;
    email: string;
    description: string;
    phoneNumber: string;
    Address: {
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        district: string;
        city: string;
        county: string;
        zipCode: string;
        latitude: string;
        longitude: string;
    };
};

export default CreateCompany;
