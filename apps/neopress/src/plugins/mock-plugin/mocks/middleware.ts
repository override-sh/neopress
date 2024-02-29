import {
    NextRequest,
    NextResponse,
} from "next/server";

export const MockMiddleware = async (req: NextRequest) => {
    if(process.env.SKIP_MIDDLEWARE) {
        return NextResponse.next();
    }

    return NextResponse.json({
        message: "Hello, World!",
    });
};
