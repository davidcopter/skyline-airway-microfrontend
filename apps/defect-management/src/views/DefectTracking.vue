<script setup lang="ts">
import { ref, watch } from "vue";
import { mockDefects, type DefectReport } from "@skyline/shared";
import { MoreVertical, User, Clock } from "lucide-vue-next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import draggable from "vuedraggable";

const columns = [
  { id: "open", title: "Open", status: "open" },
  { id: "in-progress", title: "In Progress", status: "in-progress" },
  {
    id: "pending-inspection",
    title: "Pending Inspection",
    status: "pending-inspection",
  },
  { id: "closed", title: "Closed", status: "closed" },
];

// Initialize local state for defects grouped by status
const defectColumns = ref<Record<string, DefectReport[]>>({
  open: mockDefects.filter((d) => d.status === "open"),
  "in-progress": mockDefects.filter((d) => d.status === "in-progress"),
  "pending-inspection": mockDefects.filter(
    (d) => d.status === "pending-inspection",
  ),
  closed: mockDefects.filter((d) => d.status === "closed"),
});

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case "aog":
      return "bg-red-100 text-red-700 border-red-200";
    case "mel":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "deferred":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const handleDragChange = (status: string, evt: any) => {
  if (evt.added) {
    const defect = evt.added.element as DefectReport;
    defect.status = status as any;
    console.log(`Defect ${defect.id} moved to ${status}`);
  }
};
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Defect Tracking</h2>
      <p class="text-sm text-gray-500">
        Manage active snags and monitor maintenance progress.
      </p>
    </div>

    <div class="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-250px)]">
      <div
        v-for="col in columns"
        :key="col.id"
        class="flex-shrink-0 w-80 flex flex-col"
      >
        <div class="flex items-center justify-between mb-4 px-1">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-gray-700">{{ col.title }}</h3>
            <span
              class="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold"
            >
              {{ defectColumns[col.status].length }}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 text-gray-400 hover:text-gray-600"
          >
            <MoreVertical class="h-4 w-4" />
          </Button>
        </div>

        <draggable
          v-model="defectColumns[col.status]"
          group="defects"
          item-key="id"
          class="flex-1 bg-gray-100/50 rounded-xl p-3 space-y-3 overflow-y-auto border border-gray-200/50 min-h-[100px]"
          ghost-class="opacity-50"
          drag-class="rotate-1"
          @change="(evt: any) => handleDragChange(col.status, evt)"
        >
          <template #item="{ element: defect }">
            <Card
              class="shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
            >
              <CardContent class="p-4">
                <div class="flex justify-between items-start mb-2">
                  <span class="font-bold text-gray-900">{{
                    defect.tailNumber
                  }}</span>
                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-bold uppercase border"
                    :class="getSeverityClass(defect.severity)"
                  >
                    {{ defect.severity }}
                  </span>
                </div>

                <p class="text-sm text-gray-600 line-clamp-3 mb-4">
                  {{ defect.description }}
                </p>

                <div
                  class="flex items-center justify-between pt-3 border-t border-gray-50"
                >
                  <div class="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock class="h-3 w-3" />
                    {{ defect.reportedDate }}
                  </div>
                  <div
                    class="h-6 w-6 bg-skyline-blue/10 rounded-full flex items-center justify-center"
                  >
                    <User class="h-3 w-3 text-skyline-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </template>

          <template #footer>
            <div
              v-if="defectColumns[col.status].length === 0"
              class="py-12 text-center text-gray-400 text-sm italic pointer-events-none"
            >
              No items in this stage
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>
