import dynamic from "next/dynamic";
import Link from "next/link";

interface PluginContainerPageProps {
    params: {
        plugin: string;
        page: string[];
    };
}

export default function PluginContainerPage({ params }: PluginContainerPageProps) {
    // dynamically load the component
    const PluginComponent = dynamic(
        () =>
            import(
                `./../../../../../tmp/plugins/${ params.plugin }/pages/${ params.page.join("/") }`
                ),
        {
            loading: () => <p>Loading...</p>,
        },
    );

    return (
        <>
            <Link href="/">
                Home
            </Link>

            <hr />

            <PluginComponent />
        </>
    );
}