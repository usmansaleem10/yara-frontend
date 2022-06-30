<template>
  <AdminNav />
  <div class="py-10">
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-xl font-semibold text-gray-900">Procotes</h1>
            </div>
          </div>
          <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
              >
                <div
                  class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                >
                  <ProcoteDetails
                    :open="procoteDetail != null"
                    :procote="procoteDetail"
                    :procotes="procotes"
                    :closeAction="closeAction"
                  />
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Density(Kg/l)
                        </th>
                        <th
                          scope="col"
                          class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      <tr
                        v-for="(procote, procoteIdx) in procotes"
                        :key="procote.id"
                        :class="procoteIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                      >
                        <td
                          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        >
                          {{ procote.attributes.name }}
                        </td>
                        <td
                          class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {{ procote.attributes.density }}
                        </td>
                        <td
                          class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                        >
                          <button
                            class="text-indigo-600 hover:text-indigo-900"
                            @click="() => (procoteDetail = procote)"
                          >
                            Show Details
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ApiCallMixin } from "@/components/mixins";
import { ProcoteDetails } from "@/components/index.js";
import { AdminNav } from "@/components/Shared/Admin/index.js";
export default {
  mixins: [ApiCallMixin],
  components: {
    ProcoteDetails,
    AdminNav,
  },
  data() {
    return {
      procoteDetail: null,
    };
  },
  methods: {
    closeAction() {
      this.procoteDetail = null;
      this.fetchApiData();
    },
  },
};
</script>
