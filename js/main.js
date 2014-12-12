;(function(){

    /* ============================================================ */
    /* Geolocation Module */
    /* ============================================================ */

    var GeoLocation = (function(){

        var is_supported = function(){
            if ("geolocation" in navigator) {
                return true;
            } else {
                return false;
            }
        }

        var get = function(options){
            if(is_supported){
                return navigator.geolocation.getCurrentPosition(options.success, options.error, options.options);
            } else {
                return false;
            }
        }

        return {
            get: get
        }

    })();

    /* ============================================================ */
    /* Weather Module */
    /* ============================================================ */

    var Weather = (function(){

        var API_URL = 'http://api.openweathermap.org/data/2.5/weather';

        var convertToC = function(f){
            var f = parseFloat(f);
            var c = (f - 32) * (5 / 9);
            return c;
        }

        var convertToF = function(c){
            var c = parseFloat(c);
            var f = (c * (9 / 5)) + 32;
            return f;
        }

        var request = function(options){

            var query = '',
            units = ($.storage.get('preference_units') !== null) ? $.storage.get('preference_units') : options.units;

            if(options.coords && !options.city){
                query += 'lat='+options.coords.lat + '&long=' + options.coords.long;
            } else if(options.city && !options.coords){
                query += 'q='+options.city;
            }

            query += '&units=' + units;

            $.json(API_URL + '/?' + query, function(data){
                options.success(data);
            });
        }


        return {
            request     : request,
            tempToC     : convertToC,
            tempToF     : convertToF
        }

    })();

    // Usage Demo:
    //
    // var weather = Weather.request({
    //     city: 'Belgrade',
    //     success: function(data){
    //         console.log(data);
    //     },
    //     units: 'metric'
    // });

})();
