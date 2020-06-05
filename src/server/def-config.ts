export const staticConfigYaml=`
server:
  port: 3021
  session-store: memory-saved
db:
  motor: postgresql
  host: localhost
  database: tareas_contexto_db
  schema: tareas_contexto
  user: tareas_contexto_admin
login:
  table: usuarios
  userFieldName: usuario
  passFieldName: md5clave
  rolFieldName: rol
  infoFieldList: [usuario, rol]
  activeClausule: activo
  plus:
    allowHttpLogin: true
    fileStore: true
    loginForm:
      formTitle: entrada
      formImg: unlogged/tables-lock.png
client-setup:
  menu: true
  lang: es
  user-scalable: no
install:
  dump:
    db:
      owner: tareas_contexto_owner
    scripts:
      post-adapt: []
logo: 
  path: client/img
`;