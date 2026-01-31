<script lang="ts">
  import { cn } from "@/lib/utils";

  export let className: string | undefined | null = undefined;
</script>

<h3
	class={cn("font-semibold leading-none tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</h3>
