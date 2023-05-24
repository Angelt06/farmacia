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
                  type="text" v-model="cliente.nombre" id="nombre" required="true"/>
              </div>

              <div>
                <label class="text-gray-700" for="telefono">Telefono</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="number" v-model="cliente.telefono" id="telefono" required="true" />
              </div>

              <div class="col-span-2">
                <label class="text-gray-700" for="direccion">Direccion</label>
                <input
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  type="text" v-model="cliente.direccion" id="direccion" required="true" />
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ cliente.id ? 'Guardar' : 'Crear' }}
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

const cliente = ref({
  id: useRoute().params?.id ?? null,
  nombre: '',
  telefono: '',
  direccion: '',
});

const titulo = ref(cliente.value.id ? "Editar cliente" : "Crear cliente");

const consultarCliente = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${cliente.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar el cliente'
    }).then(() => {
      location.href = '/clientes';
    })
    return;
  }

  titulo.value += ' ' + response.data.id;

  cliente.value.nombre = response.data.title;
  cliente.value.telefono = `3${parseInt(Math.random() * 99)}${parseInt(Math.random() * 1000)}${parseInt(Math.random() * 10000)}`;
  cliente.value.direccion = `Calle ${parseInt(Math.random() * 100)} #${parseInt(Math.random() * 200)}-${parseInt(Math.random() * 200)}`;
};

if (cliente.value.id) {
  consultarCliente();
}

const crearCliente = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: cliente.value.nombre,
      body: cliente.value.direccion,
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
      text: 'No se pudo crear el cliente'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Cliente creado',
    text: 'El cliente se ha creado correctamente'
  }).then(() => {
    location.href = '/clientes';
  })
};

const editarCliente = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: cliente.value.id,
      title: cliente.value.nombre,
      body: cliente.value.direccion,
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
      text: 'No se pudo editar el cliente'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Cliente editado',
    text: 'El cliente se ha editado correctamente'
  }).then(() => {
    location.href = '/clientes';
  })
};

const submit = () => {
  if (cliente.value.id) {
    editarCliente();
  } else {
    crearCliente();
  }
};
</script>
