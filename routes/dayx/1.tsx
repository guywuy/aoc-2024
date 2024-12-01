import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";

type Data = string[];

export const handler: Handlers<Data> = {
    async GET(_, ctx) {
        const text = await Deno.readTextFile("./routes/dayx/input-test.txt");
        const data = text.trim().split("\n");
        return ctx.render(data);
    },
};

export default function Day({ data }: PageProps<Data>) {
    if (!data) {
        return <h1>Data not found</h1>;
    }
    console.log(data);

    const answer = 1;
    return (
        <>
            <Layout>
                <Answer>{answer}</Answer>
            </Layout>
        </>
    );
}
