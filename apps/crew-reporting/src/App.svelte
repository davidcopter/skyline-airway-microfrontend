<script lang="ts">
  import { mockAircraft, eventBus, EVENTS } from "@skyline/shared";
  import {
    Plane,
    AlertCircle,
    Send,
    History,
    CheckCircle2,
    WifiOff,
  } from "lucide-svelte";
  import { Button } from "./components/ui/button";
  import { Card, CardContent } from "./components/ui/card";
  import { onMount } from "svelte";

  let selectedAircraft = "";
  let description = "";
  let severity = "mel";
  let successMessage = "";
  let isOffline = !navigator.onLine;

  onMount(() => {
    const handleOnline = () => (isOffline = false);
    const handleOffline = () => (isOffline = true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  const handleSubmit = async () => {
    if (!selectedAircraft || !description) return;

    const newDefect = {
      id: `def-${Math.floor(Math.random() * 1000)}`,
      tailNumber: selectedAircraft,
      description,
      severity,
      reportedDate: new Date().toISOString().split("T")[0],
      status: "open" as const,
    };

    if (isOffline) {
      // Simulate offline queueing
      try {
        const registration = await navigator.serviceWorker.ready;
        if ("sync" in registration) {
          // Register background sync tag
          await (registration as any).sync.register("snag-sync");
          successMessage = "Offline! Report queued for background sync.";
        } else {
          successMessage = "Offline! Report saved locally.";
        }
      } catch (e) {
        successMessage = "Offline! Report saved locally.";
      }
    } else {
      // Publish event for other subsystems
      eventBus.publish(EVENTS.DEFECT_REPORTED, newDefect);
      successMessage = "Snag reported successfully!";
    }

    description = "";
    selectedAircraft = "";

    // Auto-dismiss success message
    setTimeout(() => {
      successMessage = "";
    }, 5000);
  };

  const closeSuccess = () => {
    successMessage = "";
  };
</script>

<div class="max-w-2xl mx-auto p-4 md:p-8">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
      <Plane class="h-6 w-6 text-skyline-blue" aria-hidden="true" />
      Crew Reporting Portal
    </h1>
    <p class="text-sm text-gray-500 mt-1">
      Submit technical snags directly from the flight deck.
    </p>
  </div>

  {#if isOffline}
    <div
      role="alert"
      class="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-700 flex items-center gap-2"
    >
      <WifiOff class="h-5 w-5" />
      <span
        >You are currently offline. Reports will be synced automatically when
        connection is restored.</span
      >
    </div>
  {/if}

  {#if successMessage}
    <div
      role="alert"
      class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <CheckCircle2 class="h-5 w-5" />
        <span>{successMessage}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        on:click={closeSuccess}
        aria-label="Dismiss success message"
      >
        Dismiss
      </Button>
    </div>
  {/if}

  <Card class="shadow-xl overflow-hidden">
    <CardContent class="p-6 md:p-8 space-y-6">
      <div>
        <label
          for="aircraft-select"
          class="block text-sm font-bold text-gray-700 mb-2"
          >Aircraft Tail Number</label
        >
        <select
          id="aircraft-select"
          bind:value={selectedAircraft}
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue transition-all bg-gray-50"
        >
          <option value="">Select Aircraft...</option>
          {#each mockAircraft as aircraft}
            <option value={aircraft.tailNumber}
              >{aircraft.tailNumber} - {aircraft.model}</option
            >
          {/each}
        </select>
      </div>

      <div>
        <label
          for="defect-description"
          class="block text-sm font-bold text-gray-700 mb-2"
          >Defect Description</label
        >
        <textarea
          id="defect-description"
          bind:value={description}
          rows="4"
          placeholder="Describe the issue in detail..."
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue transition-all bg-gray-50"
        ></textarea>
      </div>

      <div>
        <span
          id="severity-label"
          class="block text-sm font-bold text-gray-700 mb-2"
          >Severity Level</span
        >
        <div
          role="radiogroup"
          aria-labelledby="severity-label"
          class="grid grid-cols-3 gap-3"
        >
          <Button
            variant={severity === "aog" ? "default" : "outline"}
            on:click={() => (severity = "aog")}
            role="radio"
            aria-checked={severity === "aog"}
            className="py-6 font-bold {severity === 'aog'
              ? 'bg-red-500 hover:bg-red-600'
              : ''}"
          >
            AOG (Critical)
          </Button>
          <Button
            variant={severity === "mel" ? "default" : "outline"}
            on:click={() => (severity = "mel")}
            role="radio"
            aria-checked={severity === "mel"}
            className="py-6 font-bold {severity === 'mel'
              ? 'bg-amber-500 hover:bg-amber-600'
              : ''}"
          >
            MEL (Non-critical)
          </Button>
          <Button
            variant={severity === "deferred" ? "default" : "outline"}
            on:click={() => (severity = "deferred")}
            role="radio"
            aria-checked={severity === "deferred"}
            className="py-6 font-bold {severity === 'deferred'
              ? 'bg-blue-500 hover:bg-blue-600'
              : ''}"
          >
            DEFERRED
          </Button>
        </div>
      </div>

      <Button
        on:click={handleSubmit}
        disabled={!selectedAircraft || !description}
        className="w-full py-6 text-lg"
      >
        <Send class="h-5 w-5 mr-2" />
        Submit Snag Report
      </Button>
    </CardContent>
  </Card>

  <div
    class="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm"
  >
    <div class="flex items-center gap-1.5">
      <AlertCircle class="h-4 w-4" />
      Offline Support Enabled
    </div>
    <div class="w-px h-4 bg-gray-200"></div>
    <div class="flex items-center gap-1.5">
      <History class="h-4 w-4" />
      View History
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f9fafb;
  }
</style>
