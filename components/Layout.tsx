import { Head } from "$fresh/runtime.ts";
import {
  ComponentChild,
  VNode,
} from "https://esm.sh/v99/preact@10.11.0/src/index";
import { HomeLink } from "./HomeLink.tsx";

export function Layout(props: {
  children:
    | string
    | number
    | bigint
    | boolean
    | object
    | ComponentChild[]
    | VNode<any>
    | null
    | undefined;
}) {
  return (
    <>
      <Head>
        <title>AOC 2024</title>
      </Head>
      <HomeLink />
      <div class="ml-16 lg:ml-auto p-4 mx-auto max-w-screen-md">
        {props.children}
      </div>
    </>
  );
}
