"use strict";

import {TableDefinition, TableContext} from "./types-tareas-contexto";

export function contextos(_context:TableContext):TableDefinition{
    return {
        name:'contextos',
        elementName:'contexto',
        editable:true,
        fields:[
            {name:'contexto'         , typeName:'text'    , nullable:false  },
            {name:'nombre'           , typeName:'text'    , isName:true     },
            {name:'activo'           , typeName:'boolean' , nullable:false ,defaultValue:true},
            {name:'objetivo'         , typeName:'text'                      },
            {name:'sin_empezar'      , typeName:'bigint'  , editable:false  },
            {name:'empezadas'        , typeName:'bigint'  , editable:false  },
            {name:'terminadas'       , typeName:'bigint'  , editable:false  },
        ],
        primaryKey:['contexto'],
        detailTables:[
            {table:'tareas', fields:['contexto'], abr:'T', refreshParent:true}
        ],
        sql:{
            isTable:true,
            from:`(
                select * 
                    from contextos c,
                        lateral (
                            select count(*) as cantidad_tareas,
                                    count(*) filter (where estado='sin_empezar') as sin_empezar,
                                    count(*) filter (where estado='empezada') as empezadas,
                                    count(*) filter (where estado='terminada') as terminadas
                                from (select t.*, 
                                    case 
                                        when t.terminada then 'terminada'
                                        when t.empezada then 'empezada'
                                        else 'sin_empezar'
                                    end as estado
                                        from tareas t where c.contexto=t.contexto
                                ) te -- tareas caracterizadas por su estado
                        ) x
            )`
        }
    };
}
