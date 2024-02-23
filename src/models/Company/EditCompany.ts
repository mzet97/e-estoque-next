type EditCompany = {
    name: string;
    docId: string;
    email: string;
    description: string;
    phoneNumber: string;
    idCompanyAddress: string;
    companyAddress: {
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
    id: string;
};

export default EditCompany;
