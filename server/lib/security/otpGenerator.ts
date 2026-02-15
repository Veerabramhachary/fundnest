import { randomInt} from "crypto";

const generateOTP = async (): Promise<number> => {
    const otp = randomInt(1000, 10000);
    return otp;
}

export default generateOTP;