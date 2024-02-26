'use client';

import {
    Box,
    Heading,
    Text,
    Button,
    Container,
    Spinner,
} from '@chakra-ui/react';

export default function Loading() {
    return (
        <Container>
            <Text>Loading...</Text>
            <Spinner size="xl" />
        </Container>
    );
}
