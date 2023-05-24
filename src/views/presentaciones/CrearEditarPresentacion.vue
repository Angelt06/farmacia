<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700" v-text="titulo"></h3>
    <div class="mt-8">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">

          <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div class="col-span-2">
                <label class="text-gray-700" for="nombre">Nombre</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="presentacion.nombre" id="nombre" required="true"/>
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ presentacion.id ? 'Guardar' : 'Crear' }}
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

const presentacion = ref({
  id: useRoute().params?.id ?? null,
  nombre: '',
});

const titulo = ref(presentacion.value.id ? "Editar presentacion" : "Crear presentacion");

const consultarPresentacion = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${presentacion.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar la presentacion'
    }).then(() => {
      location.href = '/presentaciones';
    })
    return;
  }

  titulo.value += ' ' + response.data.id;

  presentacion.value.nombre = response.data.username;
};

if (presentacion.value.id) {
  consultarPresentacion();
}

const crearPresentacion = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: presentacion.value.nombre,
      body: 'Body',
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
      text: 'No se pudo crear la presentacion'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Presentacion creada',
    text: 'La presentacion se ha creado correctamente'
  }).then(() => {
    location.href = '/presentaciones';
  })
};

const editarPresentacion = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: presentacion.value.id,
      title: presentacion.value.nombre,
      body: 'Body',
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
      text: 'No se pudo editar la presentacion'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Presentacion editada',
    text: 'La presentacion se ha editado correctamente'
  }).then(() => {
    location.href = '/presentaciones';
  })
};

const submit = () => {
  if (presentacion.value.id) {
    editarPresentacion();
  } else {
    crearPresentacion();
  }
};
</script>
