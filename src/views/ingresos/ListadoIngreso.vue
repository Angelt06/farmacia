<template>
  <h3 class="text-gray-700 text-3xl font-medium" v-text="titulo"></h3>
  <div class="mt-2">
    <div class="flex justify-end">
      <router-link class="flex items-center duration-200 border-l-4" :to="`/medicamentos/${useRoute().params.medicamentoId}/ingresos/crear`">
        <button
          class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 mx-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <span class="mx-1">Crear ingreso</span>
        </button>
      </router-link>
    </div>
    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div class="p-4 bg-white inline-block min-w-full overflow-hidden rounded-lg shadow">
        <DataTable class="display" :data="ingresos">
          <thead>
            <tr>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                #
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Cantidad
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Fecha inicial
              </th>
              <th
                class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Fecha final
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
import { useRoute } from "vue-router";
import Swal from 'sweetalert2'

DataTable.use(DataTablesCore);

const medicamento = ref({
  id: useRoute().params.medicamentoId,
  nombre: '',
  descripcion: '',
  precio: 0,
  lab_id: null,
  presentacion_id: null,
  activo: true,
});

const titulo = ref("Listado de ingresos");

const consultarMedicamento = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${medicamento.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar el medicamento'
    }).then(() => {
      location.href = '/medicamentos';
    })
    return;
  }

  titulo.value += ' ' + response.data.title.slice(0, 20);

  medicamento.value.nombre = response.data.title;
  medicamento.value.descripcion = response.data.body.replace(/\n/g, " ");
  medicamento.value.precio = parseInt(Math.random() * 100);
};

consultarMedicamento();

const ingresos = ref<[]>([]);

const consultarDescuentos = async () => {
  const response = await axios.get<[]>(
    "https://jsonplaceholder.typicode.com/albums"
  );

  response.data.forEach((ingreso) => {
    ingresos.value.push([
      ingreso.id,
      parseInt(Math.random() * 100),
      new Date().toLocaleDateString(),
      new Date().addDays(ingreso.userId).toLocaleDateString(),
      `<a href="/medicamentos/${medicamento.value.id}/ingresos/${ingreso.id}/editar" class="text-indigo-600 hover:text-indigo-900">Editar</a>`,
    ]);
  });
};

consultarDescuentos();
</script>