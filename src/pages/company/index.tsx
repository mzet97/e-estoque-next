import Company from '@/models/Company/Company';
import Category from '@/models/category/Category';
import { api } from '@/services/apiClient';
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Table,
    TableCaption,
    TableContainer,
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
import { useEffect, useState } from 'react';

export default function CompanyPage() {
    const toast = useToast();
    const router = useRouter();
    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        api.get(`Company`).then(response => {
            console.log('effect', response.data);
            response.data.data.forEach((company: Company) => {
                companies.push(company);
                setCompanies([...companies]);
            });
        });
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`Company/${id}`)
            .then(response => {
                toast({
                    title: 'Success delte company.',
                    description: 'Company delte with success.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                router.push('/company/');
            })
            .catch(err => {
                toast({
                    title: 'Failure to delte a company.',
                    description: 'Error to delte a company.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };
    const handleEdit = (id: string) => {
        router.push('/company/' + id);
    };

    const handleCreate = () => {
        router.push('/company/create');
    };

    return (
        <>
            <Stack padding={10}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading as="h1" size="xl">
                        List of companies
                    </Heading>
                    <Button colorScheme="green" onClick={() => handleCreate()}>
                        Create a new company
                    </Button>
                </HStack>

                {companies.length === 0 ? (
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
                                    <Text>phoneNumber</Text>
                                </Th>
                                <Th>
                                    <Text>idCompanyAddress</Text>
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
                            {companies.map(company => {
                                return (
                                    <Tr key={company.id}>
                                        <Td>{company.id}</Td>
                                        <Td>{company.name}</Td>
                                        <Td>{company.docId}</Td>
                                        <Td>{company.email}</Td>
                                        <Td>{company.description}</Td>
                                        <Td>{company.phoneNumber}</Td>
                                        <Td>{company.idCompanyAddress}</Td>
                                        <Td>{company.createdAt}</Td>
                                        <Td>{company.updatedAt}</Td>
                                        <Td>{company.deletedAt}</Td>
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
                                                                company.id,
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
                                                                company.id,
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
                                    <Text>phoneNumber</Text>
                                </Th>
                                <Th>
                                    <Text>idCompanyAddress</Text>
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
            </Stack>
        </>
    );
}
