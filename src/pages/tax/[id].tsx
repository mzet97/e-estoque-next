import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import {
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    Textarea,
    useToast,
    Select,
    Text,
    Spinner,
} from '@chakra-ui/react';
import { api } from '@/services/apiClient';
import CreateTax from '@/models/Tax/CreateTax';
import { useEffect, useState } from 'react';
import { useRouter as useQueryRouter } from 'next/router';
import Category from '@/models/category/Category';
import EditTax from '@/models/Tax/EditTax';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    description: yup.string().required().min(3).max(5000),
    percentage: yup.number().required().min(0).max(100),
    idCategory: yup.string().required(),
    id: yup.string().required(),
});

export default function EditTaxPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditTax>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();
    const queryRouter = useQueryRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [tax, setTax] = useState<EditTax>();

    const onSubmit = async (values: CreateTax) => {
        try {
            console.log('input', values);
            await api.post('Tax', values);

            toast({
                title: 'Success a create tax.',
                description: 'Tax created with success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/tax');
        } catch (err) {
            toast({
                title: 'Failure to create a tax.',
                description: 'Error to create a tax.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const { id } = queryRouter.query;
        if (id) {
            api.get(`tax/${id}`).then(response => {
                setTax(response.data);
            });
        }

        api.get(`Category`).then(response => {
            console.log('effect', response.data);
            response.data.data.forEach((category: Category) => {
                categories.push(category);
                setCategories([...categories]);
            });
        });
    }, []);

    return (
        <Container>
            {!tax ? (
                <Container>
                    <Text>Loading...</Text>
                    <Spinner size="xl" />
                </Container>
            ) : (
                <Stack padding={10}>
                    <Heading as="h1" size="xl">
                        Create a new tax
                    </Heading>
                    <form
                        style={{ width: 350 }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Stack spacing={3} padding={5}>
                            <FormControl
                                isInvalid={!!errors?.id?.message}
                                id="id"
                                isRequired
                                hidden
                            >
                                <FormLabel>Id</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Id"
                                    {...register('id', {
                                        required: 'Required',
                                    })}
                                    value={tax.id}
                                />
                                <FormErrorMessage>
                                    {errors?.id?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors?.name?.message}
                                id="name"
                                isRequired
                            >
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    {...register('name', {
                                        required: 'Required',
                                    })}
                                    value={tax.name}
                                />
                                <FormErrorMessage>
                                    {errors?.name?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors?.description?.message}
                                id="name"
                                isRequired
                            >
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Description"
                                    {...register('description', {
                                        required: 'Required',
                                    })}
                                    size="sm"
                                    value={tax.description}
                                />
                                <FormErrorMessage>
                                    {errors?.description?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors?.percentage?.message}
                                id="name"
                                isRequired
                                value={tax.percentage}
                            >
                                <FormLabel>Percentage</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Percentage"
                                    {...register('percentage', {
                                        required: 'Required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors?.percentage?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={!!errors?.idCategory?.message}
                                id="name"
                                isRequired
                            >
                                <FormLabel>Category</FormLabel>
                                <Select
                                    {...register('idCategory')}
                                    placeholder="Select category"
                                >
                                    {categories.map(category => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors?.idCategory?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit(onSubmit)}
                                disabled={
                                    !!errors.percentage ||
                                    !!errors.description ||
                                    !!errors.name
                                }
                            >
                                Create
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            )}
        </Container>
    );
}
