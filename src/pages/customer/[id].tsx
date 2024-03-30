import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';
import EditCustomer from '@/models/Customer/EditCustomer';
import { useCallback, useEffect, useState } from 'react';
import { useRouter as useQueryRouter } from 'next/router';
import { findEditCustomerById } from '@/services/customersServices';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    idCustomerAddress: yup.string().required().min(3).max(80),
    id: yup.string().required().min(3).max(80),
    customerAddress: yup.object({
        street: yup.string().required().min(3).max(80),
        number: yup.string().required().min(3).max(80),
        complement: yup.string().required().min(3).max(80),
        neighborhood: yup.string().required().min(3).max(80),
        district: yup.string().required().min(3).max(80),
        city: yup.string().required().min(3).max(80),
        county: yup.string().required().min(3).max(80),
        zipCode: yup.string().required().min(3).max(80),
        latitude: yup.string().required().min(3).max(80),
        longitude: yup.string().required().min(3).max(80),
    }),
});

export default function EditCustomerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCustomer>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const router = useRouter();
    const queryRouter = useQueryRouter();
    const [customer, setCustomer] = useState<EditCustomer>();

    const onSubmit = async (values: EditCustomer) => {
        try {
            console.log('input', values);
            await api.post('Customer', values);

            router.push('/customer');
        } catch (err) {}
    };

    const getData = useCallback(async () => {
        const { id } = queryRouter.query;
        const result = await findEditCustomerById(id + '');

        if (result) {
            setCustomer(result);
        }
    }, [queryRouter.query]);

    useEffect(() => {
        getData();
    }, [getData]);

    return <></>;
}
