<script lang="ts">
  import { Button as ButtonPrimitive } from "bits-ui";
  import { type Size, type Variant, buttonVariants } from "./index";
  import { cn } from "@/lib/utils";

  export let variant: Variant = "default";
  export let size: Size = "default";
  export let className: string | undefined | null = undefined;
</script>

<ButtonPrimitive.Root
  class={cn(buttonVariants({ variant, size, className }))}
  {...$$restProps}
  on:click
  on:keydown
  on:focus
  on:blur
  on:mouseenter
  on:mouseleave
>
  <slot />
</ButtonPrimitive.Root>
