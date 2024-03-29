import canAccess from '@/components/CanAccess/CanAccess';
import Customer from '@/models/Customer/Customer';
import PagedResult from '@/models/Result/PagedResult';
import { api } from '@/services/apiClient';
import { findAllCustomers } from '@/services/customersServices';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Table,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Container,
    Stack,
    Text,
    Heading,
    HStack,
    Button,
    Tooltip,
    IconButton,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function CustomerPage() {
    const toast = useToast();
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
                toast({
                    title: 'Success delte customer.',
                    description: 'Customer delte with success.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                router.push('/customer/');
            })
            .catch(err => {
                toast({
                    title: 'Failure to delte a customer.',
                    description: 'Error to delte a customer.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };
    const handleEdit = (id: string) => {
        router.push('/customer/' + id);
    };

    const handleCreate = () => {
        router.push('/customer/create');
    };

    return (
        <>
            <Stack padding={10}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading as="h1" size="xl">
                        List of customers
                    </Heading>
                    <Button colorScheme="green" onClick={() => handleCreate()}>
                        Create a new customer
                    </Button>
                </HStack>

                {customers.length === 0 ? (
                    <Container>
                        <Text>Loading...</Text>
                        <Spinner size="xl" />
                    </Container>
                ) : (
                    <Table variant="striped" colorScheme="green" size="lg">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Text>id</Text>
                                </Th>
                                <Th>
                                    <Text>Name</Text>
                                </Th>
                                <Th>
                                    <Text>DocId</Text>
                                </Th>
                                <Th>
                                    <Text>Email</Text>
                                </Th>
                                <Th>
                                    <Text>Description</Text>
                                </Th>
                                <Th>
                                    <Text>Phone Number</Text>
                                </Th>
                                <Th>
                                    <Text>idCustomerAddress</Text>
                                </Th>
                                <Th>
                                    <Text>Created Date</Text>
                                </Th>
                                <Th>
                                    <Text>Updated Date</Text>
                                </Th>
                                <Th>
                                    <Text>Deleted Date</Text>
                                </Th>
                                <Th>
                                    <Text>Actions</Text>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {customers.map(customer => {
                                return (
                                    <Tr key={customer.id}>
                                        <Td>{customer.id}</Td>
                                        <Td>{customer.name}</Td>
                                        <Td>{customer.docId}</Td>
                                        <Td>{customer.email}</Td>
                                        <Td>{customer.description}</Td>
                                        <Td>{customer.phoneNumber}</Td>
                                        <Td>{customer.idCompanyAddress}</Td>
                                        <Td>{customer.createdAt}</Td>
                                        <Td>{customer.updatedAt}</Td>
                                        <Td>{customer.deletedAt}</Td>
                                        <Td>
                                            <HStack padding={5} align="center">
                                                <Tooltip
                                                    hasArrow
                                                    label="Edit category"
                                                >
                                                    <IconButton
                                                        colorScheme="blue"
                                                        aria-label="Edit category"
                                                        icon={<EditIcon />}
                                                        onClick={() =>
                                                            handleEdit(
                                                                customer.id,
                                                            )
                                                        }
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    hasArrow
                                                    label="Delete category"
                                                >
                                                    <IconButton
                                                        colorScheme="red"
                                                        aria-label="Delete category"
                                                        icon={<DeleteIcon />}
                                                        onClick={() =>
                                                            handleDelete(
                                                                customer.id,
                                                            )
                                                        }
                                                    />
                                                </Tooltip>
                                            </HStack>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>
                                    <Text>id</Text>
                                </Th>
                                <Th>
                                    <Text>Name</Text>
                                </Th>
                                <Th>
                                    <Text>DocId</Text>
                                </Th>
                                <Th>
                                    <Text>Email</Text>
                                </Th>
                                <Th>
                                    <Text>Description</Text>
                                </Th>
                                <Th>
                                    <Text>Phone Number</Text>
                                </Th>
                                <Th>
                                    <Text>idCustomerAddress</Text>
                                </Th>
                                <Th>
                                    <Text>Created Date</Text>
                                </Th>
                                <Th>
                                    <Text>Updated Date</Text>
                                </Th>
                                <Th>
                                    <Text>Deleted Date</Text>
                                </Th>
                                <Th>
                                    <Text>Actions</Text>
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                )}
                <HStack>
                    <Text>Current page {pagedResult?.currentPage}</Text>
                    <Text>Page count {pagedResult?.pageCount}</Text>
                    <Text>Page size {pagedResult?.pageSize}</Text>
                    <Text>Row count {pagedResult?.rowCount}</Text>
                    <Text>Frist page {pagedResult?.firstRowOnPage}</Text>
                    <Text>Last page {pagedResult?.lastRowOnPage}</Text>
                </HStack>
            </Stack>
        </>
    );
}
export default canAccess(CustomerPage);
