<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700" v-text="titulo"></h3>
    <div class="mt-8">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">

          <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="nombre">Nombre</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="lab.nombre" id="nombre" required="true"/>
              </div>

              <div>
                <label class="text-gray-700" for="direccion">Direccion</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="lab.direccion" id="direccion" required="true" />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ lab.id ? 'Guardar' : 'Crear' }}
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

const lab = ref({
  id: useRoute().params?.id ?? null,
  nombre: '',
  direccion: '',
});

const titulo = ref(lab.value.id ? "Editar laboratorio" : "Crear laboratorio");

const consultarLaboratorio = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${lab.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar el laboratorio'
    }).then(() => {
      location.href = '/laboratorios';
    })
    return;
  }

  titulo.value += ' ' + response.data.id;

  lab.value.nombre = response.data.title;
  lab.value.direccion = `Calle ${parseInt(Math.random() * 100)} #${parseInt(Math.random() * 200)}-${parseInt(Math.random() * 200)}`;
};

if (lab.value.id) {
  consultarLaboratorio();
}

const crearLaboratorio = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: lab.value.nombre,
      body: lab.value.direccion,
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
      text: 'No se pudo crear el laboratorio'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Laboratorio creado',
    text: 'El laboratorio se ha creado correctamente'
  }).then(() => {
    location.href = '/laboratorios';
  })
};

const editarLaboratorio = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: lab.value.id,
      title: lab.value.nombre,
      body: lab.value.direccion,
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
      text: 'No se pudo editar el laboratorio'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Laboratorio editado',
    text: 'El laboratorio se ha editado correctamente'
  }).then(() => {
    location.href = '/laboratorios';
  })
};

const submit = () => {
  if (lab.value.id) {
    editarLaboratorio();
  } else {
    crearLaboratorio();
  }
};
</script>
