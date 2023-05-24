<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700" v-text="titulo"></h3>
    <div class="mt-8">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">

          <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="clienteId">Cliente</label>
                <select
                  class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                  v-model="venta.cliente_id" id="esPorcentaje" required="true">
                  <option value="1">Cliente 1</option>
                  <option value="2">Cliente 2</option>
                  <option value="3">Cliente 3</option>
                  <option value="4">Cliente 4</option>
                  <option value="5">Cliente 5</option>
                </select>
              </div>

              <div>
                <label class="text-gray-700" for="medicamentos">Medicamentos</label>
                <div class="flex gap-2 mt-2">
                  <select
                    class="w-full border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" id="medicamentos"
                    v-model="medicamentoSeleccionado">
                    <option v-for="(medicamento, index) in medicamentos" :key="index" :value="medicamento.id">{{ medicamento.nombre }}</option>
                  </select>
                  <div
                    class="flex items-center px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                    @click="agregarMedicamento" role="button">
                    Agregar
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Medicamento
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Cantidad
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Valor unitario
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Descuento
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white">
                  <tr v-for="(medicamento, index) in medicamentosVenta" :key="index">
                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                      <div class="text-sm leading-5 text-gray-900">
                        {{ medicamento.nombre }}
                      </div>
                    </td>

                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                      <div class="text-sm leading-5 text-gray-900">
                        {{ medicamento.cantidad }}
                      </div>
                    </td>

                    <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                      <div class="text-sm leading-5 text-gray-900">
                        {{ medicamento.valor_unitario }}
                      </div>
                    </td>

                    <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
                      0
                    </td>

                    <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
                      {{ medicamento.cantidad * medicamento.valor_unitario }}
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td colspan="4" class="px-6 py-4 text-sm font-medium leading-5 text-right text-gray-500 uppercase border-t border-gray-200 whitespace-nowrap">
                      Total
                    </td>
                    <td class="px-6 py-4 text-sm font-medium leading-5 text-gray-500 border-t border-gray-200 whitespace-nowrap" v-text="totalVenta">
                      
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                {{ venta.id ? 'Guardar' : 'Crear' }}
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

let medicamentos = [
  {
    id: 1,
    nombre: 'Paracetamol',
    cantidad: 5,
    valor_unitario: 1000,
  },
  {
    id: 2,
    nombre: 'Ibuprofeno',
    cantidad: 10,
    valor_unitario: 2000,
  },
  {
    id: 3,
    nombre: 'Acetaminofen',
    cantidad: 15,
    valor_unitario: 3000,
  }
]

const medicamentoSeleccionado = ref(1); // Paracetamol

const medicamentosVenta = ref([]);
const totalVenta = ref(0);

const venta = ref({
  id: useRoute().params?.id ?? null,
  cliente_id: '',
});

const titulo = ref(venta.value.id ? "Editar venta" : "Crear venta");

const consultarVenta = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${venta.value.id}`
  ).catch((error) => {

  });

  if (!response) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo consultar la venta'
    }).then(() => {
      location.href = '/ventas';
    })
    return;
  }

  titulo.value += ' ' + response.data.id;

  venta.value.cliente_id = response.data.id;
  medicamentosVenta.value = medicamentos;
  totalVenta.value = medicamentos.reduce((total, medicamento) => total + (medicamento.valor_unitario * medicamento.cantidad), 0);
};

if (venta.value.id) {
  consultarVenta();
}

const crearVenta = async () => {
  const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`,
    {
      title: 'nombre',
      body: 'body',
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
      text: 'No se pudo crear la venta'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Venta creada',
    text: 'La venta se ha creado correctamente'
  }).then(() => {
    location.href = '/ventas/crear';
  })
};

const editarVenta = async () => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/1`,
    {
      id: venta.value.id,
      title: 'nombre',
      body: 'direccion',
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
      text: 'No se pudo editar el venta'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: 'Venta editada',
    text: 'La venta se ha editado correctamente'
  }).then(() => {
    location.href = '/ventas';
  })
};

const submit = () => {
  if (venta.value.id) {
    editarVenta();
  } else {
    crearVenta();
  }
};

const agregarMedicamento = () => {
  const medicamento = medicamentos.find((medicamento) => medicamento.id === medicamentoSeleccionado.value);

  if (!medicamento) {
    return;
  }

  medicamentosVenta.value.push(medicamento);
  totalVenta.value += medicamento.valor_unitario * medicamento.cantidad;
};

</script>
