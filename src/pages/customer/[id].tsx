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
    Text,
    Spinner,
} from '@chakra-ui/react';
import { api } from '@/services/apiClient';
import EditCustomer from '@/models/Customer/EditCustomer';
import { useEffect, useState } from 'react';
import { useRouter as useQueryRouter } from 'next/router';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    idCustomerAddress: yup.string().required().min(3).max(80),
    id: yup.string().required().min(3).max(80),
    customerAddress: yup.object({
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

export default function EditCustomerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCustomer>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();
    const queryRouter = useQueryRouter();
    const [customer, setCustomer] = useState<EditCustomer>();

    const onSubmit = async (values: EditCustomer) => {
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
                title: 'Failure to create a Customer.',
                description: 'Error to create a Customer.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const { id } = queryRouter.query;
        if (id) {
            api.get(`Customer/${id}`).then(response => {
                setCustomer(response.data);
                console.log('response', response.data);
            });
        }
    }, []);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            p={5}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            {!customer ? (
                <Container>
                    <Text>Loading...</Text>
                    <Spinner size="xl" />
                </Container>
            ) : (
                <Stack spacing={10} mx={'auto'} maxW={'auto'}>
                    <Heading as="h1" size="xl">
                        Create a new Customer
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
                                        isInvalid={!!errors?.id?.message}
                                        errortext={errors?.id?.message}
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
                                            value={customer.id}
                                        />
                                        <FormErrorMessage>
                                            {errors?.id?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.idCustomerAddress?.message
                                        }
                                        errortext={
                                            errors?.idCustomerAddress?.message
                                        }
                                        id="idcustomerAddress"
                                        isRequired
                                        hidden
                                    >
                                        <FormLabel>idCustomerAddress</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="idCustomerAddress"
                                            {...register('idCustomerAddress', {
                                                required: 'Required',
                                            })}
                                            value={customer.idCustomerAddress}
                                        />
                                        <FormErrorMessage>
                                            {errors?.idCustomerAddress?.message}
                                        </FormErrorMessage>
                                    </FormControl>
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
                                            value={customer.name}
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
                                            value={customer.docId}
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
                                            value={customer.email}
                                        />
                                        <FormErrorMessage>
                                            {errors?.email?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.description?.message
                                        }
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
                                            value={customer.description}
                                        />
                                        <FormErrorMessage>
                                            {errors?.description?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.phoneNumber?.message
                                        }
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
                                            value={customer.phoneNumber}
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
                                        Customer customerAddress
                                    </Heading>

                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.street
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.street
                                                ?.message
                                        }
                                        id="street"
                                        isRequired
                                    >
                                        <FormLabel>Street</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Street"
                                            {...register(
                                                'customerAddress.street',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress.street
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress?.street
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.number
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.number
                                                ?.message
                                        }
                                        id="number"
                                        isRequired
                                    >
                                        <FormLabel>Number</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Number"
                                            {...register(
                                                'customerAddress.number',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress.number
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress?.number
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress
                                                ?.complement?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.complement
                                                ?.message
                                        }
                                        id="complement"
                                        isRequired
                                    >
                                        <FormLabel>Complement</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Complement"
                                            {...register(
                                                'customerAddress.complement',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress
                                                    .complement
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress
                                                    ?.complement?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress
                                                ?.neighborhood?.message
                                        }
                                        errortext={
                                            errors?.customerAddress
                                                ?.neighborhood?.message
                                        }
                                        id="neighborhood"
                                        isRequired
                                    >
                                        <FormLabel>Neighborhood</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Neighborhood"
                                            {...register(
                                                'customerAddress.neighborhood',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress
                                                    .neighborhood
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress
                                                    ?.neighborhood?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.district
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.district
                                                ?.message
                                        }
                                        id="district"
                                        isRequired
                                    >
                                        <FormLabel>District</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="District"
                                            {...register(
                                                'customerAddress.district',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress
                                                    .district
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress
                                                    ?.district?.message
                                            }
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
                                        Customer customerAddress
                                    </Heading>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.city
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.city
                                                ?.message
                                        }
                                        id="city"
                                        isRequired
                                    >
                                        <FormLabel>City</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="City"
                                            {...register(
                                                'customerAddress.city',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress.city
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress?.city
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.county
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.county
                                                ?.message
                                        }
                                        id="county"
                                        isRequired
                                    >
                                        <FormLabel>County</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="County"
                                            {...register(
                                                'customerAddress.county',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress.county
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress?.county
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.zipCode
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.zipCode
                                                ?.message
                                        }
                                        id="zipCode"
                                        isRequired
                                    >
                                        <FormLabel>ZipCode</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="ZipCode"
                                            {...register(
                                                'customerAddress.zipCode',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress.zipCode
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress?.zipCode
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.latitude
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.latitude
                                                ?.message
                                        }
                                        id="latitude"
                                        isRequired
                                    >
                                        <FormLabel>Latitude</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Latitude"
                                            {...register(
                                                'customerAddress.latitude',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress
                                                    .latitude
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress
                                                    ?.latitude?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.customerAddress?.longitude
                                                ?.message
                                        }
                                        errortext={
                                            errors?.customerAddress?.longitude
                                                ?.message
                                        }
                                        id="longitude"
                                        isRequired
                                    >
                                        <FormLabel>Longitude</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Longitude"
                                            {...register(
                                                'customerAddress.longitude',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                customer.customerAddress
                                                    .longitude
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.customerAddress
                                                    ?.longitude?.message
                                            }
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
                                    disabled={
                                        !!errors.description || !!errors.name
                                    }
                                >
                                    Create
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            )}
        </Flex>
    );
}
