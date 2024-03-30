import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';
import CreateCustomer from '@/models/Customer/CreateCustomer';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    Address: yup.object({
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

export default function CreateCustomerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCustomer>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const onSubmit = async (values: CreateCustomer) => {
        try {
            console.log('input', values);
            await api.post('Customer', values);

            router.push('/customer');
        } catch (err) {}
    };

    return <></>;
}
