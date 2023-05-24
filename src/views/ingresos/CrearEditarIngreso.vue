<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700" v-text="titulo"></h3>
    <div class="flex justify-end">
      <router-link class="flex items-center duration-200 border-l-4" :to="`/medicamentos/${useRoute().params.medicamentoId}/ingresos`">
        <button
          class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 mx-1">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

          <span class="mx-1">Listado de ingresos</span>
        </button>
      </router-link>
    </div>
    <div class="mt-8">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">

          <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div class="col-span-2">
                <label class="text-gray-700" for="cantidad">Cantidad</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number" v-model="ingreso.cantidad" id="cantidad" required="true" />
              </div>

              <div>
                <label class="text-gray-700" for="fechaInicial">Fecha Inicial</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="ingreso.fechaInicial" id="fechaInicial" required="true" />
              </div>

              <div>
                <label class="text-gray-700" for="fechaFinal">Fecha Final</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="ingreso.fechaFinal" id="fechaFinal" required="true" />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ ingreso.id ? 'Guardar' : 'Crear' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2'

const medicamento = ref({
  id: useRoute().params.medicamentoId,
  nombre: '',
  descripcion: '',
  precio: 0,
  lab_id: null,
  presentacion_id: null,
  activo: true,
});

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
      location.href = `/medicamentos/${medicamento.value.id}/ingresos`;
    })
    return;
  }

  titulo.value += ' ' + response.data.title.slice(0, 20);

  medicamento.value.nombre = response.data.title;
  medicamento.value.descripcion = response.data.body.replace(/\n/g, " ");
  medicamento.value.precio = parseInt(Math.random() * 100);
};

consultarMedicamento();

const ingreso = ref({
  id: useRoute().params?.id ?? null,
  cantidad: 0,
  fechaInicial: '',
  fechaFinal: '',
});

const titulo = ref(ingreso.value.id ? "Editar ingreso" : "Crear ingreso");

const consultarIngreso = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${ingreso.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar el ingreso'
    }).then(() => {
      location.href = `/medicamentos/${medicamento.value.id}/ingresos`;
    })
    return;
  }

  titulo.value += ' ' + response.data.id;

  ingreso.value.cantidad = parseInt(Math.random() * 100);
  ingreso.value.fechaInicial = new Date().toLocaleDateString();
  ingreso.value.fechaFinal = new Date().addDays(response.data.userId).toLocaleDateString();
};

if (ingreso.value.id) {
  consultarIngreso();
}

const crearIngreso = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: ingreso.value.fechaInicial,
      body: ingreso.value.fechaFinal,
      userId: 1,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).catch((error) => { });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo crear el ingreso'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Ingreso creado',
    text: 'El ingreso se ha creado correctamente'
  }).then(() => {
    location.href = `/medicamentos/${medicamento.value.id}/ingresos`;
  })
};

const editarIngreso = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: ingreso.value.id,
      title: ingreso.value.fechaInicial,
      body: ingreso.value.fechaFinal,
      userId: 1,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).catch((error) => { });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo editar el ingreso'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Ingreso editado',
    text: 'El ingreso se ha editado correctamente'
  }).then(() => {
    location.href = `/medicamentos/${medicamento.value.id}/ingresos`;
  })
};

const submit = () => {
  if (ingreso.value.id) {
    editarIngreso();
  } else {
    crearIngreso();
  }
};
</script>
