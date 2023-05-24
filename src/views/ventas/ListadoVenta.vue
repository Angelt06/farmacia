<template>
  <h3 class="text-gray-700 text-3xl font-medium">Listado de ventas</h3>
  <div class="mt-2">
    <div class="flex justify-end">
      <router-link class="flex items-center duration-200 border-l-4" to="/ventas/crear">
        <button
          class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 mx-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <span class="mx-1">Crear venta</span>
        </button>
      </router-link>
    </div>
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="p-4 bg-white inline-block min-w-full overflow-hidden rounded-lg shadow">
        <DataTable class="display" :data="ventas">
          <thead>
            <tr>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                #
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Cliente
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Fecha
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Total
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Acciones
              </th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import axios from "axios";
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const ventas = ref<[]>([]);

const consultarClientes = async () => {
  const response = await axios.get<[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  response.data.forEach((venta) => {
    ventas.value.push([
      venta.id,
      venta.title,
      new Date().addDays(venta.userId).toLocaleDateString(),
      parseInt(Math.random() * 100000),
      `<a href="/ventas/${venta.id}/editar" class="text-indigo-600 hover:text-indigo-900">Editar</a>`,
    ]);
  });
};

consultarClientes();
</script>