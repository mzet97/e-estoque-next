type Customer = {
    name: string;
    docId: string;
    email: string;
    description: string;
    phoneNumber: string;
    idCompanyAddress: string;
    customerAddress: {
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
        id: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
    };
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};

export default Customer;
