import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    Stack,
    Textarea,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { api } from '@/services/apiClient';
import CreateCompany from '@/models/Company/CreateCompany';
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

    const toast = useToast();
    const router = useRouter();

    const onSubmit = async (values: CreateCustomer) => {
        try {
            console.log('input', values);
            await api.post('Customer', values);

            toast({
                title: 'Success a create customer.',
                description: 'Customer created with success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/customer');
        } catch (err) {
            toast({
                title: 'Failure to create a customer.',
                description: 'Error to create a customer.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            p={5}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={10} mx={'auto'} maxW={'auto'}>
                <Heading as="h1" size="xl">
                    Create a new customer
                </Heading>
                <Box
                    rounded={'2xl'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'2xl'}
                    p={10}
                    w="100%"
                    h="100%"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <HStack
                            align="center"
                            justify="center"
                            alignContent="center"
                            alignItems="baseline"
                            spacing={1}
                            padding={1}
                        >
                            <Stack
                                align="center"
                                justify="center"
                                alignContent="center"
                                alignItems="baseline"
                                spacing={1}
                                padding={1}
                            >
                                <Heading as="h2" size="md">
                                    Base data
                                </Heading>
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
                                    isInvalid={!!errors?.docId?.message}
                                    errortext={errors?.docId?.message}
                                    id="docId"
                                    isRequired
                                >
                                    <FormLabel>DocId</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="DocId"
                                        {...register('docId', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.docId?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors?.email?.message}
                                    errortext={errors?.email?.message}
                                    id="email"
                                    isRequired
                                >
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        {...register('email', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.email?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors?.description?.message}
                                    errortext={errors?.description?.message}
                                    id="description"
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
                                    isInvalid={!!errors?.phoneNumber?.message}
                                    errortext={errors?.phoneNumber?.message}
                                    id="phoneNumber"
                                    isRequired
                                >
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Phone Number"
                                        {...register('phoneNumber', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.phoneNumber?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <Stack
                                align="center"
                                justify="center"
                                alignContent="center"
                                alignItems="baseline"
                                spacing={1}
                                padding={1}
                            >
                                <Heading as="h2" size="md">
                                    Customer address
                                </Heading>

                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.street?.message
                                    }
                                    errortext={errors?.Address?.street?.message}
                                    id="street"
                                    isRequired
                                >
                                    <FormLabel>Street</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Street"
                                        {...register('Address.street', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.street?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.number?.message
                                    }
                                    errortext={errors?.Address?.number?.message}
                                    id="number"
                                    isRequired
                                >
                                    <FormLabel>Number</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Number"
                                        {...register('Address.number', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.number?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.complement?.message
                                    }
                                    errortext={
                                        errors?.Address?.complement?.message
                                    }
                                    id="complement"
                                    isRequired
                                >
                                    <FormLabel>Complement</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Complement"
                                        {...register('Address.complement', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.complement?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.neighborhood?.message
                                    }
                                    errortext={
                                        errors?.Address?.neighborhood?.message
                                    }
                                    id="neighborhood"
                                    isRequired
                                >
                                    <FormLabel>Neighborhood</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Neighborhood"
                                        {...register('Address.neighborhood', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.neighborhood?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.district?.message
                                    }
                                    errortext={
                                        errors?.Address?.district?.message
                                    }
                                    id="district"
                                    isRequired
                                >
                                    <FormLabel>District</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="District"
                                        {...register('Address.district', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.district?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <Stack
                                align="center"
                                justify="center"
                                alignContent="center"
                                alignItems="baseline"
                                spacing={1}
                                padding={1}
                            >
                                <Heading as="h2" size="md">
                                    Customer address
                                </Heading>
                                <FormControl
                                    isInvalid={!!errors?.Address?.city?.message}
                                    errortext={errors?.Address?.city?.message}
                                    id="city"
                                    isRequired
                                >
                                    <FormLabel>City</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="City"
                                        {...register('Address.city', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.city?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.county?.message
                                    }
                                    errortext={errors?.Address?.county?.message}
                                    id="county"
                                    isRequired
                                >
                                    <FormLabel>County</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="County"
                                        {...register('Address.county', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.county?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.zipCode?.message
                                    }
                                    errortext={
                                        errors?.Address?.zipCode?.message
                                    }
                                    id="zipCode"
                                    isRequired
                                >
                                    <FormLabel>ZipCode</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="ZipCode"
                                        {...register('Address.zipCode', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.zipCode?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.latitude?.message
                                    }
                                    errortext={
                                        errors?.Address?.latitude?.message
                                    }
                                    id="latitude"
                                    isRequired
                                >
                                    <FormLabel>Latitude</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Latitude"
                                        {...register('Address.latitude', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.latitude?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.Address?.longitude?.message
                                    }
                                    errortext={
                                        errors?.Address?.longitude?.message
                                    }
                                    id="longitude"
                                    isRequired
                                >
                                    <FormLabel>Longitude</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Longitude"
                                        {...register('Address.longitude', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.Address?.longitude?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                        </HStack>
                        <Stack
                            align="center"
                            justify="center"
                            alignContent="center"
                            alignItems="center"
                            spacing={1}
                            padding={1}
                            margin={5}
                        >
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit(onSubmit)}
                                disabled={!!errors.description || !!errors.name}
                            >
                                Create
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
