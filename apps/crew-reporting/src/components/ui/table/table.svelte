<script lang="ts">
  import { cn } from "@/lib/utils";

  export let className: string | undefined | null = undefined;
</script>

<div class="relative w-full overflow-auto">
	<table class={cn("w-full caption-bottom text-sm", className)} {...$$restProps}>
		<slot />
	</table>
</div>
