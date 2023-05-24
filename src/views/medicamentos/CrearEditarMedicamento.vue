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
                  type="text" v-model="medicamento.nombre" id="nombre" required="true"/>
              </div>

              <div>
                <label class="text-gray-700" for="precio">Precio</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number" v-model="medicamento.precio" id="precio" required="true" />
              </div>

              <div class="col-span-2">
                <label class="text-gray-700" for="descripcion">Descripcion</label>
                <textarea v-model="medicamento.descripcion" id="descripcion"
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  required="true"></textarea>
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ medicamento.id ? 'Guardar' : 'Crear' }}
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
  id: useRoute().params?.id ?? null,
  nombre: '',
  descripcion: '',
  precio: 0,
  lab_id: null,
  presentacion_id: null,
  activo: true,
});

const titulo = ref(medicamento.value.id ? "Editar medicamento" : "Crear medicamento");

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

  titulo.value += ' ' + response.data.id;

  medicamento.value.nombre = response.data.title;
  medicamento.value.descripcion = response.data.body.replace(/\n/g, " ");
  medicamento.value.precio = parseInt(Math.random() * 100);
};

if (medicamento.value.id) {
  consultarMedicamento();
}

const crearMedicamento = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: medicamento.value.nombre,
      body: medicamento.value.descripcion,
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
      text: 'No se pudo crear el medicamento'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Medicamento creado',
    text: 'El medicamento se ha creado correctamente'
  }).then(() => {
    location.href = '/medicamentos';
  })
};

const editarMedicamento = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: medicamento.value.id,
      title: medicamento.value.nombre,
      body: medicamento.value.descripcion,
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
      text: 'No se pudo editar el medicamento'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Medicamento editado',
    text: 'El medicamento se ha editado correctamente'
  }).then(() => {
    location.href = '/medicamentos';
  })
};

const submit = () => {
  if (medicamento.value.id) {
    editarMedicamento();
  } else {
    crearMedicamento();
  }
};
</script>
