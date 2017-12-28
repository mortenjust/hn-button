function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



(function() {
    
    // get url
    var url = getParameterByName("url")
    // alert(url)
    console.log("loading url: "+url)

    document.getElementById('iframe').src = url;

    // load the iframe

})();