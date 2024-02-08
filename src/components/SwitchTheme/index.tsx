import { Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function SwitchTheme() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div>
            <Button
                colorScheme="teal"
                variant="outline"
                onClick={toggleColorMode}
            >
                {colorMode === 'light' ? (
                    <MoonIcon boxSize={6} />
                ) : (
                    <SunIcon boxSize={6} />
                )}
            </Button>
        </div>
    );
}
