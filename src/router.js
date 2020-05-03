import Vue from 'vue';
import Router from 'vue-router';

import HomeAdmin from './views/HomeAdmin.vue'
import Clases from './views/Clases.vue'
import Periodo from './views/Periodo.vue'
import UserLogin from './views/UserLogin.vue'
import HomeUser from './views/HomeUser.vue'
import UserConfirm  from './views/UserConfirm.vue'
import ResetPassword from './views/ResetPassword.vue'
import NewPassword from './views/NewPassword.vue'
import AdminLogin from './views/AdminLogin.vue'
import MyInfo from './views/MyInfo.vue'
import CourseDetail from './views/CourseDetail.vue'
import Users from './views/Users.vue'
import InscribirClase from './views/InscribirClase.vue'
import UserClasses from './views/UserClasses.vue'
import UserDetails from './views/UserDetails.vue'
import MyMedicalRecord from './views/MyMedicalRecord.vue'
import AdminMedicalRecord from './views/AdminMedicalRecord.vue'
import SelectLocker from './views/SelectLocker.vue'
import AdminLockers from './views/AdminLockers.vue'
import LockerOffer from './views/EditLockerOffer.vue'
import notfound from './views/404.vue'
import Profesor from './views/ProfessorClasses.vue'
import ProfesorClase from './views/ProfessorClassDetail.vue'
import ProfesorAlumno from './views/ProfessorAlumno.vue'
import HomeNutricion from './views/HomeNutricion.vue'
import NutriRecordatorio from './views/NutriRecordatorio.vue'

import axios from "axios";
const helper = require("./helper.js");

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/admin/home',
            name: 'HomeAdmin',
            component: HomeAdmin,
            meta:{isAdmin: true}
        },
        {
            path: '/admin',
            name: 'Login Admin',
            component: AdminLogin,
        },
        {
            path: '/clases',
            name: 'Clases',
            component: Clases,
            meta:{isAdmin: true}
        },
        {
            path: '/periodo',
            name: 'Periodo',
            component: Periodo,
            meta:{isAdmin: true}
        },
        {
            path: '/',
            name: 'UserLogin',
            component: UserLogin,
        },
        {
            path: '/login',
            name: 'UserLogin',
            component: UserLogin,
        },
        {
            path: '/home',
            name: 'HomeUser',
            component: HomeUser,
            meta:{isUser: true}
        },
        {
            path: '/confirm',
            name: 'UserConfirm',
            component: UserConfirm
        },
        {
            path: '/resetpassword',
            name: 'ResetPassword',
            component: ResetPassword
        },
        {
            path: '/newpassword',
            name: 'NewPassword',
            component: NewPassword
        },
        {
            path: '/myinfo',
            name: 'MyInfo',
            component: MyInfo,
            meta:{isUser: true}
        },
        {
            path: '/courseDetail/:id',
            name: 'CourseDetail',
            component: CourseDetail,
            meta:{isAdmin: true}
        },
        {
            path: '/users/',
            name: 'Usuarios',
            component: Users,
            meta:{isAdmin: true}
        },
        {
            path: '/profesor',
            name: 'Profesor',
            component: Profesor,
            meta:{isUser: true}
        },
        {
            path: '/profesor/clase/:id',
            name: 'Clase',
            component: ProfesorClase,
            meta:{isUser: true}
        },
        {
            path: '/profesor/alumno/:id',
            name: 'Metricas',
            component: ProfesorAlumno,
            meta:{isUser: true} 
        },
        {
            path: '*',
            name: '404',
            component: notfound,
            meta:{notfound: true}
        },
        {
            path: '/inscribirclase',
            name: 'InscribirClase',
            component: InscribirClase,
            meta:{isUser: true}
        },
        {
            path: '/uclases',
            name: 'UserClasses',
            component: UserClasses,
            meta:{isUser: true}
        },
        {
            path: '/userdetails/:id',
            name: 'UserDetails',
            component: UserDetails,
            meta:{isAdmin: true}
        },
        {
            path: '/mymedicalrecord',
            name: 'MyMedicalRecord',
            component: MyMedicalRecord,
            meta:{isUser: true}
        },
        {
            path: '/selectlocker',
            name: 'SelectLocker',
            component: SelectLocker,
            meta:{isUser: true}
        },
        {
            path: '/admin/medicalrecord/:id',
            name: 'MedicalRecord',
            component: AdminMedicalRecord,
            meta:{isAdmin: true}
        },
        {
            path: '/lockers',
            name: 'Lockers',
            component: AdminLockers,
            meta:{isAdmin: true}
        },
        {
            path: '/lockeroffer',
            name: 'LockerOffer',
            component: LockerOffer,
            meta:{isAdmin: true}
        },
        //Nutricion
        {
            path: '/nutricion/home',
            name: 'HomeNutricion',
            component: HomeNutricion,
            meta:{isAdmin: true}
        },
        {
            path: '/nutricion/recordatorio',
            name: 'NutriRecordatorio',
            component: NutriRecordatorio,
            meta:{isAdmin: true}
        }
        
    ]
  })
  
router.beforeEach((to, from, next) => {
    let autorizacionUsr = to.matched.some(record => record.meta.isUser)
    let autorizacionAdmin = to.matched.some(record => record.meta.isAdmin)

    let notfound = to.matched.some(record => record.meta.notfound)

    if(notfound){
        next()
        return
    }

    if(!autorizacionAdmin&&!autorizacionUsr){
        next()
    }

    if(autorizacionAdmin && !localStorage.getItem("token")){
        next({ path: '/admin'})
    }

    if(autorizacionUsr && !localStorage.getItem("token")){
        next(next({ path: '/login'}))
    }

    if(localStorage.getItem("token")){
        var token = window.localStorage.getItem("token")
        const URL = helper.baseURL + "/validate?token=" + token;
        axios  
        .get(URL)
        .then(response=>{   
            if(!response.data){
                window.localStorage.clear("token")
                if(autorizacionAdmin){
                    next({ path: '/admin'})
                }else{
                    next({ path: '/login'})
                }
            }else{
               
               if(response.data.admin){
                   if(!autorizacionAdmin){
                       next({ path: '/admin/home'})
                   }else{
                       next()
                   }
               }else{
                   if(!autorizacionUsr){
                       next({ path: '/home'})
                   }else{
                        next()
                   }
               }
            }
        }).catch((error)=>{
            window.localStorage.clear("token")
            if(autorizacionAdmin){
                next({ path: '/admin'})
            }else{
                next({ path: '/login'})
            }
        })
    }
    
})
  
export default router;