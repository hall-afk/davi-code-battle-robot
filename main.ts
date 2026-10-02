let Received_string = ""

function parar() {
    robotbit.MotorRun(robotbit.Motors.M1A, 0)
    robotbit.MotorRun(robotbit.Motors.M2A, 0)
}

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})

bluetooth.onBluetoothDisconnected(function () {
    parar()
    basic.showIcon(IconNames.No)
})

bluetooth.onUartDataReceived(
    serial.delimiters(Delimiters.NewLine),
    function () {
        Received_string = bluetooth.uartReadUntil(
            serial.delimiters(Delimiters.NewLine)
        ).trim()

        if (Received_string == "up") {
            // Frente
            robotbit.MotorRun(robotbit.Motors.M1A, -255)
            robotbit.MotorRun(robotbit.Motors.M2A, -255)

        } else if (Received_string == "down") {
            // Ré
            robotbit.MotorRun(robotbit.Motors.M1A, 255)
            robotbit.MotorRun(robotbit.Motors.M2A, 255)

        } else if (Received_string == "left") {
            // Esquerda: motores em sentidos opostos
            robotbit.MotorRun(robotbit.Motors.M1A, 255)
            robotbit.MotorRun(robotbit.Motors.M2A, -255)

        } else if (Received_string == "right") {
            // Direita: motores em sentidos opostos
            robotbit.MotorRun(robotbit.Motors.M1A, -255)
            robotbit.MotorRun(robotbit.Motors.M2A, 255)

        } else {
            // Segurança: comando desconhecido
            parar()
        }
    }
)

bluetooth.startUartService()
basic.showIcon(IconNames.Asleep)

basic.forever(function () {
})