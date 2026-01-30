<script lang="ts">
  import { mockAircraft, eventBus, EVENTS } from '@skyline/shared';
  import { Plane, AlertCircle, Send, History } from 'lucide-svelte';

  let selectedAircraft = '';
  let description = '';
  let severity = 'mel';
  let successMessage = '';

  const handleSubmit = () => {
    if (!selectedAircraft || !description) return;

    const newDefect = {
      id: `def-${Math.floor(Math.random() * 1000)}`,
      tailNumber: selectedAircraft,
      description,
      severity,
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'open'
    };

    // Publish event for other subsystems
    eventBus.publish(EVENTS.DEFECT_REPORTED, newDefect);
    
    successMessage = 'Snag reported successfully!';
    description = '';
    selectedAircraft = '';
    
    setTimeout(() => {
      successMessage = '';
    }, 3000);
  };
</script>

<div class="max-w-2xl mx-auto p-4 md:p-8">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">
      <Plane class="h-6 w-6 text-skyline-blue" />
      Crew Reporting Portal
    </h1>
    <p class="text-sm text-gray-500 mt-1">Submit technical snags directly from the flight deck.</p>
  </div>

  {#if successMessage}
    <div class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center justify-between">
      <span>{successMessage}</span>
      <History class="h-5 w-5" />
    </div>
  {/if}

  <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    <div class="p-6 md:p-8 space-y-6">
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Aircraft Tail Number</label>
        <select 
          bind:value={selectedAircraft}
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue transition-all bg-gray-50"
        >
          <option value="">Select Aircraft...</option>
          {#each mockAircraft as aircraft}
            <option value={aircraft.tailNumber}>{aircraft.tailNumber} - {aircraft.model}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Defect Description</label>
        <textarea 
          bind:value={description}
          rows="4"
          placeholder="Describe the issue in detail..."
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue transition-all bg-gray-50"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Severity Level</label>
        <div class="grid grid-cols-3 gap-3">
          <button 
            on:click={() => severity = 'aog'}
            class="py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all {severity === 'aog' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-100 text-gray-400'}"
          >
            AOG (Critical)
          </button>
          <button 
            on:click={() => severity = 'mel'}
            class="py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all {severity === 'mel' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-100 text-gray-400'}"
          >
            MEL (Non-critical)
          </button>
          <button 
            on:click={() => severity = 'deferred'}
            class="py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all {severity === 'deferred' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-400'}"
          >
            DEFERRED
          </button>
        </div>
      </div>

      <button 
        on:click={handleSubmit}
        disabled={!selectedAircraft || !description}
        class="w-full py-4 bg-skyline-blue hover:bg-blue-800 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <Send class="h-5 w-5" />
        Submit Snag Report
      </button>
    </div>
  </div>

  <div class="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm">
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
    background-color: #F9FAFB;
  }
</style>
