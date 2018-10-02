var Injector = require('./Injector');
const limite_velocidad_por = 199;
const limit_plasma = 100;
/**
 * Clase Motor
 */
class Motor{
    /***
     * Constructura de la clase motor
     * @param {Array|Injector} danio_inyectores: Lista de Injector para motor
     * @param {Number} velocidad_por: Porcentaje de velocidad
     */
    constructor(danio_inyectores, velocidad_por) {
        this._plasma_requerido=null;
        this._injectores = [];
        this._potencia_disponible=null;

        if (this.instanceof_injector(danio_inyectores) && Array.isArray(danio_inyectores)){
                this._injectores = danio_inyectores;
        } else {
            throw "Error al asignar inyectores: " + danio_inyectores;
        }

        if (velocidad_por <= limite_velocidad_por){
            this._plasma_requerido = velocidad_por * danio_inyectores.length * limit_plasma/100;
        } else {
            throw "Velocidad erronea: " + velocidad_por.toString() + "%";
        }
    }

    /***
     * Funcion para retornar todos los inyectores disponibles
     * @returns {Array|Injector}
     */
    get get_inyectores(){
        return this._injectores;
    }

    /***
     * Función para visualizar si existe energia disponible en el motor
     * @returns {boolean}
     */
    energia_disponible(){
        let res = 0;
        for (let i = 0; i < this._injectores.length; i++) {
            if (this._injectores[i].get_danio_por<100){
                res += this._injectores[i].calcular_limite_poder();
            }
        }
        return this._plasma_requerido <= res;
    }

    /***
     * Funcion que retornar cantidad de energia disponible
     * @returns {number}
     */
    calcular_energia_disponible(){
        let res = 0;
        for (let i = 0; i < this._injectores.length; i++) {
            res += this._injectores[i].calcular_poder();
        }
        return res;
    }

    /***
     * Funcion que retorna daño total del motor
     * @returns {number}
     */
    calcular_danio_total(){
        let res = 0;
        for (let i = 0; i < this._injectores.length; i++) {
            let por_danio = this._injectores[i].get_danio_por;
            if (por_danio < 100){
                res += por_danio;
            }
        }
        return res;
    }

    /***
     * Total de inyectores disponibles
     * @returns {number}
     */
    inyectores_disponibles(){
        let res = this._injectores.length;
        for (let i = 0; i < this._injectores.length; i++) {
            if(this._injectores[i].get_danio_por === 100){
                res--;
            }
        }
        return res;
    }

    /***
     * Funcion para ajuste de potencia en los inyectores
     */
    ajuste_potencia(){
        if (this.energia_disponible()){
            let danio_total = this.calcular_danio_total();
            let inyect_total = this.inyectores_disponibles();
            let plasma_inyector = (danio_total+this._plasma_requerido - inyect_total * limit_plasma)/this.inyectores_disponibles();
            for (let i = 0; i < this._injectores.length; i++) {
                if (this._injectores[i]._danio_por!==100){
                    if (plasma_inyector<0){
                        this._injectores[i].set_plasma = this._injectores[i].calcular_poder()+plasma_inyector;
                    } else {
                        this._injectores[i].set_plasma = this._injectores[i].calcular_poder();
                        this._injectores[i].set_extra_plasma = plasma_inyector;

                    }
                }
            }
            this._potencia_disponible = true;
        } else {
            this._potencia_disponible = false;

        }
    }

    /***
     * Mostrar un resumen de estado de la nave/motor
     */
    resumen_estado_nave(){
        this.ajuste_potencia();
        if (typeof this._potencia_disponible !== "undefined"){
            if (this._potencia_disponible){
                let estado_plasma = "";
                for (let i = 0; i < this._injectores.length; i++) {
                    estado_plasma += "Plasma "+i.toString()+": ";
                    let total = this._injectores[i].get_plasma+this._injectores[i].get_extra_plasma;
                    estado_plasma += total+"mg/s ";
                }
                console.log(estado_plasma);

                for (let i = 0; i < this._injectores.length; i++) {
                    if (this._injectores[i].get_danio_por<100){
                        if (this._injectores[i].get_extra_plasma>0){
                            console.log("Tiempo de vida: "+this._injectores[i].tiempo_vuelo().toString()+" minutos.");
                        } else {
                            console.log("Tiempo de vida infinito!");
                            break;
                        }
                    }
                }
            } else {
                console.log("Unable to comply.")
                console.log("Tiempo de vida 0 minutos.")
            }
        } else {
            throw "_potencia_disponible: NO DEFINIDA";
        }
    }

    /***
     * Funcion para validar los inyectores que hayan sido instacioados correctamente
     * @param {Array|Injector} injectors
     * @returns {boolean}
     */
    instanceof_injector(injectors){
        let res = true;
        let iny = injectors;
        for (let i=0; i<iny.length; i++){
            if(!(iny[i] instanceof Injector)){
                res = false;
                break;
            }
        }
        return res;
    }

}
module.exports = Motor;