"use strict";

import {TableDefinition, TableContext} from "./types-tareas-contexto";

export function contextos(_context:TableContext):TableDefinition{
    return {
        name:'contextos',
        elementName:'contexto',
        editable:true,
        fields:[
            {name:'contexto'         , typeName:'text'    , nullable:false  },
            {name:'nombre'           , typeName:'text'                      },
            {name:'activo'           , typeName:'boolean' , nullable:false ,defaultValue:true},
            {name:'objetivo'         , typeName:'text'                      },
        ],
        primaryKey:['contexto'],
    };
}
