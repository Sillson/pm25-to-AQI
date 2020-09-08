function getAQIValue(pm25) {
    // it's possible to receive pm values greater than 500 during fire events
    // and 0 or less should always return an AQI of 0
    if (pm25 >= 500) {
        return parseFloat(pm25)
    } else if (pm25 <= 0) {
        return 0
    } else {
        // https://www.ecfr.gov/cgi-bin/retrieveECFR?n=40y6.0.1.1.6#sp40.6.58.g
        // From 40 CFR 58 Appendix G.12.ii:
        var pmRangeLow = Array(0.0, 12.1, 35.5, 55.5, 150.5, 250.5, 350.5);
        var pmRangeHigh= Array(12.0, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4);
        var aqiRangeLow = Array(0, 51, 101, 151, 201, 301, 401);
        var aqiRangeHigh = Array(50, 100, 150, 200, 300, 400, 500);

        // set index key as base
        var indexKey = 0;

        // iterate through rangeHigh to find the index
        pmRangeHigh.forEach(function(val, index) {
            if (pm25 >= val) {
                indexKey = index + 1
            }
            return indexKey
        });

        // Define ranges for the equation
        var pmHi = pmRangeHigh[indexKey];
        var pmLow = pmRangeLow[indexKey];
        var aqiHi = aqiRangeHigh[indexKey];
        var aqiLow = aqiRangeLow[indexKey];
        var AQIpm25 = (aqiHi-aqiLow)/(pmHi-pmLow)*(pm25-pmLow)+aqiLow
        AQIpm25 = Math.round(AQIpm25)

        return AQIpm25
    }
};