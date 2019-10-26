import xs from 'xstream'
import mitt from 'mitt'
import axios from 'axios'
import Qiscus from 'qiscus-sdk-core'

const distinct = stream =>{
    let subcription = null
    let lastData = null
    return xs.create({
        start(listener){
            subcription = stream.subscribe({
                next(data){
                    if (data === lastData) return
                    lastData = data
                    listener.next(data)
                },
                error(error){
                    listener.error(error)
                },
                complete(){
                    listener.complete()
                }
            })
        },
        stop(){
            subcription.unsubscribe()
        }
    })
}

export const qiscus = new Qiscus()
//const appId = 'sampleapp-itnriby9zae'
const appId = 'sdksample'
const event = mitt()

export const event$ = xs.create({
    start(emitter){
        event.on('event', data=>{
            emitter.next({
                kind:data.kind,
                data:data.data
            })
        })
    },
    stop(){}
})

export const init = () =>{
    qiscus.init({
        AppId : appId,
        options:{
            loginSuccessCallback(authData) {
                event.emit("event", {kind: "login-success", data: authData})
            },
            loginErrorCallback(data) {
                event.emit("event", {kind: "login-error", data})
            },
        }

    })
    qiscus.debugMode = true
    qiscus.debugMQTTMode = true
}
export const currentUser = () => qiscus.userData
export const login$ = () => event$.filter(it => it.kind === "login-success").map(it => it.data)
export const loginError$ = () => event$.filter(it => it.kind === "login-error").map(it => it.data)
export const isLogin$ = () =>
  xs
    .periodic(300)
    .map(() => qiscus.isLogin)
    .compose(distinct)
    .filter(it => it === true)
