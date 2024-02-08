type Token = {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
    tokenType: string;
    notBeforePolicy: string;
    sessionState: string;
    scope: string;
};

export default Token;
