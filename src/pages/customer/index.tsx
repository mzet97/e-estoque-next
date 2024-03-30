import canAccess from '@/components/CanAccess/CanAccess';
import Customer from '@/models/Customer/Customer';
import PagedResult from '@/models/Result/PagedResult';
import { api } from '@/services/apiClient';
import { findAllCustomers } from '@/services/customersServices';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function CustomerPage() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [pagedResult, setPagedResult] = useState<PagedResult>();

    const getData = useCallback(async () => {
        const reuslt = await findAllCustomers();
        if (reuslt) {
            setCustomers([...reuslt.data]);
            setPagedResult(reuslt.pagedResult);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Customer/${id}`)
            .then(response => {
                router.push('/customer/');
            })
            .catch(err => {});
    };
    const handleEdit = (id: string) => {
        router.push('/customer/' + id);
    };

    const handleCreate = () => {
        router.push('/customer/create');
    };

    return <></>;
}
export default canAccess(CustomerPage);
