# SardIA — Contenido extraído de Notion para la página web

> Recopilación de toda la información relevante para la web de la consultoría, extraída del workspace de Notion (25 agosto 2026). Excluye tutoriales, guías de herramientas y documentación interna de costes/fiscal.

---

## 1. Identidad de marca

- **Nombre:** SardIA (juego de palabras con el apellido Sardà + IA)
- **Mascota/icono:** Raya (manta ray), temática marina
- **Logo:** Ya existe (+ vídeo animación del giro para la web)
- **Lema:** Pendiente de definir — corto, para acompañar la animación del logo, sin nombrar la raya explícitamente
- **Zona geográfica principal:** Camp de Tarragona y Terres de l'Ebre (Cataluña)
- **Público objetivo:** PYMEs y autónomos

---

## 2. Propuesta de valor (extraída del pitch comercial)

La consultoría NO se vende como "implementamos IA". Se vende como **resolución de problemas concretos del día a día del negocio**:

- Reducir horas perdidas en tareas repetitivas
- Conectar lo que ya usan (sin cambiar de sistema ni contratar a nadie nuevo)
- Empezar pequeño: un solo proceso, unas semanas, resultado visible antes de comprometerse a más
- Sin riesgo: si el resultado no convence, no se ha perdido gran cosa

### Filosofía de venta (4 fases)

1. **Escuchar el dolor** — No empezar hablando de IA. Preguntar qué parte del día a día les lleva más tiempo o más quebraderos de cabeza.
2. **Traducirlo a algo concreto** — Responder con tiempo y dinero, no con tecnología. "Eso normalmente se puede automatizar en un par de semanas."
3. **Prueba pequeña** — Empezar por una sola cosa, no por todo el negocio.
4. **Cierre con próximo paso pequeño** — Demo o reunión de seguimiento, nunca "firmar un proyecto".

### Mensajes clave para la web (basados en las objeciones frecuentes)

- **"Es caro"** → No es un gasto fijo como un empleado. Es un proyecto puntual que se recupera con las horas que ahora se pierden.
- **"Si automatizo, ¿qué hacen mis empleados?"** → En una PYME pequeña casi nunca sobra gente. La idea es quitarle la parte aburrida a alguien que ya tienes.
- **"No entiendo de esto"** → No hace falta saber cómo funciona por dentro, igual que no necesitas saber cómo funciona un lavavajillas.
- **"Ya lo hacemos con Excel"** → ¿Qué pasa cuando esa persona se coge vacaciones, o cuando crece el volumen?
- **"¿Y mis datos, dónde van?"** → Servidor controlado, datos no compartidos con terceros ni usados para entrenar nada externo. Transparencia total sobre por dónde pasa cada dato.

---

## 3. Plan de servicios (embudo de ventas)

### Paso 1 — Auditoría de la empresa (puerta de entrada)
Estudio de procesos, análisis de oportunidades, estudio de vulnerabilidades y roadmap técnico. Detectar dónde se puede implementar IA viendo cómo se trabaja realmente en la empresa.

**Estructura:** 1 día en la empresa + 1 semana de análisis.

- Cuestionario previo para conocer el organigrama real
- 6-8 conversaciones de 30-45 min en un día
- Orden: gerente primero (contexto) → empleados de cada área → gerente al final para contrastar
- Grabación con permiso RGPD
- Resultado: flujos as-is (BPMN), matriz impacto/esfuerzo, roadmap técnico, informe final

Se auditan **todos los departamentos** de la empresa: Marketing, Ventas, Fulfillment, Administración (HR, Contabilidad, Facturación). Si solo se mira un área, la solución puede crear problemas en las demás.

### Paso 2 — Implementación Express (upsell para pequeñas empresas)
Ejecución directa de las soluciones detectadas en la auditoría.

### Paso 3 — Formación de Equipos (todo tipo de empresas)
Para empresas que saben que la IA es el futuro pero no tienen empleados formados.

### Paso 4 — Consultoría CAIO / Director de IA (empresas medianas-grandes)
Dirigir proyectos que ya están en marcha. Para empresas que tienen capacidad técnica pero no saben hacia dónde ir.

### Otros servicios
- Formación a particulares que quieran mejorar sus prestaciones laborales
- Formación en escuelas

---

## 4. Catálogo de servicios detallado

### BI / Reporting

| # | Servicio | Precio orientativo |
|---|---------|-------------------|
| 1 | Limpieza y estructuración de datos | 300–800 € |
| 2 | Dashboard Power BI a medida | 500–1.500 € |
| 3 | Cuadro de mando financiero con actualización automática | 800–2.000 € + mantenimiento 80–200 €/mes |

### RPA / Automatización

| # | Servicio | Precio orientativo |
|---|---------|-------------------|
| 4 | Mini-ERP a medida (agenda, fichas de cliente, facturación básica) | 1.500–4.000 € según módulos |
| 5 | Automatización de un flujo concreto (factura→contabilidad, pedido→hoja, lead→CRM) | 250–800 € por flujo |
| 6 | Agente/bot WhatsApp para recordatorios de cita o atención básica | 600–1.800 € + mantenimiento 50–100 €/mes |

> Nota: el coste de la API de IA (OpenAI/Claude) va aparte.

### Formación / Talleres

| # | Servicio | Precio orientativo |
|---|---------|-------------------|
| 7 | Taller Claude/ChatGPT — redacción y organización para administrativos | 150–250 € (sesión 2-3h) |
| 8 | Taller Claude Code + conectores para no-programadores | 300–500 € (media jornada 4h) |
| 9 | Auditoría de procesos / diagnóstico inicial | 100–150 € (o gratis para primeros 3-5 clientes como gancho) |

### Web (complemento, nunca servicio suelto)

| # | Servicio | Precio orientativo |
|---|---------|-------------------|
| 10 | Landing conectada a la automatización (formulario → n8n/CRM del cliente) | 300–700 € |

> Solo se vende empaquetada con el servicio 5 o 6. Sola compite contra Wix/WordPress y se pierde margen y posicionamiento.

### Machine Learning — Servicio Premium

| # | Servicio | Precio orientativo |
|---|---------|-------------------|
| 11 | Predicción de negocio a medida (previsión ventas, demanda, facturación) | 2.500–5.000 € |

> Solo para empresas con historial de datos limpio (mínimo 1-2 años). Stack: Python + scikit-learn + Streamlit. Métricas de validación explicadas en términos de negocio, no técnicos.

---

## 5. Producto estrella: CRM/ERP automatizado

### Resumen
Un cliente escribe por **WhatsApp** o **Gmail** → **n8n** activa un **agente de IA** que interpreta el mensaje → el agente usa herramientas para consultar o escribir en **Supabase** → n8n responde automáticamente → el **dashboard** (Power BI o Streamlit) muestra los datos actualizados sin tocar nada a mano.

### Funcionalidades del CRM automatizado

**Captación y gestión de clientes:**
- Interpretación automática de mensajes (¿quiere una cita? ¿confirma? ¿pregunta precio?)
- Creación/actualización automática de fichas de cliente (sin duplicados)
- Respuesta automática pidiendo el dato que falte o confirmando
- Lead scoring: priorizar por urgencia/interés de compra

**Seguimiento:**
- Recordatorios automáticos (día antes y hora antes de la cita)
- Reactivación de clientes inactivos ("hace tiempo que no te vemos")
- Encuesta de satisfacción automática al día siguiente

**Captación multicanal:**
- WhatsApp, Gmail, Instagram, formulario web → todo al mismo CRM
- Formulario web → lead directo sin copiar emails a mano

**Enriquecimiento de datos:**
- Autocompletar ficha del cliente (busca web, sector, tamaño empresa)
- Deduplicación automática por teléfono o email

**Facturación y postventa:**
- Factura automática al confirmar servicio
- Sincronización con programa de contabilidad (Holded, Factorial, etc.)

**Alertas y reporting:**
- Aviso por WhatsApp si escribe un cliente VIP o hay cita sin confirmar
- Informe semanal automático (citas, % confirmadas, ingresos) por email o WhatsApp

**Calendario:**
- Evitar overbooking automáticamente
- Sincronización bidireccional con Google Calendar

### Prioridad recomendada por ROI/facilidad
1. Recordatorios de cita
2. Reactivación de clientes inactivos
3. Informe semanal automático

---

## 6. Herramientas de captación de clientes propias

### Mejora SEO para clientes
Herramienta que busca empresas por keyword (ej. "dentistas en Tarragona"), conecta con IA para encontrar negocios, y con Apollo para obtener correos de decisores (marketing, CEO). Permite auditar webs que están en la segunda página de Google y detectar sus fallos.

### Análisis de reseñas y posicionamiento local
Análisis de reseñas de Google Maps para detectar patrones. Incluye competidores. Funcionalidades:
- Geogrid para calcular posicionamiento respecto a negocios cercanos
- AI Local: preguntar a la IA "dime dentistas en Valls" y trabajar para que tu negocio aparezca en todas las consultas

### AEO (Answer Engine Optimization)
Sustituto del SEO clásico. En el último año descendió el acceso humano a webs un 50% — ahora son AI Crawlers. Se trabaja para que la IA recomiende tu web/empresa primero. Se usa Cloudflare para auditar y optimizar la web para agentes de IA.

---

## 7. Proceso de creación de webs para clientes

Se ofrecen webs animadas de alta gama usando un proceso estructurado:

1. **Fundación:** Definir marca, estilo, comunicación
2. **Render y animación:** Generar imágenes/vídeos con IA (Higgsfield o alternativas)
3. **Montaje:** Codificación de la web con Claude Design / Claude Code
4. **Optimización SEO/AEO**
5. **Publicación:** GitHub + Vercel o Hostinger

El proceso premium ("Gauntlet Loop") incluye ingeniería inversa de webs referentes, sistema de diseño exportado, y tres críticos de IA independientes que evalúan el resultado iterativamente hasta que todos dan luz verde.

---

## 8. Stack tecnológico (para sección "Cómo trabajamos")

- **Automatización:** n8n (workflows visuales, autoalojable)
- **Base de datos:** Supabase (PostgreSQL gestionada)
- **Reporting:** Power BI, Streamlit
- **IA:** Claude, GPT (según caso)
- **Machine Learning:** Python + scikit-learn + Streamlit
- **Web:** HTML/CSS/JS, Vercel/Hostinger, Cloudflare
- **Procesos:** BPMN con Miro para mapear flujos de empresa

---

## 9. Información pendiente / huecos para la web

- **Lema definitivo** para la animación del logo
- **Sección "Sobre mí"** — No hay contenido explícito en Notion sobre perfil personal para la web (formación, experiencia, valores). Habrá que redactarlo.
- **Testimonios / casos de éxito** — No se han encontrado en Notion
- **FAQ** — No existe como tal, aunque el pitch comercial tiene material para construirla
- **Política de privacidad / aviso legal** — Hay documentación legal-fiscal pero orientada a la gestión interna, no a los textos legales de la web
