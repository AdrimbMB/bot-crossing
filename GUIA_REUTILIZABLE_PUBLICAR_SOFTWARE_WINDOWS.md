---
title: "Guía reutilizable para crear, empaquetar y publicar software seguro en Windows"
version: "1.0"
updated: "2026-09-12"
status: "Plantilla extensible"
audience: "Desarrolladores independientes"
---

# Guía reutilizable para publicar software seguro en Windows

Esta guía resume el proceso completo para convertir un proyecto de software en una aplicación que
otra persona pueda instalar con confianza en Windows. Está pensada para reutilizarse en proyectos
futuros, independientemente de que estén hechos con Electron, .NET, Python, Rust, C++ u otra
tecnología.

No existe un ajuste que permita prometer que Windows nunca mostrará una advertencia. Hay tres
niveles distintos:

1. Un ejecutable sin firma no acredita quién lo publicó y es el que más advertencias genera.
2. Un ejecutable con firma de código acredita al editor y detecta modificaciones, pero un editor
   nuevo todavía puede necesitar adquirir reputación de SmartScreen.
3. Microsoft Store certifica y firma el paquete, y normalmente proporciona la experiencia más
   sencilla y confiable para usuarios no técnicos.

## 1. Definir el producto antes de empaquetarlo

Completar esta ficha y conservarla junto al proyecto:

| Campo | Valor del proyecto |
|---|---|
| Nombre público | `[NOMBRE]` |
| Descripción breve | `[DESCRIPCIÓN]` |
| Responsable/editor | `[PERSONA O EMPRESA]` |
| Repositorio | `[URL]` |
| Web | `[URL]` |
| Soporte | `[EMAIL O FORMULARIO]` |
| Política de privacidad | `[URL HTTPS]` |
| Licencia propia | `[LICENCIA]` |
| Sistemas compatibles | `[VERSIONES/ARQUITECTURAS]` |
| Datos que procesa | `[DATOS]` |
| Conexiones de red | `[DESTINOS Y MOTIVO]` |
| Canal principal | `[STORE / WEB / EMPRESA]` |
| Canal alternativo | `[EXE / MSI / NINGUNO]` |

Antes de diseñar iconos, comprar dominios o certificados, comprobar la disponibilidad del nombre
en buscadores, repositorios, dominios, Microsoft Store y registros de marcas relevantes. No usar
un nombre o logotipo que pueda hacer creer que la aplicación es oficial o está respaldada por otra
empresa.

## 2. Revisar si se puede reutilizar el código

Si el programa parte de un repositorio abierto:

- localizar la licencia raíz y las licencias de cada dependencia o recurso;
- comprobar que permite modificar y redistribuir;
- conservar los avisos de copyright exigidos;
- atribuir al proyecto y autores originales;
- distinguir claramente el fork o producto derivado del proyecto original;
- no reutilizar marcas, logotipos o nombres comerciales solo porque el código sea abierto;
- revisar por separado imágenes, música, fuentes, modelos 3D y otros recursos;
- documentar los cambios propios y su responsable.

Una licencia de código no concede automáticamente derechos sobre las marcas. Ante dudas relevantes
o explotación comercial, solicitar asesoramiento jurídico de la jurisdicción correspondiente.

Archivos recomendados:

- `LICENSE`: licencia del proyecto o copia de la licencia original requerida.
- `NOTICE.md`: procedencia, autores y condición de fork o derivado.
- `THIRD_PARTY_NOTICES.md`: dependencias y recursos distribuidos.
- `CHANGELOG.md`: cambios por versión.
- `SECURITY.md`: canal privado para vulnerabilidades.
- `PRIVACY.md`: tratamiento de datos explicado de forma comprensible.

## 3. Diseñar una frontera de seguridad

Antes de empaquetar, escribir qué puede y qué no puede hacer la aplicación.

### Principios mínimos

- Solicitar únicamente los permisos necesarios.
- Evitar privilegios de administrador si no son imprescindibles.
- Guardar datos modificables en la carpeta del usuario, no junto al ejecutable.
- No incluir claves, tokens, contraseñas, historiales privados ni rutas personales en el paquete.
- Separar configuración de desarrollo, datos locales y archivos publicables.
- Validar toda entrada que provenga de archivos, red, enlaces o procesos externos.
- Usar HTTPS y validar certificados cuando exista comunicación remota.
- No desactivar antivirus, firewall, SmartScreen ni controles del sistema.
- Bloquear navegación o ejecución arbitraria si la aplicación muestra contenido web.
- Mantener aislamiento, sandboxing y mínimos privilegios cuando la plataforma los ofrezca.
- Definir cómo borrar los datos y qué ocurre al desinstalar.

### Si existe un servidor local

- Escuchar en `127.0.0.1`, no en todas las interfaces.
- Elegir un puerto libre o manejar conflictos correctamente.
- Validar `Host`, `Origin` y métodos permitidos.
- No asumir que `localhost` es automáticamente seguro.
- Cerrar el servidor al salir de la aplicación.
- No exponer secretos en respuestas, registros o mensajes de error.

### Si se procesan archivos o sesiones locales

- Trabajar en modo solo lectura siempre que sea posible.
- Mostrar al usuario qué carpetas se consultan.
- No subir contenido sin consentimiento explícito.
- Documentar exactamente qué fragmentos se leen y para qué.

## 4. Preparar el repositorio para publicación

Crear una lista positiva de archivos que entran en el paquete. Es más segura que intentar excluir
uno por uno todos los archivos privados.

Excluir al menos:

- `.env` y variantes;
- certificados y claves privadas;
- archivos de sesiones, conversaciones o telemetría local;
- bases de datos y preferencias personales;
- informes internos y notas privadas;
- pruebas, capturas y volcados que no sean necesarios en ejecución;
- archivos temporales, cachés y resultados de compilación anteriores.

Antes de cada publicación:

1. Revisar los archivos versionados y no versionados.
2. Buscar patrones de credenciales en los cambios.
3. Inspeccionar el contenido real del instalador o archivo empaquetado.
4. Confirmar que licencias y avisos sí están incluidos.
5. Construir desde un commit revisado y reproducible.

## 5. Elegir el formato de distribución

### EXE con instalador asistido

Adecuado para GitHub y descarga directa. Permite elegir carpeta y crear accesos directos. Debe ser
firmado para una publicación pública seria.

### MSI

Útil para administración empresarial y despliegues gestionados. No es automáticamente más seguro
para consumidores y también debe firmarse.

### MSIX o AppX para Microsoft Store

Adecuado como canal público principal. Usa una identidad asignada por Partner Center, declara
capacidades y versiones compatibles, y pasa por certificación de Microsoft.

### Paquete portable

Es cómodo para pruebas técnicas, pero puede generar más desconfianza y dificulta actualización,
desinstalación y accesos directos. No debería ser la única opción para público general.

## 6. Crear un instalador correcto

El instalador debería:

- mostrar nombre, icono, versión y editor coherentes;
- instalar por usuario cuando no se requiera administración;
- crear accesos directos claros;
- incluir una desinstalación limpia;
- no instalar software adicional ni cambiar ajustes ajenos;
- no descargar componentes inesperados durante la instalación;
- conservar o migrar datos sin sobrescribirlos;
- permitir actualizar desde una versión anterior;
- tener un nombre de archivo estable, por ejemplo `Producto-Setup-1.2.0.exe`;
- incluir metadatos de versión en el ejecutable;
- empaquetar las licencias y avisos correspondientes.

Mantener separados estos comandos conceptuales:

```text
build-development       # uso local
build-installer         # prueba sin publicación
build-installer-signed  # publicación directa; falla si no firma
build-store             # usa identidad de Partner Center
verify-release          # comprueba firmas, hash y contenido
```

La compilación pública debe fallar si faltan la firma o el sello de tiempo. Nunca debe continuar
silenciosamente produciendo un archivo que parezca publicable.

## 7. Firma de código y SmartScreen

La firma Authenticode sirve para:

- identificar al editor;
- demostrar que el archivo no cambió después de firmarse;
- mostrar una firma verificable desde las propiedades de Windows;
- mantener la validez de la firma mediante un sello de tiempo.

La firma no sustituye las pruebas, no demuestra que el programa carezca de errores y no garantiza
reputación inmediata de SmartScreen.

### Opciones habituales

- Certificado de firma de código emitido por una autoridad certificadora.
- Servicio de firma basado en la nube o HSM.
- Azure Artifact Signing cuando esté disponible para el tipo de cuenta y país del editor.
- Firma y certificación proporcionadas por Microsoft Store para el paquete de la Store.

Los precios, requisitos de identidad y disponibilidad regional cambian. Consultar siempre la
documentación actual antes de contratar.

### Gestión de secretos

- No guardar certificados, contraseñas o secretos en Git.
- Usar el almacén de certificados del sistema, un HSM o secretos protegidos del proveedor de CI.
- Conceder acceso de firma solo al flujo de publicación protegido.
- Separar compilación, firma y subida.
- Registrar quién autorizó cada versión.
- Rotar y revocar credenciales cuando sea necesario.

### Verificación mínima de la firma

Comprobar por separado:

- firma del ejecutable principal;
- firma del instalador;
- estado válido de la cadena de confianza;
- nombre del editor esperado;
- algoritmo SHA-256;
- sello de tiempo válido;
- hash SHA-256 final del archivo distribuido.

## 8. Preparar Microsoft Store

### Datos que dependen del propietario

1. Elegir publicación como persona o empresa.
2. Crear y verificar la cuenta de desarrollador en Partner Center.
3. Reservar el nombre del producto.
4. Copiar exactamente la identidad asignada por Microsoft.
5. Completar categoría, mercados, precio y clasificación por edades.
6. Preparar descripción, características, iconos y capturas.
7. Facilitar web, soporte y política de privacidad HTTPS.

Para un paquete MSIX/AppX suelen ser importantes estos valores:

```text
STORE_IDENTITY_NAME=[ASIGNADO POR PARTNER CENTER]
STORE_PUBLISHER=[ASIGNADO POR PARTNER CENTER]
STORE_PUBLISHER_DISPLAY_NAME=[ASIGNADO POR PARTNER CENTER]
```

No son contraseñas, pero deben coincidir exactamente con Partner Center. No inventarlos.

### Controles antes de subir

- Arquitectura correcta: x64, arm64 o las que se hayan probado.
- Versión del manifiesto superior a la ya publicada.
- Nombre e identidad exactos.
- Capacidades reducidas a las necesarias.
- Iconos en todos los tamaños exigidos.
- Sistemas mínimos y máximos probados declarados correctamente.
- Windows App Certification Kit superado sobre el archivo final.
- Instalación, actualización y desinstalación probadas en una cuenta limpia.
- El archivo subido debe ser exactamente el que se probó.

La Store vuelve a validar el paquete durante su proceso de certificación. Un resultado local
correcto reduce fallos, pero no garantiza la aprobación.

## 9. Crear una web de descarga responsable

La página debe explicar de forma directa:

- qué hace el programa;
- quién lo publica;
- si es un fork o producto independiente;
- qué requisitos necesita;
- qué datos lee, guarda o transmite;
- cómo obtener ayuda;
- dónde consultar código, licencia, privacidad y seguridad;
- cuál es la versión actual;
- cuál es el canal recomendado.

Orden recomendado de botones:

1. `Obtener desde Microsoft Store`.
2. `Ver código fuente`.
3. `Descarga directa firmada`, solo si existe una firma válida.

Nunca llamar “segura”, “sin virus” o “sin advertencias” a una descarga únicamente porque se haya
compilado localmente. Es preferible publicar hechos verificables: firma válida, certificación de
Store, auditoría sin vulnerabilidades conocidas, análisis antivirus y hash.

### Ficha extensible para la web

```yaml
product: "[NOMBRE]"
version: "[VERSIÓN]"
publisher: "[EDITOR]"
platform: "Windows [VERSIONES]"
store_url: "[URL O PENDIENTE]"
signed_download_url: "[URL O NO DISPONIBLE]"
source_url: "[URL]"
privacy_url: "[URL HTTPS]"
support_url: "[URL]"
sha256: "[HASH SOLO DEL ARTEFACTO PUBLICADO]"
signature_status: "[VÁLIDA/PENDIENTE]"
certification_status: "[APROBADA/PENDIENTE]"
```

## 10. Automatizar controles

Configurar integración continua para cada cambio y solicitud de incorporación:

1. Instalación reproducible desde el archivo de bloqueo.
2. Pruebas unitarias y de integración.
3. Análisis estático y formato.
4. Compilación de producción.
5. Auditoría de dependencias.
6. Análisis de secretos.
7. Creación del paquete en un entorno controlado.
8. Generación de inventario de componentes o SBOM cuando el riesgo lo justifique.

Para una publicación:

1. Crear etiqueta desde un commit revisado.
2. Construir en un entorno limpio.
3. Firmar mediante credenciales protegidas.
4. Verificar las firmas después de firmar.
5. Analizar los archivos.
6. Calcular SHA-256 después de toda modificación.
7. Probar el artefacto exacto.
8. Publicarlo sin reconstruirlo ni sustituirlo.

## 11. Matriz de pruebas de publicación

| Prueba | Local | Equipo limpio | Resultado |
|---|---:|---:|---|
| Primera instalación | Sí | Sí | `[ ]` |
| Inicio desde acceso directo | Sí | Sí | `[ ]` |
| Funcionamiento sin Internet | Sí | Sí | `[ ]` |
| Persistencia de datos | Sí | Sí | `[ ]` |
| Actualización desde versión anterior | Sí | Sí | `[ ]` |
| Migración no destructiva | Sí | Sí | `[ ]` |
| Usuario sin permisos administrativos | Sí | Sí | `[ ]` |
| Antivirus/Defender | Sí | Sí | `[ ]` |
| Firma y sello de tiempo | Sí | Sí | `[ ]` |
| Desinstalación | Sí | Sí | `[ ]` |
| Reinstalación | Sí | Sí | `[ ]` |
| Eliminación o conservación documentada de datos | Sí | Sí | `[ ]` |
| Windows App Certification Kit | N/A/Store | Sí | `[ ]` |

Probar todas las versiones y arquitecturas que se anuncien. Si solo se ha probado Windows x64, no
prometer compatibilidad con arm64 ni con versiones antiguas.

## 12. Diligencia previa a cada versión

### Procedencia y legalidad

- [ ] Licencia propia definida.
- [ ] Licencias originales conservadas.
- [ ] Recursos visuales, fuentes y sonido revisados.
- [ ] Avisos de terceros actualizados.
- [ ] Nombre y marca comprobados.
- [ ] Fork o relación con terceros descritos sin inducir a error.

### Privacidad y seguridad

- [ ] Política de privacidad coincide con el comportamiento real.
- [ ] No se incluyen secretos ni datos personales.
- [ ] Permisos mínimos.
- [ ] Dependencias y runtime mantenidos.
- [ ] Auditoría sin vulnerabilidades críticas o altas sin tratar.
- [ ] Canal privado de seguridad disponible.
- [ ] Datos, red y eliminación documentados.

### Paquete

- [ ] Versión y metadatos correctos.
- [ ] Contenido inspeccionado.
- [ ] Instalación y actualización limpias.
- [ ] Desinstalación correcta.
- [ ] Ejecutable e instalador firmados para descarga directa.
- [ ] Sello de tiempo válido.
- [ ] SHA-256 publicado.
- [ ] Paquete final analizado y probado.

### Store y web

- [ ] Identidad real de Partner Center.
- [ ] Kit de certificación superado.
- [ ] Capturas pertenecen a la versión real.
- [ ] Requisitos y limitaciones visibles.
- [ ] URL de privacidad estable.
- [ ] Soporte operativo.
- [ ] Botón principal apunta al canal certificado.
- [ ] No hay enlaces a artefactos de ensayo.

## 13. Registro de una versión

Copiar esta sección para cada publicación:

```markdown
## Versión [X.Y.Z] — [FECHA]

- Commit: `[SHA]`
- Canal: `[STORE / DIRECTO / EMPRESA]`
- Entorno de compilación: `[SO, NODE/DOTNET/PYTHON/RUST, EMPAQUETADOR]`
- Pruebas: `[RESULTADO]`
- Auditoría: `[RESULTADO]`
- Equipo limpio: `[RESULTADO]`
- Firma: `[EDITOR, ESTADO, SELLO DE TIEMPO]`
- Certificación Store: `[ID/ESTADO]`
- Archivo publicado: `[NOMBRE]`
- SHA-256: `[HASH]`
- Privacidad revisada: `[SÍ/NO]`
- Licencias revisadas: `[SÍ/NO]`
- Incidencias conocidas: `[LISTA]`
- Aprobó la publicación: `[RESPONSABLE]`
```

## 14. Errores que conviene evitar

- Publicar primero y pensar después en la firma.
- Firmar el instalador pero no el ejecutable interno.
- Calcular el hash antes de firmar.
- Poner certificados o secretos en el repositorio.
- Confundir código abierto con permiso para usar cualquier marca o recurso.
- Afirmar que no se recopilan datos sin revisar conexiones, logs y servicios de terceros.
- Construir un archivo distinto del que se probó.
- Publicar paquetes de prueba con identidades ficticias.
- Pedir al usuario que desactive sus protecciones.
- Prometer ausencia absoluta de malware o advertencias.
- Dejar runtimes web, navegadores integrados o dependencias sin actualizar.
- Confiar solo en que el programa funciona en el equipo del desarrollador.

## 15. Ruta mínima recomendada para un desarrollador independiente

1. Crear el programa con una frontera de privacidad clara.
2. Elegir nombre propio, licencia y atribuciones.
3. Automatizar pruebas, compilación y auditoría.
4. Generar un instalador local para pruebas.
5. Probarlo en una cuenta o máquina limpia.
6. Crear Partner Center y reservar el producto.
7. Publicar web, soporte y privacidad.
8. Construir el paquete con la identidad real de Microsoft.
9. Pasar el kit oficial y enviar a certificación.
10. Enlazar la web a Microsoft Store.
11. Incorporar descarga directa solo cuando pueda firmarse y verificarse correctamente.

## Referencias oficiales que deben revisarse al reutilizar esta guía

- Licencia MIT: https://opensource.org/license/MIT
- Opciones de firma para Windows:
  https://learn.microsoft.com/windows/apps/package-and-deploy/code-signing-options
- SmartScreen y reputación:
  https://learn.microsoft.com/windows/apps/package-and-deploy/smartscreen-reputation
- Distribución de aplicaciones Win32 mediante Microsoft Store:
  https://learn.microsoft.com/windows/apps/distribute-through-store/how-to-distribute-your-win32-app-through-microsoft-store
- Reserva del nombre:
  https://learn.microsoft.com/windows/apps/publish/publish-your-app/add-on/reserve-your-apps-name
- Envío a Microsoft Store:
  https://learn.microsoft.com/windows/apps/publish/faq/submit-your-app
- Requisitos del paquete MSIX:
  https://learn.microsoft.com/windows/apps/publish/publish-your-app/msix/app-package-requirements
- Windows App Certification Kit:
  https://learn.microsoft.com/windows/uwp/debug-test-perf/windows-app-certification-kit

Las condiciones técnicas, comerciales y regionales pueden cambiar. Actualizar la fecha de esta
guía y revisar estas fuentes antes de cada nuevo proyecto o publicación importante.
