# Workflow Automation Builder

## 🛠️ Tecnologías Utilizadas

Stack de tecnologías utilizadas:

- **TypeScript**
- **React**
- **React Flow**
- **TailwindCSS**
- **Lucid**

---

## ⚙️ Requisitos Funcionales

_Tipos de nodos_:

- Start
- Email
- Wait
- Condition

  _Interacciones_:

- Drag & drop de nodos desde un panel lateral
- Conexión entre nodos (Start → solo una salida)
- Edición inline del contenido de los nodos

_Exportación_:

- Mostrar el flujo como JSON. Puede hacerse con console.info(json) en el navegador.

```json
{
  "start": "node_1",
  "nodes": [
    {
      "id": "node_1",
      "type": "start",
      "data": {}
    },
    {
      "id": "node_2",
      "type": "email",
      "data": {
        "title": "New Email",
        "content": "Email content here...",
        "label": "email"
      }
    }
  ]
}
```

---

## 🚧 Ejecutar el Projecto

Para ejecutar el projecto tu máquina local haz lo siguiente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/J-Ciro/workflow-automation.git
   ```

2. Instala las dependencias:

   ```bash
   cd workflow-automation
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador y navega a `http://localhost:5173`.

---
