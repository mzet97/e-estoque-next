import canAccess from '@/components/CanAccess/CanAccess';
import PagedResult from '@/models/Result/PagedResult';
import Tax from '@/models/Tax/Tax';
import { api } from '@/services/apiClient';
import { findAllTaxs } from '@/services/taxServices';
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

function TaxPage() {
    const toast = useToast();
    const router = useRouter();
    const [taxs, setTaxs] = useState<Tax[]>([]);
    const [pagedResult, setPagedResult] = useState<PagedResult>();

    const getData = useCallback(async () => {
        const reuslt = await findAllTaxs();
        if (reuslt) {
            setTaxs([...reuslt.data]);
            setPagedResult(reuslt.pagedResult);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Tax/${id}`)
            .then(response => {
                toast({
                    title: 'Success delte tax.',
                    description: 'Tax delte with success.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                router.push('/tax/');
            })
            .catch(err => {
                toast({
                    title: 'Failure to delte a tax.',
                    description: 'Error to delte a tax.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };
    const handleEdit = (id: string) => {
        router.push('/tax/' + id);
    };

    const handleCreate = () => {
        router.push('/tax/create');
    };

    return (
        <>
            <Stack padding={10}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading as="h1" size="xl">
                        List of taxs
                    </Heading>
                    <Button colorScheme="green" onClick={() => handleCreate()}>
                        Create a new tax
                    </Button>
                </HStack>

                {taxs.length === 0 ? (
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
                                    <Text>Description</Text>
                                </Th>
                                <Th>
                                    <Text>Percentage</Text>
                                </Th>
                                <Th>
                                    <Text>Category</Text>
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
                            {taxs.map(tax => {
                                return (
                                    <Tr key={tax.id}>
                                        <Td>{tax.id}</Td>
                                        <Td>{tax.name}</Td>
                                        <Td>{tax.description}</Td>
                                        <Td>{tax.percentage}</Td>
                                        <Td>{tax.category.name}</Td>
                                        <Td>{tax.createdAt}</Td>
                                        <Td>{tax.updatedAt}</Td>
                                        <Td>{tax.deletedAt}</Td>
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
                                                            handleEdit(tax.id)
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
                                                            handleDelete(tax.id)
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
                                    <Text>Description</Text>
                                </Th>
                                <Th>
                                    <Text>Percentage</Text>
                                </Th>
                                <Th>
                                    <Text>Category</Text>
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

export default canAccess(TaxPage);
