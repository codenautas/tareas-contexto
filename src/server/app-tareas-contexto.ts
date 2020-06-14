"use strict";

// import * as Path from 'path';
import { AppBackend, ExpressPlus, Context, Request, 
    ClientModuleDefinition, OptsClientPage, MenuDefinition, MenuInfoBase
} from "backend-plus";
import * as MiniTools from 'mini-tools';

// import {changing} from 'best-globals';

import {ProceduresTareasContexto} from "./procedures-tareas-contexto";

import { contextos  } from './table-contextos';
import { tareas     } from './table-tareas';
import { usuarios   } from './table-usuarios';

import {staticConfigYaml} from './def-config';

export class AppTareasContexto extends AppBackend{
    constructor(){
        super();
    }
    postConfig(){
        super.postConfig();
    }
    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(staticConfigYaml);
    }
    addSchrödingerServices(mainApp:ExpressPlus, baseUrl:string){
        var be=this;
        if(baseUrl=='/'){
            baseUrl='';
        }   
        mainApp.get(baseUrl+'/pub',async function(req,res,_next){
            // @ts-ignore useragent existe
            var {useragent} = req;
            var htmlMain=be.mainPage({useragent}, false, {skipMenu:true}).toHtmlDoc();
            MiniTools.serveText(htmlMain,'html')(req,res);
        });
        super.addSchrödingerServices(mainApp, baseUrl);
    }
    addUnloggedServices(mainApp:ExpressPlus, baseUrl:string){
        if(baseUrl=='/'){
            baseUrl='';
        }   
        super.addUnloggedServices(mainApp, baseUrl);
    }
    async getProcedures(){
        var be = this;
        return [
            ...await super.getProcedures(),
            ...ProceduresTareasContexto
        ].map(be.procedureDefCompleter, be);
    }
    getMenu(context:Context):MenuDefinition{
        var menuContent:MenuInfoBase[]=[
            {menuType:'table', name:'contextos'  },
        ];
        if(context.user && context.user.rol=="admin"){
            menuContent.push(
                {menuType:'menu', name:'config', label:'configurar', menuContent:[
                    {menuType:'table', name:'usuarios'  },
                ]}
            )
        };
        return {menu:menuContent};
    }
    clientIncludes(req:Request|null, opts:OptsClientPage):ClientModuleDefinition[]{
        var menuedResources:ClientModuleDefinition[]=req && opts && !opts.skipMenu ? [
            { type:'js' , src:'client.js' },
        ]:[
            {type:'js' , src:'unlogged.js' },
        ];
        return [
            /* quitar desde acá si no se usa react */
            { type: 'js', module: 'react', modPath: 'umd', file:'react.development.js', fileProduction:'react.production.min.js' },
            { type: 'js', module: 'react-dom', modPath: 'umd', file:'react-dom.development.js', fileProduction:'react-dom.production.min.js' },
            { type: 'js', module: '@material-ui/core', modPath: 'umd', file:'material-ui.development.js', fileProduction:'material-ui.production.min.js' },
            { type: 'js', module: 'material-styles', file:'material-styles.development.js', fileProduction:'material-styles.production.min.js' },
            { type: 'js', module: 'clsx', file:'clsx.min.js' },
            { type: 'js', module: 'redux', modPath:'../dist', file:'redux.js', fileProduction:'redux.min.js' },
            { type: 'js', module: 'react-redux', modPath:'../dist', file:'react-redux.js', fileProduction:'react-redux.min.js' },
            /* quitar hasta acá si no se usa react */
            ...super.clientIncludes(req, opts),
            /* quitar desde acá si no se usa react */
            { type: 'js', module: 'redux-typed-reducer', modPath:'../dist', file:'redux-typed-reducer.js' },
            { type: 'js', src: 'adapt.js' },
            /* quitar hasta acá si no se usa react */
            { type: 'css', file: 'menu.css' },
             ... menuedResources
        ];
    }
    prepareGetTables(){
        super.prepareGetTables();
        this.getTableDefinition={
            ... this.getTableDefinition,
            contextos ,
            usuarios  ,    
            tareas    ,
        }
    }       
}

