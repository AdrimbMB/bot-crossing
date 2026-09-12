# Entrega de publicación de AgentCity

Estado revisado: 12 de septiembre de 2026
Versión preparada: 1.1.0

## Lo que ya está preparado

- Aplicación de escritorio para Windows x64 con instalación por usuario y desinstalación limpia.
- Paquete AppX para Microsoft Store, pendiente únicamente de la identidad real de Partner Center.
- Ruta separada para generar un instalador EXE firmado; falla si falta la firma o el sello de tiempo.
- Avisos de licencia, atribución del fork, privacidad, seguridad y licencias de terceros.
- Texto reutilizable para la web y LinkedIn en `WEBSITE_CONTENT.md`.
- Automatización de GitHub para ejecutar pruebas, compilación y auditoría en cada cambio.
- 39 pruebas, compilación de producción y auditorías de dependencias en verde.

Los binarios creados localmente con identidad ficticia son solo pruebas. No deben subirse como la
descarga pública recomendada.

## Lo que debes hacer tú

### 1. Confirmar identidad y nombre

Decide si publicarás como persona física o mediante una empresa. Confirma también que `Adrian
Martin` es el nombre público correcto del mantenedor. Antes de invertir en la web o el certificado,
comprueba que puedes usar `AgentCity` en los países donde vayas a promocionarlo.

### 2. Abrir Microsoft Partner Center

Registra y verifica una cuenta de desarrollador de Windows. Reserva `AgentCity` como producto
MSIX/PWA. Partner Center mostrará tres valores no secretos que debes copiar exactamente:

- Package/Identity/Name
- Package/Identity/Publisher
- Package/Properties/PublisherDisplayName

Esos valores se facilitan como variables de entorno
`AGENTCITY_STORE_IDENTITY_NAME`, `AGENTCITY_STORE_PUBLISHER` y
`AGENTCITY_STORE_PUBLISHER_DISPLAY_NAME`. No hay que inventarlos ni guardar credenciales en Git.

### 3. Preparar la ficha pública

Elige dominio, correo o formulario de soporte, categoría, países, precio, clasificación por edades
y capturas. Publica `PRIVACY.md` en una URL HTTPS estable. Usa `WEBSITE_CONTENT.md` como base de la
landing page y mantén visible la atribución al proyecto original.

### 4. Generar y certificar el paquete real

Con los tres valores de Partner Center, ejecuta `npm run desktop:store`. Revisa el manifiesto,
ejecuta el Windows App Certification Kit y prueba instalación, actualización, funcionamiento sin
Internet, detección de herramientas y desinstalación en una cuenta de Windows limpia. Después sube
ese AppX exacto a Partner Center y envíalo a certificación.

### 5. Publicar la web

El botón principal debe enlazar a la ficha certificada de Microsoft Store. Hasta que Microsoft la
apruebe, muestra “Próximamente” o “Pendiente de certificación”; no enlaces el AppX de prueba.

### 6. Descarga EXE opcional

Si también quieres descarga directa desde GitHub o tu web, contrata o configura una identidad de
firma de código compatible y guárdala en un almacén de secretos. Nunca compartas claves privadas,
contraseñas ni secretos de Azure por chat, issues o commits. Genera el EXE con
`npm run desktop:installer:signed`, comprueba ambas firmas, analiza el archivo y publica su SHA-256.
Una firma válida identifica al editor y detecta manipulaciones, pero un editor nuevo aún puede
necesitar reputación para que SmartScreen deje de advertir.

## Orden recomendado

1. Confirmar nombre público y disponibilidad de AgentCity.
2. Crear Partner Center y reservar el producto.
3. Publicar soporte y privacidad en la web.
4. Construir y probar el AppX con la identidad real.
5. Enviar a certificación.
6. Enlazar la web a Microsoft Store.
7. Añadir el EXE firmado solo si quieres mantener un canal alternativo.

Este documento es una guía práctica de ingeniería y cumplimiento de código abierto, no asesoría
jurídica. Para una explotación comercial relevante o dudas de marca, consulta a un profesional de
la jurisdicción aplicable.
