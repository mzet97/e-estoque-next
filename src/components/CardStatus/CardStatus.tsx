import { Button, CardActions, CardContent, Typography } from '@mui/material';
import styles from './styles.module.css';

interface CardStatusProps {
    title: string;
    subtitle: string;
}

const CardStatus: React.FC<CardStatusProps> = (props: CardStatusProps) => {
    return (
        <>
            <CardContent className={styles.boxCenter}>
                <Typography variant="h4" component="div">
                    {props.title}
                </Typography>
                <Typography variant="h6" component="div">
                    {props.subtitle}
                </Typography>
            </CardContent>
        </>
    );
};

export default CardStatus;
