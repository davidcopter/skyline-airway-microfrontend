<script lang="ts">
  import { cn } from "@/lib/utils";

  export let className: string | undefined | null = undefined;
</script>

<div
	class={cn(
		"rounded-xl border bg-card text-card-foreground shadow",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
