import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Dashboard from "./views/Dashboard.vue";
import ListadoMedicamento from "./views/medicamentos/ListadoMedicamento.vue";
import CrearEditarMedicamento from "./views/medicamentos/CrearEditarMedicamento.vue";
import ListadoLaboratorio from "./views/laboratorios/ListadoLaboratorio.vue";
import CrearEditarLaboratorio from "./views/laboratorios/CrearEditarLaboratorio.vue";
import ListadoPresentacion from "./views/presentaciones/ListadoPresentacion.vue";
import CrearEditarPresentacion from "./views/presentaciones/CrearEditarPresentacion.vue";
import CrearEditarCliente from "./views/clientes/CrearEditarCliente.vue";
import ListadoCliente from "./views/clientes/ListadoCliente.vue";
import CrearEditarDescuento from "./views/descuentos/CrearEditarDescuento.vue";
import ListadoDescuento from "./views/descuentos/ListadoDescuento.vue";
import CrearEditarIngreso from "./views/ingresos/CrearEditarIngreso.vue";
import ListadoIngreso from "./views/ingresos/ListadoIngreso.vue";
import CrearEditarVenta from "./views/ventas/CrearEditarVenta.vue";
import ListadoVenta from "./views/ventas/ListadoVenta.vue";

import Forms from "./views/Forms.vue";
import Tables from "./views/Tables.vue";
import UIElements from "./views/UIElements.vue";
import Login from "./views/Login.vue";
import Modal from "./views/Modal.vue";
import Card from "./views/Card.vue";
import Blank from "./views/Blank.vue";
import NotFound from "./views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/medicamentos",
    name: "ListadoMedicamento",
    component: ListadoMedicamento,
  },
  {
    path: "/medicamentos/crear",
    name: "CrearMedicamento",
    component: CrearEditarMedicamento,
  },
  {
    path: "/medicamentos/:id/editar",
    name: "EditarMedicamento",
    component: CrearEditarMedicamento,
  },
  {
    path: "/laboratorios",
    name: "ListadoLaboratorio",
    component: ListadoLaboratorio,
  },
  {
    path: "/laboratorios/crear",
    name: "CrearLaboratorio",
    component: CrearEditarLaboratorio,
  },
  {
    path: "/laboratorios/:id/editar",
    name: "EditarLaboratorio",
    component: CrearEditarLaboratorio,
  },
  {
    path: "/presentaciones",
    name: "ListadoPresentacion",
    component: ListadoPresentacion,
  },
  {
    path: "/presentaciones/crear",
    name: "CrearPresentacion",
    component: CrearEditarPresentacion,
  },
  {
    path: "/presentaciones/:id/editar",
    name: "EditarPresentacion",
    component: CrearEditarPresentacion,
  },
  {
    path: "/clientes",
    name: "ListadoCliente",
    component: ListadoCliente,
  },
  {
    path: "/clientes/crear",
    name: "CrearCliente",
    component: CrearEditarCliente,
  },
  {
    path: "/clientes/:id/editar",
    name: "EditarCliente",
    component: CrearEditarCliente,
  },
  {
    path: "/medicamentos/:medicamentoId/descuentos",
    name: "ListadoDescuento",
    component: ListadoDescuento,
  },
  {
    path: "/medicamentos/:medicamentoId/descuentos/crear",
    name: "CrearDescuento",
    component: CrearEditarDescuento,
  },
  {
    path: "/medicamentos/:medicamentoId/descuentos/:id/editar",
    name: "EditarDescuento",
    component: CrearEditarDescuento,
  },
  {
    path: "/medicamentos/:medicamentoId/ingresos",
    name: "ListadoIngreso",
    component: ListadoIngreso,
  },
  {
    path: "/medicamentos/:medicamentoId/ingresos/crear",
    name: "CrearIngreso",
    component: CrearEditarIngreso,
  },
  {
    path: "/medicamentos/:medicamentoId/ingresos/:id/editar",
    name: "EditarIngreso",
    component: CrearEditarIngreso,
  },
  {
    path: "/ventas",
    name: "ListadoVenta",
    component: ListadoVenta,
  },
  {
    path: "/ventas/crear",
    name: "CrearVenta",
    component: CrearEditarVenta,
  },
  {
    path: "/ventas/:id/editar",
    name: "EditarVenta",
    component: CrearEditarVenta,
  },


  
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
