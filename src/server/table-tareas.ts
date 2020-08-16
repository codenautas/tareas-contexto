"use strict";

import {TableDefinition, TableContext} from "./types-tareas-contexto";

export function tareas(_context:TableContext):TableDefinition{
    return {
        name:'tareas',
        elementName:'tarea',
        editable:true,
        fields:[
            {name:'contexto'         , typeName:'text'                      },
            {name:'tarea'            , typeName:'bigint'  , sequence:{name:'tarea_seq', firstValue:1}  },
            {name:'nombre'           , typeName:'text'    , isName:true     },
            {name:'pendiente'        , typeName:'boolean' , nullable:false ,defaultValue:true},
            {name:'detalle'          , typeName:'text'                      },
            {name:'usuario_destino'  , typeName:'text'                      },
            {name:'usuario_origen'   , typeName:'text'                      },
        ],
        primaryKey:['tarea'],
        foreignKeys:[
            { references:'contextos', fields:['contexto']},
        ],
        softForeignKeys:[
            { references:'usuarios', fields:[{source:'usuario_destino', target:'usuario'}] , alias:'destino'},
            { references:'usuarios', fields:[{source:'usuario_origen' , target:'usuario'}] , alias:'origen' }
        ]
    };
}