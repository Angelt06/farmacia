<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700" v-text="titulo"></h3>
    <div class="flex justify-end">
      <router-link class="flex items-center duration-200 border-l-4" :to="`/medicamentos/${useRoute().params.medicamentoId}/descuentos`">
        <button
          class="flex items-center px-2 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 mx-1">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>

          <span class="mx-1">Listado de descuentos</span>
        </button>
      </router-link>
    </div>
    <div class="mt-8">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">

          <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="valor">Valor</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number" v-model="descuento.valor" id="valor" required="true" />
              </div>

              <div>
                <label class="text-gray-700" for="esPorcentaje">¿Es porcentual?</label>
                <select
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  v-model="descuento.esPorcentaje" id="esPorcentaje">
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div>
                <label class="text-gray-700" for="fechaInicial">Fecha Inicial</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="descuento.fechaInicial" id="fechaInicial" required="true" />
              </div>

              <div>
                <label class="text-gray-700" for="fechaFinal">Fecha Final</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="descuento.fechaFinal" id="fechaFinal" required="true" />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ descuento.id ? 'Guardar' : 'Crear' }}
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
      location.href = `/medicamentos/${medicamento.value.id}/descuentos`;
    })
    return;
  }

  titulo.value += ' ' + response.data.title.slice(0, 20);

  medicamento.value.nombre = response.data.title;
  medicamento.value.descripcion = response.data.body.replace(/\n/g, " ");
  medicamento.value.precio = parseInt(Math.random() * 100);
};

consultarMedicamento();

const descuento = ref({
  id: useRoute().params?.id ?? null,
  valor: 0,
  esPorcentaje: 1,
  fechaInicial: '',
  fechaFinal: '',
});

const titulo = ref(descuento.value.id ? "Editar descuento" : "Crear descuento");

const consultarDescuento = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${descuento.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar el descuento'
    }).then(() => {
      location.href = `/medicamentos/${medicamento.value.id}/descuentos`;
    })
    return;
  }

  titulo.value += ' ' + response.data.id;

  const esPorcentaje = response.data.id % 2 === 0;

  descuento.value.valor = esPorcentaje ? parseInt(Math.random() * 50) : parseInt(Math.random() * 10000);
  descuento.value.esPorcentaje = esPorcentaje ? 1 : 0;
  descuento.value.fechaInicial = new Date().toLocaleDateString();
  descuento.value.fechaFinal = new Date().addDays(response.data.userId).toLocaleDateString();
};

if (descuento.value.id) {
  consultarDescuento();
}

const crearDescuento = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: descuento.value.fechaInicial,
      body: descuento.value.fechaFinal,
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
      text: 'No se pudo crear el descuento'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Descuento creado',
    text: 'El descuento se ha creado correctamente'
  }).then(() => {
    location.href = `/medicamentos/${medicamento.value.id}/descuentos`;
  })
};

const editarDescuento = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: descuento.value.id,
      title: descuento.value.fechaInicial,
      body: descuento.value.fechaFinal,
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
      text: 'No se pudo editar el descuento'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Descuento editado',
    text: 'El descuento se ha editado correctamente'
  }).then(() => {
    location.href = `/medicamentos/${medicamento.value.id}/descuentos`;
  })
};

const submit = () => {
  if (descuento.value.id) {
    editarDescuento();
  } else {
    crearDescuento();
  }
};
</script>
