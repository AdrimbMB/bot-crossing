# AgentCity privacy notice

Effective date: 12 September 2026

## English

AgentCity is a local desktop application. It visualizes coding-agent activity already stored on
the user's computer. AgentCity has no account system, advertising, analytics, telemetry, cloud
sync, or developer-operated server.

### Data processed locally

To provide its core functionality, AgentCity may read local metadata from supported coding-agent
tools, including conversation identifiers and titles, timestamps, status information, repository
names and paths, and limited transcript content needed to determine display state. It also reads
which compatible tools are installed. AgentCity does not modify the tools' session or transcript
files.

The application writes only its own preferences and colony layout to the current user's AgentCity
application-data directory. This data remains on that computer unless the user deliberately moves
or shares it.

### Network activity and sharing

The application UI communicates with its own server over the loopback address (`127.0.0.1`). The
server rejects non-local origins and is not exposed to the local network or Internet. AgentCity
does not send local agent data, repository paths, transcripts, or preferences to the publisher or
any third party.

External websites are opened only when the user selects a link. Supported coding-agent tools may
have their own privacy practices when AgentCity asks the operating system to open them; those
tools are separate products and are not controlled by AgentCity.

### Control and deletion

Users can remove AgentCity's stored preferences and layout by deleting its application-data
folder. Uninstalling the application removes program files and shortcuts; user data may be kept so
that a later reinstall can restore the layout. AgentCity does not hold a remote copy and therefore
cannot retrieve or delete data on the user's behalf.

### Contact

Questions and security reports can be submitted through the AgentCity repository:
https://github.com/AdrimbMB/bot-crossing. Sensitive vulnerabilities should use GitHub's private
security advisory channel rather than a public issue.

## Español

AgentCity es una aplicación local de escritorio. Visualiza la actividad de agentes de programación
que ya está almacenada en el ordenador del usuario. No utiliza cuentas, publicidad, analítica,
telemetría, sincronización en la nube ni servidores operados por el desarrollador.

Para funcionar puede leer metadatos locales de herramientas compatibles: identificadores y títulos
de conversaciones, fechas, estados, nombres y rutas de repositorios, y el contenido mínimo de las
transcripciones necesario para determinar su estado visual. No modifica las sesiones ni las
transcripciones de esas herramientas.

Solo guarda sus propias preferencias y la distribución de la colonia en la carpeta de datos de
AgentCity del usuario. La interfaz se comunica con un servidor interno limitado a `127.0.0.1`.
AgentCity no envía al desarrollador ni a terceros las transcripciones, rutas, sesiones o
preferencias locales.

Los enlaces externos se abren únicamente por acción del usuario. Codex, Claude Code, Cursor y
otras herramientas compatibles son productos independientes con sus propias condiciones y
prácticas de privacidad.

El usuario puede eliminar la configuración y el plano de la colonia borrando la carpeta de datos
de AgentCity. La desinstalación elimina el programa y sus accesos directos, pero puede conservar
estos datos para permitir una reinstalación no destructiva. No existe una copia remota que el
desarrollador pueda consultar o eliminar.

Consultas y avisos: https://github.com/AdrimbMB/bot-crossing. Las vulnerabilidades sensibles deben
comunicarse mediante un aviso privado de seguridad de GitHub, no mediante una incidencia pública.
