<script lang="ts">
  import { cn } from "@/lib/utils";

  export let className: string | undefined | null = undefined;
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", className)} {...$$restProps}>
  <slot />
</div>
