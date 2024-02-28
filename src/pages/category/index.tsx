import canAccess from '@/components/CanAccess/CanAccess';
import Category from '@/models/category/Category';
import { api } from '@/services/apiClient';
import { findAllCategories } from '@/services/categoriesServices';
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
import { useCallback, useEffect, useState } from 'react';

function CategoryPage() {
    const toast = useToast();
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    const getData = useCallback(async () => {
        const reuslt = await findAllCategories();
        if (reuslt) {
            setCategories([...reuslt]);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Category/${id}`)
            .then(response => {
                toast({
                    title: 'Success delte  category.',
                    description: 'Category delte with success.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                router.push('/category/');
            })
            .catch(err => {
                toast({
                    title: 'Failure to delte a category.',
                    description: 'Error to delte a category.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };
    const handleEdit = (id: string) => {
        router.push('/category/' + id);
    };

    const handleCreate = () => {
        router.push('/category/create');
    };

    return (
        <>
            <Stack padding={10}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading as="h1" size="xl">
                        List of categories
                    </Heading>
                    <Button colorScheme="green" onClick={() => handleCreate()}>
                        Create a new Category
                    </Button>
                </HStack>

                {categories.length === 0 ? (
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
                                    <Text>Short Description</Text>
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
                            {categories.map(category => {
                                return (
                                    <Tr key={category.id}>
                                        <Td>{category.id}</Td>
                                        <Td>{category.name}</Td>
                                        <Td>{category.description}</Td>
                                        <Td>{category.shortDescription}</Td>
                                        <Td>{category.createdAt}</Td>
                                        <Td>{category.updatedAt}</Td>
                                        <Td>{category.deletedAt}</Td>
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
                                                                category.id,
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
                                                                category.id,
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
                                    <Text>Name</Text>
                                </Th>
                                <Th>
                                    <Text>Short Description</Text>
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

export default canAccess(CategoryPage);
