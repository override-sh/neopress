import {
    NextRequest,
    NextResponse,
} from "next/server";
import { MiddlewareDefinitionInterface } from "./interfaces/middleware-definition.interface";
import { MiddlewareStorage } from "./middleware-storage";

describe("MiddlewareStorage", () => {

    // Can register an object to the storage using register()
    it("should register an object to the storage when calling register()", () => {
        const middlewareStorage = new MiddlewareStorage();
        const obj: MiddlewareDefinitionInterface = {
            name:     "middleware1",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 1,
        };

        middlewareStorage.register(obj);

        expect(middlewareStorage.get("middleware1")).toEqual(obj);
    });

    // Should throw an error when registering an object with a name that already exists
    it("should throw an error when registering an object with a name that already exists", () => {
        const middlewareStorage = new MiddlewareStorage();
        const obj1: MiddlewareDefinitionInterface = {
            name:     "middleware1",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 1,
        };
        const obj2: MiddlewareDefinitionInterface = {
            name:     "middleware1",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 2,
        };

        middlewareStorage.register(obj1);

        expect(() => middlewareStorage.register(obj2))
            .toThrow(`Middleware with name '${ obj2.name }' already exists.`);
    });

    // Can register an object with a null priority using register()
    it("should register an object with a undefined priority when calling register()", () => {
        const middlewareStorage = new MiddlewareStorage();
        const obj: MiddlewareDefinitionInterface = {
            name:    "middleware1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
        };

        middlewareStorage.register(obj);

        expect(middlewareStorage.get("middleware1")).toEqual(obj);
    });

    // Can unregister an object from the storage using unregister()
    it("should unregister an object from the storage when calling unregister()", () => {
        const middlewareStorage = new MiddlewareStorage();
        const obj: MiddlewareDefinitionInterface = {
            name:     "middleware1",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 1,
        };

        middlewareStorage.register(obj);
        middlewareStorage.unregister("middleware1");

        expect(middlewareStorage.get("middleware1")).toBeNull();
    });

    // Can get a list of all objects in the storage sorted by priority using getAll()
    it("should return a list of all objects in the storage sorted by priority when calling getAll()", () => {
        const middlewareStorage = new MiddlewareStorage();
        const obj1: MiddlewareDefinitionInterface = {
            name:     "middleware1",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 2,
        };
        const obj2: MiddlewareDefinitionInterface = {
            name:     "middleware2",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 1,
        };

        middlewareStorage.register(obj1);
        middlewareStorage.register(obj2);

        const result = middlewareStorage.getAll();

        expect(result).toEqual([
            obj1,
            obj2,
        ]);
    });

    // Can check if the storage has an object by key using has()
    it("should return true when the storage has an object by key when calling has()", () => {
        const middlewareStorage = new MiddlewareStorage();
        const obj: MiddlewareDefinitionInterface = {
            name:     "middleware1",
            handler:  (request: NextRequest) => {
                return new NextResponse();
            },
            priority: 1,
        };

        middlewareStorage.register(obj);

        expect(middlewareStorage.has("middleware1")).toBeTruthy();
    });

    describe("chain", () => {

        // It should run the middleware chain successfully when there are no middlewares registered.
        it("should run the middleware chain successfully when there are no middlewares registered", async () => {
            const middlewareStorage = new MiddlewareStorage();
            const request: NextRequest = new NextRequest("https://www.example.com/test"); // create a mock request object

            const result = await middlewareStorage.chain(request);

            expect(result).toEqual(NextResponse.next());
        });

        // It should throw an error when a middleware throws an error.
        it("should throw an error when a middleware throws an error", async () => {
            const middlewareStorage = new MiddlewareStorage();
            const request: NextRequest = new NextRequest("https://www.example.com/test"); // create a mock request object
            const obj: MiddlewareDefinitionInterface = {
                name:     "middleware1",
                handler:  (request: NextRequest) => {
                    throw new Error("Middleware error");
                },
                priority: 1,
            };

            middlewareStorage.register(obj);

            await expect(middlewareStorage.chain(request)).rejects.toThrow("Middleware error");
        });

        // It should run the middleware chain successfully when there is only one middleware registered.
        it("should run the middleware chain successfully when there is only one middleware registered", async () => {
            const middlewareStorage = new MiddlewareStorage();
            const middleware: MiddlewareDefinitionInterface = {
                name:     "middleware1",
                handler:  (request, next) => {
                    return next();
                },
                priority: 1,
            };
            middlewareStorage.register(middleware);

            const request: NextRequest = new NextRequest("https://www.example.com/test"); // create a mock request object
            const result = await middlewareStorage.chain(request);

            expect(result).toBeInstanceOf(NextResponse);
        });

        // It should run the middleware chain successfully when there are multiple middlewares registered.
        it("should run the middleware chain successfully when there are multiple middlewares registered", async () => {
            const middlewareStorage = new MiddlewareStorage();
            const middleware1: MiddlewareDefinitionInterface = {
                name:     "middleware1",
                handler:  (request, next) => {
                    return next();
                },
                priority: 1,
            };
            const middleware2: MiddlewareDefinitionInterface = {
                name:     "middleware2",
                handler:  (request, next) => {
                    return next();
                },
                priority: 2,
            };
            middlewareStorage.register(middleware1);
            middlewareStorage.register(middleware2);

            const request: NextRequest = new NextRequest("https://www.example.com/test"); // create a mock request object
            const result = await middlewareStorage.chain(request);

            expect(result).toBeInstanceOf(NextResponse);
        });

        // It should run the middleware chain successfully when a middleware early returns
        it("should run the middleware chain successfully when a middleware early returns", async () => {
            const middlewareStorage = new MiddlewareStorage();
            const middleware1: MiddlewareDefinitionInterface = {
                name:     "middleware1",
                handler:  (request, next) => {
                    return next();
                },
                priority: 3,
            };
            const middleware2: MiddlewareDefinitionInterface = {
                name:     "middleware2",
                handler:  (request, next) => {
                    return NextResponse.redirect("https://example.com");
                },
                priority: 2,
            };
            const middleware3: MiddlewareDefinitionInterface = {
                name:     "middleware3",
                handler:  (request, next) => {
                    return next();
                },
                priority: 1,
            };
            middlewareStorage.register(middleware1);
            middlewareStorage.register(middleware2);
            middlewareStorage.register(middleware3);

            const request: NextRequest = new NextRequest("https://www.example.com/test"); // create a mock request object
            const result = await middlewareStorage.chain(request);

            expect(result.status).toBe(307);
        });

    });

});
