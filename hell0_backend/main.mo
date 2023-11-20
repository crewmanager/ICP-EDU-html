import Float "mo:base/Float";
import Time "mo:base/Time";
import Debug "mo:base/Debug";

actor DBank {
    stable var currentValue: Float = 300;
    stable var startTime = Time.now();

    public func topUp(amount: Float) {
    currentValue := currentValue + amount;  // Use ':=' for assignment
    Debug.print(debug_show(currentValue));
};

    public func withdraw(amount: Float) {
        let tempValue: Float = currentValue - amount;
        if (tempValue >= 0) {
            currentValue:= tempValue;  // Update currentValue with tempValue if the withdrawal is valid
            Debug.print(debug_show(currentValue));
        } else {
            Debug.print("Amount too large, currentValue less than 0");
        }
    }
;
    public query func checkBalance(): async Float {
        return currentValue;
    };

    public func compound() {
        let currentTime = Time.now();
        let timeElapsedNS = currentTime - startTime;
        let timeElapsedS = Float.fromInt(timeElapsedNS) / 1000000000;
        currentValue:= currentValue * (1.01 ** timeElapsedS);  // Use '=' instead of ':=' for assignment
        startTime:= currentTime;  // Use '=' instead of ':=' for assignment
        Debug.print(debug_show(currentValue));
    }
}
