const limit_plasma = 100;
const limit_extra_plasma = 99;

/**
 * Clase Inyector
 */
class Injector {
    /***
     * Construcuto de la clase, se inicializa con el porcentaje de daño del inyector
     * @param {Number} danio_por
     */
    constructor(danio_por) {
        this._plasma = 0;
        this._extra_plasma = 0;
        this._danio_por=null;

        if (danio_por>=0 && danio_por<=100){
            this._danio_por = danio_por;
        } else {
            throw "Valor de daño erroneo: %" + danio_por.toString();
        }

    }

    /***
     * Funcion para obtener plasma del inyector
     * @returns {number}
     */
    get get_plasma(){
        return this._plasma;
    }

    /***
     * Funcion para establecer la cantidad de plasma para el inyector
     * @param {Number} plasma
     */
    set set_plasma(plasma){
        if (plasma >= 0 && plasma <= limit_plasma){
            this._plasma = plasma;
        } else {
            throw "Valor de plasma erroneo: " + plasma.toString() +"mg";
        }
    }

    /***
     * Funcion para enviar plasma extra a los inyectores el limite tiene que ser 99mg mas la cantidad base.
     * @param {Number} extra_plasma
     */
    set set_extra_plasma(extra_plasma){
        if (extra_plasma >=0 && extra_plasma <= limit_extra_plasma){
            this._extra_plasma = extra_plasma;
        } else {
            throw "Valor de plasma extra erroneo: " + extra_plasma.toString() +"mg";
        }
    }

    /***
     * Funcion para obtener plasma actual del inyector
     * @returns {number}
     */
    get get_extra_plasma(){
        return this._extra_plasma;
    }

    /***
     * Funcion para obtener el daño del inyector
     * @returns {null|Number}
     */
    get get_danio_por(){
        return this._danio_por;
    }

    /***
     * Funcion para calcular la potencia del inyector, tomando en cuenta el limite de plasma por inyector
     * @returns {number}
     */
    calcular_poder(){
        return limit_plasma - this._danio_por;
    }

    /***
     * Retorna el potencia limite del inyector
     * @returns {number}
     */
    calcular_limite_poder() {
        return limit_extra_plasma + this.calcular_poder();
    }

    /***
     * Funcion para calcular el tiempo de vuelo
     * @returns {number}
     */
    tiempo_vuelo(){
        return 100 - this._extra_plasma;
    }
}
module.exports = Injector;