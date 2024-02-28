import { NextRequest } from "next/server";
import {
    DELETE,
    GET,
    PATCH,
    POST,
    PUT,
} from "./route";

describe("handler", () => {
    const context = {
        params: {
            path: [ "mock-api" ],
        },
    };

    it("should return a NextResponse object when a valid GET request is sent", async () => {
        const req: NextRequest = new NextRequest("https://example.com/api/mock-api", { method: "GET" });
        const result = await (await GET(req, context)).json();

        expect(result.message).toEqual("Hello, World!");
    });

    it("should return a NextResponse object when a valid POST request is sent", async () => {
        const req: NextRequest = new NextRequest("https://example.com/api/mock-api", { method: "POST" });
        const result = await (await POST(req, context)).json();

        expect(result.message).toEqual("Hello, World!");
    });

    it("should return a NextResponse object when a valid PUT request is sent", async () => {
        const req: NextRequest = new NextRequest("https://example.com/api/mock-api", { method: "PUT" });
        const result = await (await PUT(req, context)).json();

        expect(result.message).toEqual("Hello, World!");
    });

    it("should return a NextResponse object when a valid DELETE request is sent", async () => {
        const req: NextRequest = new NextRequest("https://example.com/api/mock-api", { method: "DELETE" });
        const result = await (await DELETE(req, context)).json();

        expect(result.message).toEqual("Hello, World!");
    });

    it("should return a NextResponse object when a valid PATCH request is sent", async () => {
        const req: NextRequest = new NextRequest("https://example.com/api/mock-api", { method: "PATCH" });
        const result = await (await PATCH(req, context)).json();

        expect(result.message).toEqual("Hello, World!");
    });

    it("should return a 404 NextResponse object when an invalid request is sent", async () => {
        const req: NextRequest = new NextRequest("https://example.com/api/non-existing-endpoint", { method: "GET" });
        const result = await (await GET(req, { params: { path: [ "non-existing-endpoint" ] } })).json();

        expect(result.message).toEqual("Not found");
    });

});
