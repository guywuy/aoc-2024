import {
  ComponentChild,
  VNode,
} from "https://esm.sh/v99/preact@10.11.0/src/index";

export function Answer(props: {
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
      <h2 class="border border-green-400 p-2 text-lg font-bold mb-2">{props.children}</h2>
    </>
  );
}
