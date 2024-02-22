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
} from '@chakra-ui/react';
import CreateCategory from '@/models/category/CreateCategory';
import { api } from '@/services/apiClient';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    description: yup.string().required().min(3).max(5000),
    shortDescription: yup.string().required().min(3).max(500),
});

export default function CreateCategptyPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategory>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();

    const onSubmit = async (values: CreateCategory) => {
        try {
            console.log('input', values);
            await api.post('Category', values);

            toast({
                title: 'Success a create category.',
                description: 'Category created with success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/category');
        } catch (err) {
            toast({
                title: 'Failure to create a category.',
                description: 'Error to create a category.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Container>
            <Stack padding={10}>
                <Heading as="h1" size="xl">
                    Create a new category
                </Heading>
                <form style={{ width: 350 }} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} padding={5}>
                        <FormControl
                            isInvalid={!!errors?.name?.message}
                            errortext={errors?.name?.message}
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
                            />
                            <FormErrorMessage>
                                {errors?.name?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={!!errors?.description?.message}
                            errortext={errors?.description?.message}
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
                            />
                            <FormErrorMessage>
                                {errors?.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={!!errors?.shortDescription?.message}
                            errortext={errors?.shortDescription?.message}
                            id="name"
                            isRequired
                        >
                            <FormLabel>Short Description</FormLabel>
                            <Textarea
                                placeholder="Short Description"
                                {...register('shortDescription', {
                                    required: 'Required',
                                })}
                                size="sm"
                            />
                            <FormErrorMessage>
                                {errors?.shortDescription?.message}
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
                                !!errors.shortDescription ||
                                !!errors.description ||
                                !!errors.name
                            }
                        >
                            Create
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>
    );
}
