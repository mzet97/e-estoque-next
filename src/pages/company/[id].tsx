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
import EditCompany from '@/models/Company/EditCompany';
import { useEffect, useState } from 'react';
import { useRouter as useQueryRouter } from 'next/router';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    idcompanyAddress: yup.string().required().min(3).max(80),
    id: yup.string().required().min(3).max(80),
    companyAddress: yup.object({
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

export default function EditCompanyPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCompany>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();
    const queryRouter = useQueryRouter();
    const [company, setCompany] = useState<EditCompany>();

    const onSubmit = async (values: EditCompany) => {
        try {
            console.log('input', values);
            await api.post('Company', values);

            toast({
                title: 'Success a create company.',
                description: 'Company created with success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/company');
        } catch (err) {
            toast({
                title: 'Failure to create a company.',
                description: 'Error to create a company.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const { id } = queryRouter.query;
        if (id) {
            api.get(`Company/${id}`).then(response => {
                setCompany(response.data);
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
            {!company ? (
                <Container>
                    <Text>Loading...</Text>
                    <Spinner size="xl" />
                </Container>
            ) : (
                <Stack spacing={10} mx={'auto'} maxW={'auto'}>
                    <Heading as="h1" size="xl">
                        Create a new Company
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
                                            value={company.id}
                                        />
                                        <FormErrorMessage>
                                            {errors?.id?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.idcompanyAddress?.message
                                        }
                                        errortext={
                                            errors?.idcompanyAddress?.message
                                        }
                                        id="idcompanyAddress"
                                        isRequired
                                        hidden
                                    >
                                        <FormLabel>idcompanyAddress</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="idcompanyAddress"
                                            {...register('idcompanyAddress', {
                                                required: 'Required',
                                            })}
                                            value={company.idcompanyAddress}
                                        />
                                        <FormErrorMessage>
                                            {errors?.idcompanyAddress?.message}
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
                                            value={company.name}
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
                                            value={company.docId}
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
                                            value={company.email}
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
                                            value={company.description}
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
                                            value={company.phoneNumber}
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
                                        Company companyAddress
                                    </Heading>

                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.street
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.street
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
                                                'companyAddress.street',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.street
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.street
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.number
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.number
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
                                                'companyAddress.number',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.number
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.number
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.complement
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.complement
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
                                                'companyAddress.complement',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress
                                                    .complement
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress
                                                    ?.complement?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress
                                                ?.neighborhood?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.neighborhood
                                                ?.message
                                        }
                                        id="neighborhood"
                                        isRequired
                                    >
                                        <FormLabel>Neighborhood</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Neighborhood"
                                            {...register(
                                                'companyAddress.neighborhood',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress
                                                    .neighborhood
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress
                                                    ?.neighborhood?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.district
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.district
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
                                                'companyAddress.district',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.district
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.district
                                                    ?.message
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
                                        Company companyAddress
                                    </Heading>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.city
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.city
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
                                                'companyAddress.city',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={company.companyAddress.city}
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.city
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.county
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.county
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
                                                'companyAddress.county',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.county
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.county
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.zipCode
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.zipCode
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
                                                'companyAddress.zipCode',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.zipCode
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.zipCode
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.latitude
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.latitude
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
                                                'companyAddress.latitude',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.latitude
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress?.latitude
                                                    ?.message
                                            }
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            !!errors?.companyAddress?.longitude
                                                ?.message
                                        }
                                        errortext={
                                            errors?.companyAddress?.longitude
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
                                                'companyAddress.longitude',
                                                {
                                                    required: 'Required',
                                                },
                                            )}
                                            value={
                                                company.companyAddress.longitude
                                            }
                                        />
                                        <FormErrorMessage>
                                            {
                                                errors?.companyAddress
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
