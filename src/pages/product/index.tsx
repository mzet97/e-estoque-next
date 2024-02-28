import canAccess from '@/components/CanAccess/CanAccess';
import Product from '@/models/Product/Product';
import PagedResult from '@/models/Result/PagedResult';
import { api } from '@/services/apiClient';
import { findAllProducts } from '@/services/productsServices';
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

function ProductPage() {
    const toast = useToast();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [pagedResult, setPagedResult] = useState<PagedResult>();

    const getData = useCallback(async () => {
        const reuslt = await findAllProducts();
        if (reuslt) {
            setProducts([...(reuslt.data as Product[])]);
            setPagedResult(reuslt.pagedResult);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Product/${id}`)
            .then(response => {
                toast({
                    title: 'Success delte product.',
                    description: 'Product delte with success.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                router.push('/product/');
            })
            .catch(err => {
                toast({
                    title: 'Failure to delte a product.',
                    description: 'Error to delte a product.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };
    const handleEdit = (id: string) => {
        router.push('/product/' + id);
    };

    const handleCreate = () => {
        router.push('/product/create');
    };

    return (
        <>
            <Stack padding={10}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading as="h1" size="xl">
                        List of Products
                    </Heading>
                    <Button colorScheme="green" onClick={() => handleCreate()}>
                        Create a new Product
                    </Button>
                </HStack>

                {products.length === 0 ? (
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
                                    <Text>Price</Text>
                                </Th>
                                <Th>
                                    <Text>Weight</Text>
                                </Th>
                                <Th>
                                    <Text>Height</Text>
                                </Th>
                                <Th>
                                    <Text>Length</Text>
                                </Th>
                                <Th>
                                    <Text>Category</Text>
                                </Th>
                                <Th>
                                    <Text>Company</Text>
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
                            {products.map(product => {
                                return (
                                    <Tr key={product.id}>
                                        <Td>{product.id}</Td>
                                        <Td>{product.name}</Td>
                                        <Td>{product.description}</Td>
                                        <Td>{product.shortDescription}</Td>
                                        <Td>{product.price}</Td>
                                        <Td>{product.weight}</Td>
                                        <Td>{product.height}</Td>
                                        <Td>{product.length}</Td>
                                        <Td>{product.category.name}</Td>
                                        <Td>{product.company.name}</Td>
                                        <Td>{product.createdAt}</Td>
                                        <Td>{product.updatedAt}</Td>
                                        <Td>{product.deletedAt}</Td>
                                        <Td>
                                            <HStack padding={5} align="center">
                                                <Tooltip
                                                    hasArrow
                                                    label="Edit product"
                                                >
                                                    <IconButton
                                                        colorScheme="blue"
                                                        aria-label="Edit product"
                                                        icon={<EditIcon />}
                                                        onClick={() =>
                                                            handleEdit(
                                                                product.id,
                                                            )
                                                        }
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    hasArrow
                                                    label="Delete product"
                                                >
                                                    <IconButton
                                                        colorScheme="red"
                                                        aria-label="Delete product"
                                                        icon={<DeleteIcon />}
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id,
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
                                    <Text>Description</Text>
                                </Th>
                                <Th>
                                    <Text>Short Description</Text>
                                </Th>
                                <Th>
                                    <Text>Price</Text>
                                </Th>
                                <Th>
                                    <Text>Weight</Text>
                                </Th>
                                <Th>
                                    <Text>Height</Text>
                                </Th>
                                <Th>
                                    <Text>Length</Text>
                                </Th>
                                <Th>
                                    <Text>Category</Text>
                                </Th>
                                <Th>
                                    <Text>Company</Text>
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

export default canAccess(ProductPage);
