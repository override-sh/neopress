import {
    NextRequest,
    NextResponse,
} from "next/server";

export const MockApi = async (req: NextRequest) => {
    return NextResponse.json({
        message: "Hello, World!",
    });
};