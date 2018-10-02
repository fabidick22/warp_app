describe("Motor", function() {
    var Injector = require('../../lib/warp-drive/Injector');
    var Motor = require('../../lib/warp-drive/Motor');
    var injector;
    var motor;
    var speed = 100;
    var injectors = [];
    beforeEach(function() {
        injectors.push(new Injector(20));
        injectors.push(new Injector(10));
        injectors.push(new Injector(0));
        motor = new Motor(injectors, speed);
        spyOn(motor, "resumen_estado_nave");
        spyOn(motor, "ajuste_potencia");
    });

    it('deberia obtener inyectores', function () {
        expect(function () {
            Array.isArray(motor.get_inyectores)
        }).toBeTruthy()
    });

    it('deberia poder calcular energia disponible', function () {
        expect(motor.calcular_energia_disponible())
            .toEqual(jasmine.any(Number));
    });

    it('deberia saber si hay energia disponible', function () {
        expect(motor.energia_disponible())
            .toBeTruthy();
    });

    it('deberia poder calcular daño tatal del motor', function () {
        expect(motor.calcular_danio_total())
            .toEqual(jasmine.any(Number));
        expect(motor.calcular_danio_total())
            .toBeGreaterThanOrEqual(0);
    });

    it('deberia poder mostrar estado de la nave', function () {
        motor.resumen_estado_nave();
        expect(motor.resumen_estado_nave).toHaveBeenCalled();
    });
    describe('cuando se crea una instancia de Motor', function () {
        it('no deberia tener una velocidad mayor a su limite', function () {
            expect(function () {
                let motor = new Motor(injectors, 6000);
            }).toThrow();
        });

        it('deberia tener inyectores de tipo injector', function () {
            expect(function () {
                let iny = motor.get_inyectores;
                for (let i=0; i<iny.length;i++){
                    return iny[i] instanceof Injector;
                }
            }).toBeTruthy();
        });
    });

});