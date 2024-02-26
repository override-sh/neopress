import {
    NextRequest,
    NextResponse,
} from "next/server";

export const MockMiddleware = async (req: NextRequest) => {
    return NextResponse.json({
        message: "Hello, World!",
    });
};