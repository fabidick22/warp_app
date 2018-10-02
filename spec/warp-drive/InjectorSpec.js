describe("Injector", function() {
    var Injector = require('../../lib/warp-drive/Injector');
    var injector;
    var danio = 20;

    beforeEach(function() {
        injector = new Injector(danio);
    });

    it('deberia poder obtener daño', function () {
        expect(injector.get_danio_por).toEqual(danio);
    });

    it('deberia calcular potencia/poder', function () {
        expect(injector.calcular_poder()).toEqual(jasmine.any(Number));
    });

    describe('cuando se crea de Injector', function () {
        it('no deberia ser declarada con valores no admitidos', function () {
            expect(function () {
                let injector = new Injector(-1000);
            }).toThrow();
        });
    });

    describe('cuando se asigna plasma', function () {
        it('deberia poder asignar y obtener plasma', function () {
            let plas = 60;
            injector.set_plasma=plas;
            expect(injector.get_plasma).toEqual(plas);
        });
        it('deberia lanzar excepcion si supere flujo limite', function () {
            expect(function () {
                injector.set_plasma=200;
            }).toThrow();
        });
        it('deberia lanzar excepcion si es menor que el flujo normal', function () {
            expect(function () {
                injector.set_plasma=-20;
            }).toThrow();
        });
        it('deberia lanzar excepcion si supere flujo limite', function () {
            expect(function () {
                injector.set_extra_plasma=2000;
            }).toThrow();
        });
        it('deberia lanzar excepcion si es menor que el flujo normal', function () {
            expect(function () {
                injector.set_plasma=-200;
            }).toThrow();
        });

    });
});