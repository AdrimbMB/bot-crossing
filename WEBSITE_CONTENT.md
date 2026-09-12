---
title: "AgentCity — tus agentes de programación como una colonia 3D"
description: "Aplicación local y de código abierto que convierte las sesiones de Codex, Claude Code y Cursor en una colonia 3D privada en tu PC."
product: "AgentCity"
version: "1.1.0"
language: "es"
repository: "https://github.com/AdrimbMB/bot-crossing"
upstream: "https://github.com/Station-Sciences/bot-crossing"
licence: "MIT"
download_status: "Pendiente de certificación y firma"
---

# AgentCity

## Tus agentes están construyendo una ciudad

AgentCity convierte las sesiones de tus herramientas de programación en una colonia 3D. Cada
conversación aparece como un pequeño astronauta que trabaja, espera una respuesta, termina una
tarea o descansa dentro del terreno de su repositorio.

Todo sucede en tu ordenador. No necesitas crear una cuenta y AgentCity no envía tus sesiones,
transcripciones ni rutas de proyectos a un servidor externo.

> **Estado de descarga:** la versión pública recomendada se publicará después de completar la
> firma o certificación de Microsoft Store. Hasta entonces, las releases de GitHub deben
> considerarse versiones preliminares para evaluación técnica.

## Qué puedes hacer

- Ver en un solo espacio las sesiones locales de Codex, Claude Code y Cursor compatibles.
- Identificar qué agentes están trabajando, esperando, bloqueados o inactivos.
- Abrir una conversación en su herramienta original.
- Localizar la carpeta de un proyecto y comenzar una nueva sesión.
- Organizar la colonia y conservar su distribución entre actualizaciones.
- Utilizar la aplicación sin conexión y sin instalar Node.js.

## Privacidad por diseño

AgentCity funciona de forma local. Su servidor interno escucha únicamente en `127.0.0.1`, el
renderizador de Electron está aislado y las sesiones originales se tratan como datos de solo
lectura. La aplicación guarda exclusivamente su configuración y el plano de la colonia dentro del
perfil del usuario.

No hay telemetría, publicidad, analítica, sincronización en la nube ni venta de datos. Consulta la
[política de privacidad](PRIVACY.md) para conocer exactamente qué información se procesa.

## Descarga segura

### Microsoft Store — canal recomendado

Cuando finalice la certificación, este será el botón principal. Microsoft verificará y firmará el
paquete y gestionará sus actualizaciones.

**Botón sugerido:** `Obtener AgentCity desde Microsoft Store`

### GitHub — código fuente y descarga alternativa

El código, historial y versiones técnicas están disponibles en
https://github.com/AdrimbMB/bot-crossing. Una descarga directa solo debe marcarse como recomendada
cuando el instalador y `AgentCity.exe` tengan una firma Authenticode válida y sello de tiempo.

Publica siempre junto al instalador:

- número de versión;
- firma o nombre del publicador;
- suma SHA-256;
- enlace a las notas de la versión;
- enlace al código fuente del commit correspondiente.

## Proyecto abierto y procedencia

AgentCity es un fork independiente de [Bot Crossing](https://github.com/Station-Sciences/bot-crossing),
creado originalmente por [Jarren Rocks](https://jarren.rocks). AgentCity añade la experiencia de
escritorio para Windows, instalación por usuario, almacenamiento persistente, migración segura,
empaquetado, controles de publicación y una identidad visual propia.

El código se distribuye bajo licencia MIT y conserva el copyright y los avisos originales. Los
recursos KayKit utilizados por el proyecto son CC0 y se acredita a Kay Lousberg. Los iconos de
Material Design utilizados mediante Pictogrammers conservan sus licencias correspondientes.

AgentCity no está afiliado ni respaldado por Jarren Rocks, OpenAI, Anthropic, Cursor o Microsoft.
Los nombres de terceros se utilizan únicamente para describir compatibilidad.

## Preguntas frecuentes

### ¿AgentCity sube mis conversaciones a Internet?

No. Procesa en tu propio ordenador la información local necesaria para construir la visualización.

### ¿Modifica o elimina mis sesiones?

No. Los archivos de las herramientas compatibles se tratan como solo lectura. Archivar u ocultar
elementos dentro de la colonia afecta únicamente al estado de AgentCity.

### ¿Necesito instalar Codex, Claude Code o Cursor?

Sí. AgentCity no incluye esas herramientas; detecta las que ya tienes instaladas y configuradas.

### ¿Es un producto oficial de esas empresas?

No. Es un proyecto independiente de código abierto.

### ¿Puedo revisar el código?

Sí. El repositorio, la licencia, los créditos y la arquitectura son públicos.

## Requisitos iniciales

- Windows 10 u 11 de 64 bits.
- Una herramienta compatible instalada y con sesiones locales existentes.
- GPU compatible con WebGL para la visualización 3D.

## Texto breve para LinkedIn

He convertido un proyecto abierto que me gustaba en una experiencia de escritorio completa para
Windows. AgentCity es un fork independiente de Bot Crossing, creado originalmente por Jarren
Rocks, que representa cada sesión de Codex, Claude Code o Cursor como un pequeño astronauta dentro
de una colonia 3D.

Mi trabajo se ha centrado en el empaquetado con Electron, instalación por usuario, persistencia y
migración no destructiva, aislamiento del renderizador, servidor exclusivamente local, controles
de publicación, documentación y una identidad visual propia. El proyecto conserva la licencia MIT
y los créditos originales.

Estoy preparando una distribución segura mediante Microsoft Store y una descarga alternativa
firmada, manteniendo el código disponible para revisión en GitHub.
